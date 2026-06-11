import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

function getUserFromToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string }
  } catch {
    return null
  }
}

export async function PATCH(
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

    if (appointment.patientId !== user.userId && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 403 })
    }

    if (appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') {
      return NextResponse.json({ error: 'Невозможно отменить эту запись' }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.appointment.update({
        where: { id: params.id },
        data: { status: 'CANCELLED' },
      })

      await tx.timeSlot.update({
        where: { id: appointment.timeSlotId },
        data: { status: 'AVAILABLE' },
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка отмены записи' }, { status: 500 })
  }
}
