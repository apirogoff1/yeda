'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginDto } from '../model/schemas'
import { useLogin } from '../api'
import { PasswordInput } from '@/components/ui/password-input'

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
      onSuccess: (response) => {
        console.log('role:', response.user.role)
        if (response.user.role === 'ADMIN') {
          router.push('/admin')
          router.refresh()
        } else {
          router.push('/dashboard')
          router.refresh()
        }
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center text-gray-900">Вход</h1>
      {error && (
        <div className="text-red-500 text-sm text-center">{error.message}</div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 caret-indigo-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Пароль</label>
        <PasswordInput
          {...register('password')}
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-indigo-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-2"
      >
        {isPending ? 'Входим...' : 'Войти'}
      </button>
      <p className="text-sm text-center text-gray-500">
        Нет аккаунта? <a href="/register" className="text-indigo-600 hover:underline">Зарегистрироваться</a>
      </p>
    </form>
  )
}

