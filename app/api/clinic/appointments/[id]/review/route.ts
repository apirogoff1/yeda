import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().max(1000).optional(),
})

function getUserFromToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string }
  } catch {
    return null
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 })
    }

    const user = getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Недействительный токен' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 })
    }

    if (appointment.patientId !== user.userId) {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 403 })
    }

    if (appointment.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Отзыв можно оставить только после завершённого приёма' }, { status: 400 })
    }

    const existing = await prisma.doctorReview.findUnique({
      where: { appointmentId: params.id },
    })

    if (existing) {
      return NextResponse.json({ error: 'Отзыв уже оставлен' }, { status: 400 })
    }

    const body = await req.json()
    const data = reviewSchema.parse(body)

    const review = await prisma.$transaction(async (tx) => {
      const newReview = await tx.doctorReview.create({
        data: {
          patientId: user.userId,
          doctorId: appointment.doctorId,
          appointmentId: params.id,
          rating: data.rating,
          text: data.text,
        },
      })

      const reviews = await tx.doctorReview.aggregate({
        where: { doctorId: appointment.doctorId },
        _avg: { rating: true },
        _count: true,
      })

      await tx.doctor.update({
        where: { id: appointment.doctorId },
        data: {
          rating: reviews._avg.rating ?? 0,
          reviewCount: reviews._count,
        },
      })

      return newReview
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 })
    }
    return NextResponse.json({ error: 'Ошибка создания отзыва' }, { status: 500 })
  }
}
