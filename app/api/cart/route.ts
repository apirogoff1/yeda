import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

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

export async function GET() {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await prisma.cartItem.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json({ items })
}

export async function POST(req: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { dishId, name, price, image } = await req.json()
  if (!dishId || !name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const existing = await prisma.cartItem.findFirst({ where: { userId, dishId } })
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    })
    return NextResponse.json({ item: updated })
  }
  const item = await prisma.cartItem.create({
    data: { userId, dishId, name, price: price || 0, image: image || '' },
  })
  return NextResponse.json({ item })
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, quantity } = await req.json()
  if (!id || quantity === undefined) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (quantity < 1) {
    await prisma.cartItem.deleteMany({ where: { id, userId } })
    return NextResponse.json({ ok: true })
  }
  const item = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  })
  return NextResponse.json({ item })
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  if (id) {
    await prisma.cartItem.deleteMany({ where: { id, userId } })
  } else {
    await prisma.cartItem.deleteMany({ where: { userId } })
  }
  return NextResponse.json({ ok: true })
}
