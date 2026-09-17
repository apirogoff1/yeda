import { LoginForm } from '@/features/auth'
export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#FFF8F4', position: 'relative' }}>
      <LoginForm />
    </main>
  )
}