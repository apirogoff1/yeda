const fs = require('fs')

const content = `'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useDoctors, useSpecializations } from '../api'

export function DoctorsList() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [specializationSlug, setSpecializationSlug] = useState('')
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const spec = searchParams.get('specialization')
    if (spec) setSpecializationSlug(spec)
  }, [searchParams])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const { data: doctors, isLoading: loadingDoctors } = useDoctors({
    search: search || undefined,
    specializationSlug: specializationSlug || undefined,
  })

  const { data: specializations, isLoading: loadingSpecs } = useSpecializations()

  return (
    <div>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-lg w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Фото врача"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold hover:text-gray-300"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Поиск по имени врача..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={specializationSlug}
          onChange={(e) => setSpecializationSlug(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Все специализации</option>
          {!loadingSpecs && specializations?.map((spec: { id: string; slug: string; name: string }) => (
            <option key={spec.id} value={spec.slug}>{spec.name}</option>
          ))}
        </select>
      </div>

      {loadingDoctors ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : doctors?.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Врачи не найдены</p>
          <p className="text-sm mt-1">Попробуйте изменить параметры поиска</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.map((doctor: {
            id: string
            photoUrl?: string
            user: { name: string; email: string }
            specialization: { name: string }
            experienceYears: number
            rating: number
            reviewsCount: number
          }) => (
            <Link
              key={doctor.id}
              href={"/clinic/doctors/" + doctor.id}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow block"
            >
              <div
                className="w-16 h-16 rounded-full mb-4 overflow-hidden bg-blue-100 flex items-center justify-center cursor-zoom-in"
                onClick={(e) => {
                  if (doctor.photoUrl) {
                    e.preventDefault()
                    e.stopPropagation()
                    setLightbox(doctor.photoUrl)
                  }
                }}
              >
                {doctor.photoUrl ? (
                  <Image
                    src={doctor.photoUrl}
                    alt={doctor.user?.name ?? "Врач"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {doctor.user?.name?.charAt(0) ?? "?"}
                  </span>
                )}
              </div>
              <h2 className="font-semibold text-gray-900 mb-1">{doctor.user?.name ?? "Врач"}</h2>
              <p className="text-sm text-blue-600 mb-3">{doctor.specialization?.name}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Стаж {doctor.experienceYears} лет</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {doctor.rating?.toFixed(1) ?? "—"}
                  <span className="text-gray-400">({doctor.reviewsCount ?? 0})</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
`

fs.writeFileSync('features/clinic/ui/DoctorsList.tsx', content, 'utf8')
console.log('Done!')
