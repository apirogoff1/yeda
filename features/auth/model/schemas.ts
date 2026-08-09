import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email obyazatelen')
    .email('Vvedite korektnyy email'),
  password: z
    .string()
    .min(6, 'Parol minimum 6 simvolov'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Imya minimum 2 simvola')
    .max(50, 'Imya maximum 50 simvolov'),
  email: z
    .string()
    .min(1, 'Email obyazatelen')
    .email('Vvedite korektnyy email'),
  password: z
    .string()
    .min(6, 'Parol minimum 6 simvolov')
    .max(100, 'Parol maximum 100 simvolov'),
  confirmPassword: z
    .string()
    .min(1, 'Podtverdite parol'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Paroli ne sovpadayut',
  path: ['confirmPassword'],
})

export type LoginDto = z.infer<typeof loginSchema>
export type RegisterDto = z.infer<typeof registerSchema>
