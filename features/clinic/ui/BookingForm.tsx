'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDoctors, useTimeSlots, useCreateAppointment } from '../api'
import { appointmentSchema, type AppointmentDto } from '../model/schemas'

export function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedDoctorId = searchParams.get('doctorId') ?? ''

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDoctorId)
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [specializations, setSpecializations] = useState<any[]>([])

  // Загружаем специализации
  useEffect(() => {
    fetch('/api/clinic/specializations')
      .then(res => res.json())
      .then(data => setSpecializations(data))
      .catch(console.error)
  }, [])

  const { data: allDoctors, isLoading: loadingDoctors } = useDoctors()
  
  // Фильтруем врачей по специализации
  const doctors = selectedSpecialization 
    ? allDoctors?.filter((d: any) => d.specialization?.slug === selectedSpecialization)
    : allDoctors

  const { data: slots, isLoading: loadingSlots } = useTimeSlots(selectedDoctorId, selectedDate)
  const { mutate: createAppointment, isPending, isSuccess, error } = useCreateAppointment()

  const selectedDoctor = doctors?.find((d: { id: string }) => d.id === selectedDoctorId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentDto>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      doctorId: preselectedDoctorId,
      patientName: '',
      patientPhone: '',
      comment: '',
    },
  })

  const watchedSlotId = watch('timeSlotId')

  function onSpecializationChange(slug: string) {
    setSelectedSpecialization(slug)
    setSelectedDoctorId('')
    setValue('doctorId', '')
    setValue('serviceId', '')
    setValue('timeSlotId', '')
  }

  function onDoctorChange(doctorId: string) {
    setSelectedDoctorId(doctorId)
    setValue('doctorId', doctorId)
    setValue('timeSlotId', '')
    setValue('serviceId', '')
  }

  function onSubmit(data: AppointmentDto) {
    createAppointment(data, {
      onSuccess: (appointment) => {
        router.push(`/clinic/booking/pay/${appointment.id}`)
      },
    })
  }

  const today = new Date().toISOString().split('T')[0]

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-green-800 mb-2">Запись успешно создана!</h2>
        <p className="text-green-600">Перенаправляем на оплату...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Шаг 1: Выбор специализации */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">1. Выберите специализацию</h2>
        <select
          value={selectedSpecialization}
          onChange={(e) => onSpecializationChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Все специализации</option>
          {specializations.map((spec) => (
            <option key={spec.slug} value={spec.slug}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>

      {/* Шаг 2: Выбор врача */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">2. Выберите врача</h2>
        {loadingDoctors ? (
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <select
            value={selectedDoctorId}
            onChange={(e) => onDoctorChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Выберите врача</option>
            {doctors?.map((doctor: { id: string; user: { name: string }; specialization: { name: string } }) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.user?.name} — {doctor.specialization?.name}
              </option>
            ))}
          </select>
        )}
        {errors.doctorId && (
          <p className="text-red-500 text-xs mt-1">{errors.doctorId.message}</p>
        )}
      </div>

      {/* Шаг 3: Выбор услуги */}
      {selectedDoctor && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">3. Выберите услугу</h2>
          <select
            {...register('serviceId')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Выберите услугу</option>
            {selectedDoctor.services?.map((service: { id: string; name: string; price: number; duration: number }) => (
              <option key={service.id} value={service.id}>
                {service.name} — {service.price?.toLocaleString('ru-RU')} ₽ ({service.duration} мин)
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-red-500 text-xs mt-1">{errors.serviceId.message}</p>
          )}
        </div>
      )}

      {/* Шаг 4: Выбор даты */}
      {selectedDoctorId && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">4. Выберите дату</h2>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setValue('timeSlotId', '')
            }}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Шаг 5: Выбор времени */}
      {selectedDate && selectedDoctorId && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">5. Выберите время</h2>
          {loadingSlots ? (
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : slots?.length === 0 ? (
            <p className="text-gray-400 text-sm">Нет свободных слотов на выбранную дату</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slots?.map((slot: { id: string; startTime: string }) => {
                const time = new Date(slot.startTime).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
                const isSelected = watchedSlotId === slot.id
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setValue('timeSlotId', slot.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          )}
          {errors.timeSlotId && (
            <p className="text-red-500 text-xs mt-2">{errors.timeSlotId.message}</p>
          )}
        </div>
      )}

      {/* Данные пациента */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Данные пациента</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
            <input
              {...register('patientName')}
              placeholder="Введите ваше имя"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.patientName && (
              <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
            <input
              {...register('patientPhone')}
              placeholder="+7 (___) ___-__-__"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.patientPhone && (
              <p className="text-red-500 text-xs mt-1">{errors.patientPhone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Комментарий */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Комментарий (необязательно)</h2>
        <textarea
          {...register('comment')}
          placeholder="Опишите жалобы или пожелания к врачу..."
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        {errors.comment && (
          <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
        )}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {error.message}
        </div>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Создаём запись...' : 'Записаться на приём'}
      </button>
    </form>
  )
}