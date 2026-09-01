import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendSubscriptionEmail } from '@/shared/lib/email'
import { prisma } from '@/shared/lib/prisma'

const subscribeSchema = z.object({
  email: z.string().email(),
  plan: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, plan } = subscribeSchema.parse(body)

    // Save subscription to database
    await prisma.subscription.create({
      data: {
        email,
        plan: plan || 'basic',
      },
    })

    await sendSubscriptionEmail(email)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 422 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
