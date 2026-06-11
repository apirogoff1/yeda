import type { Metadata } from 'next'
import Link from 'next/link'
import ContactWidget from '@/components/ContactWidget'

export const metadata: Metadata = {
  title: {
    default: 'МедПремиум — Частная клиника в Москве',
    template: '%s | МедПремиум',
  },
  description: 'Частная многопрофильная клиника МедПремиум в Москве. 25 врачей, 8 специализаций. Онлайн-запись 24/7.',
  keywords: ['клиника', 'врач', 'запись к врачу', 'медицина', 'Москва', 'МедПремиум'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'МедПремиум',
  },
}

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/clinic" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">М</span>
              </div>
              <span className="text-xl font-bold text-gray-900">МедПремиум</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/clinic/doctors" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Врачи
              </Link>
              <Link href="/clinic/services" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Услуги
              </Link>
              <Link href="/clinic/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                О клинике
              </Link>
              <Link href="/clinic/contacts" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Контакты
              </Link>
              <Link href="/clinic/booking" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Запись онлайн
              </Link>
              <Link href="/clinic/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Личный кабинет
              </Link>
            </nav>
            <Link
              href="/clinic/booking"
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-medium px-5 py-2 rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all shadow-sm"
            >
              Записаться
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">М</span>
                </div>
                <span className="font-bold text-white text-lg">МедПремиум</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Частная многопрофильная клиника в Москве. Качественная медицина без очередей.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Навигация</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/clinic/doctors" className="hover:text-teal-400 transition-colors">Наши врачи</Link></li>
                <li><Link href="/clinic/services" className="hover:text-teal-400 transition-colors">Услуги и цены</Link></li>
                <li><Link href="/clinic/booking" className="hover:text-teal-400 transition-colors">Онлайн-запись</Link></li>
                <li><Link href="/clinic/dashboard" className="hover:text-teal-400 transition-colors">Личный кабинет</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>г. Москва, ул. Тверская, 15</li>
                <li>+7 (495) 123-45-67</li>
                <li>info@medpremium.ru</li>
                <li>Пн–Пт: 8:00–21:00, Сб–Вс: 9:00–18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            © 2024 МедПремиум. Все права защищены.
          </div>
        </div>
      </footer>
      <ContactWidget />
    </div>
  )
}
