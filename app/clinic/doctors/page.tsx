import type { Metadata } from 'next'
import { DoctorsList } from '@/features/clinic/ui/DoctorsList'

export const metadata: Metadata = {
  title: 'Врачи',
  description: 'Все врачи клиники МедПремиум. 25 специалистов высшей категории. Выберите врача и запишитесь онлайн.',
  openGraph: {
    title: 'Врачи МедПремиум',
    description: '25 специалистов высшей категории. Онлайн-запись.',
    url: '/clinic/doctors',
  },
}

export default function DoctorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Наши врачи</h1>
        <p className="text-gray-500">
          25 специалистов высшей категории. Выберите врача и запишитесь онлайн.
        </p>
      </div>
      <DoctorsList />
    </div>
  )
}