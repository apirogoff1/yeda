'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterDto } from '../model/schemas'
import { useRegister } from '../api'
import { PasswordInput } from '@/components/ui/password-input'
export function RegisterForm() {
  const router = useRouter()
  const { mutate: register_, isPending, error } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit = (data: RegisterDto) => {
    register_(data, {
      onSuccess: () => router.push('/dashboard'),
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-gray-900">Регистрация</h1>
      {error && (
        <div className="text-red-500 text-sm">{error.message}</div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Имя</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Иван Иванов"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 caret-indigo-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>
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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Подтвердите пароль</label>
        <PasswordInput
          {...register('confirmPassword')}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-indigo-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Регистрируемся...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}