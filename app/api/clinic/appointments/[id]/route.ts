import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: true,
        doctor: {
          include: {
            user: { select: { name: true } },
          },
        },
        timeSlot: true,
      },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('[GET /api/clinic/appointments/[id]]', error)
    return NextResponse.json({ error: 'Ошибка загрузки записи' }, { status: 500 })
  }
}