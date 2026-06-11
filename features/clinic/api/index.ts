import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AppointmentDto, DoctorReviewDto, DoctorFilterDto } from '../model/schemas'

// ===== ВРАЧИ =====

async function getDoctorsRequest(filters?: DoctorFilterDto) {
  const params = new URLSearchParams()
  if (filters?.specializationSlug) params.set('specialization', filters.specializationSlug)
  if (filters?.search) params.set('search', filters.search)
  const res = await fetch(`/api/clinic/doctors?${params.toString()}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка загрузки врачей')
  return json
}

async function getDoctorRequest(id: string) {
  const res = await fetch(`/api/clinic/doctors/${id}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Врач не найден')
  return json
}

export function useDoctors(filters?: DoctorFilterDto) {
  return useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => getDoctorsRequest(filters),
  })
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctorRequest(id),
    enabled: !!id,
  })
}

// ===== СПЕЦИАЛИЗАЦИИ =====

async function getSpecializationsRequest() {
  const res = await fetch('/api/clinic/specializations')
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка загрузки специализаций')
  return json
}

export function useSpecializations() {
  return useQuery({
    queryKey: ['specializations'],
    queryFn: getSpecializationsRequest,
  })
}

// ===== СЛОТЫ =====

async function getTimeSlotsRequest(doctorId: string, date: string) {
  const res = await fetch(`/api/clinic/slots?doctorId=${doctorId}&date=${date}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка загрузки слотов')
  return json
}

export function useTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ['timeSlots', doctorId, date],
    queryFn: () => getTimeSlotsRequest(doctorId, date),
    enabled: !!doctorId && !!date,
  })
}

// ===== ЗАПИСИ =====

async function createAppointmentRequest(data: AppointmentDto) {
  const res = await fetch('/api/clinic/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка создания записи')
  return json
}

async function getMyAppointmentsRequest() {
  const res = await fetch('/api/clinic/appointments/my')
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка загрузки записей')
  return json
}

async function cancelAppointmentRequest(id: string) {
  const res = await fetch(`/api/clinic/appointments/${id}/cancel`, {
    method: 'PATCH',
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка отмены записи')
  return json
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAppointmentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] })
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })
}

export function useMyAppointments() {
  return useQuery({
    queryKey: ['myAppointments'],
    queryFn: getMyAppointmentsRequest,
  })
}

export function useCancelAppointment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelAppointmentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] })
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })
}

// ===== ОТЗЫВЫ =====

async function createReviewRequest(appointmentId: string, data: DoctorReviewDto) {
  const res = await fetch(`/api/clinic/appointments/${appointmentId}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Ошибка создания отзыва')
  return json
}

export function useCreateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ appointmentId, data }: { appointmentId: string; data: DoctorReviewDto }) =>
      createReviewRequest(appointmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] })
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
  })
}
