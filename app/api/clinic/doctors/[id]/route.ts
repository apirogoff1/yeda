import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        specialization: true,
        services: true,
      },
    })
    if (!doctor) {
      return NextResponse.json({ error: 'Врач не найден' }, { status: 404 })
    }
    return NextResponse.json(doctor)
  } catch (error) {
    console.error('[GET /api/clinic/doctors/[id]]', error)
    return NextResponse.json({ error: 'Ошибка загрузки врача' }, { status: 500 })
  }
}