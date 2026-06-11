import { prisma } from '@/shared/lib/prisma'
import AdminAppointmentsClient from './client'

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      doctor: { include: { user: true } },
      service: true,
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Все записи</h1>
      <AdminAppointmentsClient appointments={appointments} />
    </div>
  )
}
