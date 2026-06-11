import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth-options";
import { prisma } from "@/shared/lib/prisma";
import { createPayment } from "@/features/yookassa";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await req.json();
    const { appointmentId } = body;

    if (!appointmentId) {
      return NextResponse.json({ error: "ID записи не указан" }, { status: 400 });
    }

    // Получаем запись и проверяем, что она принадлежит пользователю
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { service: true },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
    }

    if (appointment.userId !== session.user.id) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    if (appointment.status === "paid") {
      return NextResponse.json({ error: "Запись уже оплачена" }, { status: 409 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Создаём платёж через ЮКассу
    const payment = await createPayment({
      amount: Number(appointment.service.price),
      description: `Оплата приёма у врача ${appointment.doctorId}`,
      appointmentId: appointment.id,
      returnUrl: `${appUrl}/clinic/dashboard/appointments`,
    });

    // Сохраняем ID платежа в базе
    await prisma.clinicPayment.create({
      data: {
        appointmentId: appointment.id,
        yookassaPaymentId: payment.paymentId,
        amount: Number(appointment.service.price),
        currency: "RUB",
        status: "pending",
      },
    });

    return NextResponse.json({ confirmationUrl: payment.confirmationUrl });
  } catch (error) {
    console.error("[POST /api/clinic/appointments/pay]", error);
    return NextResponse.json(
      { error: "Ошибка создания платежа" },
      { status: 500 }
    );
  }
}