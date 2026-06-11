'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import { useMyAppointments, useCancelAppointment, useCreateReview } from '@/features/clinic/api'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  SCHEDULED: { label: 'Запланирован', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Завершён', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Отменён', color: 'bg-gray-100 text-gray-500' },
}

export default function AppointmentsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { data: appointments, isLoading } = useMyAppointments()
  const { mutate: cancel, isPending: cancelling } = useCancelAppointment()
  const { mutate: createReview, isPending: reviewing } = useCreateReview()

  const [reviewId, setReviewId] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  function handleCancel(id: string) {
    if (!confirm('Вы уверены, что хотите отменить запись?')) return
    cancel(id)
  }

  function handleReviewSubmit(appointmentId: string) {
    createReview(
      { appointmentId, data: { rating, text: reviewText } },
      {
        onSuccess: () => {
          setReviewId(null)
          setRating(5)
          setReviewText('')
        },
      }
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Мои записи</h1>
          <p className="text-gray-500">История и предстоящие приёмы</p>
        </div>
        <Link
          href="/clinic/booking"
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Записаться
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : appointments?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-gray-500 mb-4">У вас пока нет записей</p>
          <Link
            href="/clinic/booking"
            className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Записаться к врачу
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments?.map((appointment: {
            id: string
            status: string
            comment?: string
            review?: { id: string }
            doctor: { name: string; specialization: { name: string } }
            service: { name: string; price: number }
            timeSlot: { startTime: string }
          }) => {
            const statusInfo = STATUS_LABELS[appointment.status] ?? { label: appointment.status, color: 'bg-gray-100 text-gray-500' }
            const isScheduled = appointment.status === 'SCHEDULED'
            const isCompleted = appointment.status === 'COMPLETED'
            const hasReview = !!appointment.review
            const isReviewing = reviewId === appointment.id

            return (
              <div key={appointment.id} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-semibold text-gray-900">{appointment.doctor?.name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 mb-1">{appointment.doctor?.specialization?.name}</p>
                    <p className="text-sm text-gray-500">{appointment.service?.name} — {appointment.service?.price?.toLocaleString('ru-RU')} ₽</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(appointment.timeSlot?.startTime).toLocaleString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {appointment.comment && (
                      <p className="text-sm text-gray-400 mt-2 italic">«{appointment.comment}»</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {isScheduled && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        disabled={cancelling}
                        className="text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
                      >
                        Отменить
                      </button>
                    )}
                    {isCompleted && !hasReview && (
                      <button
                        onClick={() => setReviewId(isReviewing ? null : appointment.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {isReviewing ? 'Закрыть' : 'Оставить отзыв'}
                      </button>
                    )}
                    {isCompleted && hasReview && (
                      <span className="text-sm text-green-600 font-medium">✓ Отзыв оставлен</span>
                    )}
                  </div>
                </div>

                {/* Форма отзыва */}
                {isReviewing && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-3">Оценка врача</p>
                    <div className="flex gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Расскажите о приёме..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
                    />
                    <button
                      onClick={() => handleReviewSubmit(appointment.id)}
                      disabled={reviewing}
                      className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {reviewing ? 'Отправляем...' : 'Отправить отзыв'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}