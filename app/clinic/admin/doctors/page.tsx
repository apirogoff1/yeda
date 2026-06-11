import { prisma } from '@/shared/lib/prisma'
import Link from 'next/link'

export default async function AdminDoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialization: true,
      _count: { select: { appointments: true } },
    },
    orderBy: { user: { name: 'asc' } },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Врачи</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Специализация</th>
              <th className="px-4 py-3">Опыт</th>
              <th className="px-4 py-3">Рейтинг</th>
              <th className="px-4 py-3">Записей</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.user.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.user.email}</td>
                <td className="px-4 py-3">{d.specialization.name}</td>
                <td className="px-4 py-3">{d.experienceYears} лет</td>
                <td className="px-4 py-3">{d.rating.toFixed(1)} ⭐</td>
                <td className="px-4 py-3">{d._count.appointments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
