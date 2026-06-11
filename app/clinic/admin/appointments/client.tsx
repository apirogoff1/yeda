'use client'
import { useState } from 'react'

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PAID: 'bg-purple-100 text-purple-700',
}

const statusLabels: Record<string, string> = {
  PENDING: 'Ожидает',
  CONFIRMED: 'Подтверждена',
  COMPLETED: 'Завершена',
  CANCELLED: 'Отменена',
  PAID: 'Оплачена',
}

export default function AdminAppointmentsClient({ appointments }: { appointments: any[] }) {
  const [data, setData] = useState(appointments)
  const [loading, setLoading] = useState<string | null>(null)

  async function changeStatus(id: string, status: string) {
    setLoading(id)
    const res = await fetch(`/api/clinic/admin/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setData(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    }
    setLoading(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b bg-gray-50">
            <th className="px-4 py-3">Пациент</th>
            <th className="px-4 py-3">Комментарий</th>
            <th className="px-4 py-3">Телефон</th>
            <th className="px-4 py-3">Врач</th>
            <th className="px-4 py-3">Услуга</th>
            <th className="px-4 py-3">Сумма</th>
            <th className="px-4 py-3">Статус</th>
            <th className="px-4 py-3">Действие</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="px-4 py-3">{a.patientName || '—'}</td>
              <td className="px-4 py-3 max-w-xs"><span className="text-gray-500 italic text-xs">{a.comment || '—'}</span></td>
              <td className="px-4 py-3">{a.patientPhone || '—'}</td>
              <td className="px-4 py-3">{a.doctor.user.name}</td>
              <td className="px-4 py-3">{a.service.name}</td>
              <td className="px-4 py-3">{a.totalAmount} ₽</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>
                  {statusLabels[a.status] || a.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <select
                  disabled={loading === a.id}
                  value={a.status}
                  onChange={(e) => changeStatus(a.id, e.target.value)}
                  className="text-xs border rounded px-2 py-1 disabled:opacity-50"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
