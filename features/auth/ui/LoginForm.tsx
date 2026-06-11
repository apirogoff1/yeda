'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginDto } from '../model/schemas'
import { useLogin } from '../api'

export function LoginForm() {
  const router = useRouter()
  const { mutate: login, isPending, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginDto) => {
    login(data, {
      onSuccess: () => router.push('/dashboard'),
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Вход</h1>
        {error && (
          <div className="text-red-500 text-sm text-center">{error.message}</div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Пароль</label>
          <input
            {...register('password')}
            type="password"
            placeholder="********"
            className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 mt-2"
        >
          {isPending ? 'Входим...' : 'Войти'}
        </button>
        <p className="text-sm text-center text-gray-500">
          Нет аккаунта? <a href="/register" className="text-blue-600 hover:underline">Зарегистрироваться</a>
        </p>
      </form>
    </div>
  )
}
