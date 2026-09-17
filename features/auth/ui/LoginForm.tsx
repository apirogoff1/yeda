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
    <div style={{ background: '#fff', borderRadius: '32px', padding: '48px 40px', boxShadow: '0 8px 48px rgba(255,77,0,0.10)', width: '100%', maxWidth: '440px', boxSizing: 'border-box' as const }}>
      <h1 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '36px', fontWeight: 900, color: '#FF4D00', textAlign: 'center' as const, marginBottom: '32px' }}>Вход</h1>
      {error && (
        <div style={{ background: '#FFF0EB', border: '1.5px solid #FFD4C2', borderRadius: '12px', padding: '10px 16px', color: '#FF4D00', fontFamily: 'var(--font-geologica)', fontSize: '14px', marginBottom: '16px', textAlign: 'center' as const }}>{error.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
          <label style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: '#433932' }}>Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            style={{ width: '100%', border: '1.5px solid #FFD4C2', borderRadius: '14px', padding: '14px 18px', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const, background: '#FFFAF8', transition: 'border-color 0.2s' }}
          />
          {errors.email && (
            <span style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#FF4D00' }}>{errors.email.message}</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
          <label style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: '#433932' }}>Пароль</label>
          <PasswordInput
            {...register('password')}
            placeholder="••••••••"
          />
          {errors.password && (
            <span style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#FF4D00' }}>{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          style={{ background: isPending ? '#ffb899' : 'linear-gradient(90deg, #FF4D00 0%, #ff7a3d 100%)', color: '#fff', borderRadius: '14px', padding: '16px', fontFamily: 'var(--font-geologica)', fontSize: '16px', fontWeight: 700, border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', boxShadow: '0 4px 20px rgba(255,77,0,0.25)', transition: 'all 0.2s', marginTop: '8px' }}
        >
          {isPending ? 'Входим...' : 'Войти'}
        </button>
      </form>
      <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#999', textAlign: 'center' as const, marginTop: '24px' }}>
        Нет аккаунта?{' '}
        <a href="/register" style={{ color: '#FF4D00', fontWeight: 600, textDecoration: 'none' }}>Зарегистрироваться</a>
      </p>
    </div>
  )
}
