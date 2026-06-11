import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getAppointment(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/clinic/appointments/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function PaymentPage({ params }: { params: Promise<{ appointmentId: string }> }) {
  const { appointmentId } = await params
  const appointment = await getAppointment(appointmentId)

  if (!appointment) {
    notFound()
  }

  const appointmentDate = new Date(appointment.timeSlot.startTime).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const appointmentTime = new Date(appointment.timeSlot.startTime).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Оплата приёма</h1>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Врач</span>
            <span className="font-medium text-gray-900">{appointment.doctor.user.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Услуга</span>
            <span className="font-medium text-gray-900">{appointment.service.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Дата</span>
            <span className="font-medium text-gray-900">{appointmentDate}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Время</span>
            <span className="font-medium text-gray-900">{appointmentTime}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Пациент</span>
            <span className="font-medium text-gray-900">{appointment.patientName || 'Не указано'}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Телефон</span>
            <span className="font-medium text-gray-900">{appointment.patientPhone || 'Не указан'}</span>
          </div>
          <div className="flex justify-between py-4 bg-blue-50 px-4 rounded-lg">
            <span className="font-semibold text-gray-900">К оплате</span>
            <span className="font-bold text-xl text-blue-600">{appointment.totalAmount.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Внимание:</strong> Оплата временно недоступна. Кнопка оплаты будет активна после подключения платёжной системы.
          </p>
        </div>

        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed mb-4"
        >
          Оплатить {appointment.totalAmount.toLocaleString('ru-RU')} ₽
        </button>

        <div className="text-center">
          <Link
            href="/clinic/dashboard"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Перейти в личный кабинет →
          </Link>
        </div>
      </div>
    </div>
  )
}