import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/shared/lib/prisma'
import HeaderClient from './HeaderClient'

export default async function Header() {
  let user: { role: string } | null = null
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string }
      const found = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { role: true },
      })
      if (found) user = found
    }
  } catch {}
  return <HeaderClient userRole={user?.role ?? null} />
}
