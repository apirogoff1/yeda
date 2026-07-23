import { LoginForm } from '@/features/auth'
import { TelegramLoginButton } from '@/features/telegram/ui/TelegramLoginButton'
export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-4 bg-slate-900">
      <LoginForm />
      <TelegramLoginButton />
    </main>
  )
}