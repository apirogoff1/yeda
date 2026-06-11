import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { verifyYookassaSignature, processYookassaEvent } from "@/features/yookassa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("X-Notification-Signature") || "";
    const webhookSecret = process.env.YOOKASSA_WEBHOOK_SECRET || "";

    // Проверяем подпись вебхука
    if (!verifyYookassaSignature(body, signature, webhookSecret)) {
      console.warn("[YooKassa Webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    console.log("[YooKassa Webhook] Event:", event.event);

    // Обрабатываем событие через существующий роутер
    const result = processYookassaEvent(event);

    // Если платёж успешен — обновляем статус записи и платежа в БД
    if (event.event === "payment.succeeded") {
      const appointmentId = event.object.metadata?.appointment_id;
      const paymentId = event.object.id;

      if (appointmentId && paymentId) {
        await prisma.$transaction([
          prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: "paid" },
          }),
          prisma.clinicPayment.updateMany({
            where: { yookassaPaymentId: paymentId },
            data: { status: "succeeded", paidAt: new Date() },
          }),
        ]);
        console.log("[YooKassa Webhook] Appointment marked as paid:", appointmentId);
      }
    }

    // Если платёж отменён — обновляем статус
    if (event.event === "payment.canceled") {
      const paymentId = event.object.id;
      if (paymentId) {
        await prisma.clinicPayment.updateMany({
          where: { yookassaPaymentId: paymentId },
          data: { status: "canceled" },
        });
        console.log("[YooKassa Webhook] Payment canceled:", paymentId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[YooKassa Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}