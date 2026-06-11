import Link from 'next/link'

export default function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Контакты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Наши контакты</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-medium">Адрес:</span> Москва, улица Тверская, дом 15
              </li>
              <li>
                <span className="font-medium">Телефон:</span> +7 (495) 555-55-55
              </li>
              <li>
                <span className="font-medium">Email:</span> info@medpremium.ru
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Часы работы</h2>
            <p className="text-gray-700">Ежедневно: 08:00–21:00</p>
          </div>

          <Link
            href="/clinic/booking"
            className="block w-full bg-blue-600 text-white text-center font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Записаться онлайн
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Как добраться</h2>
          <p className="text-gray-700 mb-4">
            Ближайшее метро в нескольких минутах ходьбы. Парковка рядом с клиникой.
          </p>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
            Карта проезда
          </div>
        </div>
      </div>
    </div>
  )
}