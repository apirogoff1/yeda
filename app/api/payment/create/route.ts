import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/shared/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

async function getUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded.userId
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, total, name, phone, address } = body
    const userId = await getUserId()

    await prisma.order.create({
      data: {
        ...(userId ? { userId } : {}),
        name: name || 'Unknown',
        phone: phone || 'Unknown',
        address: address || 'Unknown',
        total: total,
        status: 'new',
        items: {
          create: items.map((i: any) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
    })

    const itemsHtml = items.map((i: any) =>
      `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee">${i.quantity} pcs.</td><td style="padding:8px;border-bottom:1px solid #eee">${i.price * i.quantity} RUB</td></tr>`
    ).join('')

    try {
      await transporter.sendMail({
        from: `YEDA <${process.env.GMAIL_USER}>`,
        to: 'apirogoff1@gmail.com',
        subject: `New order YEDA - ${total} RUB`,
        html: `
          <h2 style="color:#FF4D00">New order!</h2>
          <p><b>Name:</b> ${name || 'Not specified'}</p>
          <p><b>Phone:</b> ${phone || 'Not specified'}</p>
          <p><b>Address:</b> ${address || 'Not specified'}</p>
          <h3>Order items:</h3>
          <table style="border-collapse:collapse;width:100%">
            <tr style="background:#FF4D00;color:#fff">
              <th style="padding:8px;text-align:left">Dish</th>
              <th style="padding:8px;text-align:left">Qty</th>
              <th style="padding:8px;text-align:left">Sum</th>
            </tr>
            ${itemsHtml}
          </table>
          <h3>Total: ${total} RUB</h3>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`
    return NextResponse.json({ confirmationUrl: returnUrl })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
