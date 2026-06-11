import { NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export async function GET() {
  try {
    const specializations = await prisma.specialization.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { doctors: true }
        }
      }
    })
    return NextResponse.json(specializations)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки специализаций' }, { status: 500 })
  }
}
