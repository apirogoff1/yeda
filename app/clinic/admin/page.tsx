import { prisma } from '@/shared/lib/prisma'

export default async function AdminPage() {
  const [totalUsers, totalDoctors, totalAppointments, pendingAppointments] = await Promise.all([
    prisma.user.count(),
    prisma.doctor.count(),
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
  ])

  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      doctor: { include: { user: true } },
      service: true,
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Панель управления</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{totalUsers}</div>
          <div className="text-sm text-gray-500 mt-1">Пользователей</div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{totalDoctors}</div>
          <div className="text-sm text-gray-500 mt-1">Врачей</div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="text-3xl font-bold text-purple-600">{totalAppointments}</div>
          <div className="text-sm text-gray-500 mt-1">Всего записей</div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="text-3xl font-bold text-orange-600">{pendingAppointments}</div>
          <div className="text-sm text-gray-500 mt-1">Ожидают подтверждения</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Последние записи</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Пациент</th>
              <th className="pb-2">Врач</th>
              <th className="pb-2">Услуга</th>
              <th className="pb-2">Статус</th>
              <th className="pb-2">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((a) => (
              <tr key={a.id} className="border-b last:border-0">
                <td className="py-2">{a.patientName || '—'}</td>
                <td className="py-2">{a.doctor.user.name}</td>
                <td className="py-2">{a.service.name}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    a.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    a.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                    a.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    a.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="py-2">{a.totalAmount} ₽</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
