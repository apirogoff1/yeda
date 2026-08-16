import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/shared/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, order, topic, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 });
    }

    const result = await sendContactEmail({ name, contact, order: order || '', topic: topic || '', message });

    if (!result.success) {
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
