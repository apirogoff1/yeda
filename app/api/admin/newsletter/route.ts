import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { subject, html } = await req.json()

    if (!subject || !html) {
      return NextResponse.json({ error: 'Subject and html are required' }, { status: 400 })
    }

    const subscriptions = await prisma.subscription.findMany()

    if (subscriptions.length === 0) {
      return NextResponse.json({ error: 'No subscribers' }, { status: 400 })
    }

    let errorCount = 0
    for (const s of subscriptions) {
      try {
        await transporter.sendMail({
          from: `YEDA <${process.env.GMAIL_USER}>`,
          to: s.email,
          subject,
          html,
        })
      } catch {
        errorCount++
      }
    }

    return NextResponse.json({ success: true, count: subscriptions.length - errorCount, errors: errorCount }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
