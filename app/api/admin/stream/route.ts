import { NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        try {
          const [orders, subscriptions, users] = await Promise.all([
            prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }),
            prisma.subscription.findMany({ orderBy: { createdAt: 'desc' } }),
            prisma.user.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
          ])
          const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
          const newOrders = orders.filter(o => o.status === 'new').length
          const data = JSON.stringify({
            stats: { totalOrders: orders.length, totalRevenue, newOrders, totalSubscriptions: subscriptions.length, totalUsers: users.length },
            orders,
            subscriptions,
            users,
          })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        } catch {
          controller.close()
        }
      }

      await send()
      const interval = setInterval(send, 5000)

      setTimeout(() => {
        clearInterval(interval)
        controller.close()
      }, 55000)
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
