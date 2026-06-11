import { z } from 'zod'

// Запись к врачу
export const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Выберите врача'),
  serviceId: z.string().min(1, 'Выберите услугу'),
  timeSlotId: z.string().min(1, 'Выберите время'),
  patientName: z.string().min(2, 'Введите имя (минимум 2 символа)'),
  patientPhone: z.string().min(10, 'Введите корректный телефон'),
  comment: z.string().max(500, 'Максимум 500 символов').optional(),
})

// Отзыв о враче
export const doctorReviewSchema = z.object({
  rating: z.number().min(1, 'Минимальная оценка 1').max(5, 'Максимальная оценка 5'),
  text: z.string().max(1000, 'Максимум 1000 символов').optional(),
})

// Фильтр врачей
export const doctorFilterSchema = z.object({
  specializationSlug: z.string().optional(),
  search: z.string().optional(),
})

// TypeScript типы
export type AppointmentDto = z.infer<typeof appointmentSchema>
export type DoctorReviewDto = z.infer<typeof doctorReviewSchema>
export type DoctorFilterDto = z.infer<typeof doctorFilterSchema>