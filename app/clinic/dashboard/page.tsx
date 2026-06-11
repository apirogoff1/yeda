'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import { useMyAppointments } from '@/features/clinic/api'

export default function ClinicDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { data: appointments, isLoading } = useMyAppointments()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login')
    }
  }, [hydrated, isAuthenticated, router])

  if (!hydrated || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) return null

  const upcoming = appointments?.filter((a: { status: string }) =>
    a.status === 'SCHEDULED'
  ) ?? []

  const past = appointments?.filter((a: { status: string }) =>
    a.status === 'COMPLETED'
  ) ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Личный кабинет</h1>
        <p className="text-gray-500">Добро пожаловать, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Предстоящих записей</p>
          <p className="text-3xl font-bold text-blue-600">{upcoming.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Завершённых приёмов</p>
          <p className="text-3xl font-bold text-green-600">{past.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Всего записей</p>
          <p className="text-3xl font-bold text-gray-900">{appointments?.length ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/clinic/booking"
          className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition-colors"
        >
          <div className="text-2xl mb-2">📅</div>
          <h2 className="font-semibold text-lg mb-1">Записаться к врачу</h2>
          <p className="text-blue-100 text-sm">Выберите врача и удобное время</p>
        </Link>
        <Link
          href="/clinic/dashboard/appointments"
          className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-lg text-gray-900 mb-1">Мои записи</h2>
          <p className="text-gray-500 text-sm">История и предстоящие приёмы</p>
        </Link>
      </div>

      {upcoming.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Ближайший приём</h2>
          {(() => {
            const next = upcoming[0]
            return (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{next.doctor?.name}</p>
                  <p className="text-sm text-blue-600">{next.doctor?.specialization?.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(next.timeSlot?.startTime).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Link
                  href="/clinic/dashboard/appointments"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Подробнее →
                </Link>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
