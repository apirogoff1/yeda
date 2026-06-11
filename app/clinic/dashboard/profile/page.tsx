'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks'

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  function handleLogout() {
    logout()
    router.push('/clinic')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Профиль</h1>
        <p className="text-gray-500">Ваши личные данные</p>
      </div>

      {/* Карточка профиля */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600">
              {user.name?.charAt(0) ?? '?'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Имя</span>
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Роль</span>
            <span className="text-sm font-medium text-gray-900">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link
          href="/clinic/dashboard"
          className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="text-xl mb-2">🏠</div>
          <p className="font-medium text-gray-900">Личный кабинет</p>
          <p className="text-sm text-gray-400 mt-0.5">Сводка и быстрые действия</p>
        </Link>
        <Link
          href="/clinic/dashboard/appointments"
          className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="text-xl mb-2">📋</div>
          <p className="font-medium text-gray-900">Мои записи</p>
          <p className="text-sm text-gray-400 mt-0.5">История приёмов</p>
        </Link>
      </div>

      {/* Выход */}
      <button
        onClick={handleLogout}
        className="w-full border border-red-200 text-red-500 font-medium py-3 rounded-xl hover:bg-red-50 transition-colors text-sm"
      >
        Выйти из аккаунта
      </button>
    </div>
  )
}