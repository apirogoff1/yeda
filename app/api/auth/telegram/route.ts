import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { prisma } from "@/shared/lib/prisma";
import { sign } from "jsonwebtoken";

function checkTelegramAuth(data: Record<string, string>): boolean {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const secret = createHmac("sha256", "WebAppData").update(token).digest();
  const { hash, ...rest } = data;
  const checkString = Object.keys(rest)
    .sort()
    .map((k) => k + "=" + rest[k])
    .join("\n");
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
  return hmac === hash;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!checkTelegramAuth(body)) {
      return NextResponse.json({ error: "Invalid Telegram data" }, { status: 401 });
    }
    const { id, first_name, last_name, username } = body;
    const telegramId = String(id);
    const name = [first_name, last_name].filter(Boolean).join(" ");
    const email = "tg_" + telegramId + "@telegram.local";
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, name: name || username || "Telegram User", password: "" },
      });
    }
    const jwtSecret = process.env.JWT_SECRET!;
    const token = sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: "7d" });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({ data: { userId: user.id, token, expiresAt } });
    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: "lax", expires: expiresAt });
    return response;
  } catch (error) {
    console.error("Telegram auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}