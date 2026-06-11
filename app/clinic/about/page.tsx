export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">О клинике МедПремиум</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">История</h2>
          <p className="text-gray-700">
            МедПремиум — многопрофильный медицинский центр премиального уровня в Москве. За годы работы клиника стала надёжным партнёром для тысяч пациентов.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Наша миссия</h2>
          <p className="text-gray-700">
            Сохранение здоровья пациентов путём предоставления качественной и безопасной медицинской помощи.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Цифры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600">врачей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25 000</div>
              <div className="text-sm text-gray-600">пациентов в год</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">лет работы</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">специализаций</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Лицензии</h2>
          <p className="text-gray-700">
            Медицинская деятельность осуществляется на основании действующих лицензий в соответствии с законодательством РФ.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Оборудование</h2>
          <p className="text-gray-700">
            Современное оборудование экспертного класса от ведущих мировых производителей.
          </p>
        </section>
      </div>
    </div>
  )
}