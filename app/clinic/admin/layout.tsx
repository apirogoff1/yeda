'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          <span className="font-bold text-lg text-blue-700">МедПремиум — Админ</span>
          <Link href="/clinic/admin" className="text-sm text-gray-600 hover:text-blue-600">Главная</Link>
          <Link href="/clinic/admin/appointments" className="text-sm text-gray-600 hover:text-blue-600">Записи</Link>
          <Link href="/clinic/admin/doctors" className="text-sm text-gray-600 hover:text-blue-600">Врачи</Link>
          <Link href="/clinic/admin/users" className="text-sm text-gray-600 hover:text-blue-600">Пользователи</Link>
          <Link href="/clinic" className="ml-auto text-sm text-gray-400 hover:text-gray-600">← На сайт</Link>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">Выйти</button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
