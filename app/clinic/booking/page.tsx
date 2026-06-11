import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingForm } from '@/features/clinic/ui/BookingForm'

export const metadata: Metadata = {
  title: 'Запись к врачу',
  description: 'Онлайн-запись к врачу клиники МедПремиум. Выберите врача, услугу и удобное время.',
  openGraph: {
    title: 'Запись к врачу | МедПремиум',
    description: 'Онлайн-запись к врачу. Выберите врача, услугу и удобное время.',
    url: '/clinic/booking',
  },
}

export default function BookingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Запись к врачу</h1>
        <p className="text-gray-500">Заполните форму и выберите удобное время приёма</p>
      </div>
      <Suspense fallback={<div className="h-96 bg-white rounded-2xl animate-pulse" />}>
        <BookingForm />
      </Suspense>
    </div>
  )
}