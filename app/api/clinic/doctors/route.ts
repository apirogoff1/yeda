import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const specialization = searchParams.get('specialization')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    const doctors = await prisma.doctor.findMany({
      where: {
        ...(specialization && {
          specialization: { slug: specialization }
        }),
        ...(search && {
          user: { name: { contains: search, mode: 'insensitive' } }
        }),
      },
      include: {
        user: { select: { name: true, email: true } },
        specialization: true,
        services: true,
      },
      orderBy: { rating: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json(doctors)
  } catch (error) {
    console.error('[GET /api/clinic/doctors]', error)
    return NextResponse.json({ error: 'Ошибка загрузки врачей' }, { status: 500 })
  }
}