import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/shared/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
}

export default async function DoctorPage({ params }: Props) {
  const { id } = await params
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      specialization: true,
      services: true,
    },
  })
  if (!doctor) notFound()

  const initials = doctor.user.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/clinic/doctors"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-sm font-medium"
        >
          ← Все врачи
        </Link>
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-blue-600 flex items-center justify-center">
              {doctor.photoUrl ? (
                <Image
                  src={doctor.photoUrl}
                  alt={doctor.user.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-3xl font-bold">{initials}</span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {doctor.user.name}
              </h1>
              <p className="text-blue-600 font-medium text-lg mb-3">
                {doctor.specialization.name}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-gray-900">{doctor.rating.toFixed(1)}</span>
                  <span>({doctor.reviewsCount} отзывов)</span>
                </span>
                <span>
                  Стаж: <span className="font-semibold text-gray-900">{doctor.experienceYears} лет</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">О враче</h2>
          <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
        </div>
        {doctor.services.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Услуги и цены</h2>
            <div className="divide-y divide-gray-100">
              {doctor.services.map((service) => (
                <div key={service.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.duration} минут</p>
                  </div>
                  <p className="font-bold text-blue-600 text-lg">
                    {service.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="text-center">
          <Link
            href={"/clinic/booking?doctorId=" + doctor.id}
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Записаться к врачу
          </Link>
        </div>
      </div>
    </div>
  )
}
