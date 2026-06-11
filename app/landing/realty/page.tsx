export default function RealtyLanding() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">ELITE<span className="text-blue-700">REALTY</span></div>
        <div className="flex gap-8 text-sm font-medium text-slate-600">
          <a href="#objects" className="hover:text-blue-700 transition">Объекты</a>
          <a href="#services" className="hover:text-blue-700 transition">Услуги</a>
          <a href="#about" className="hover:text-blue-700 transition">О нас</a>
        </div>
        <a href="#contact" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-sm font-medium transition">Консультация</a>
      </nav>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-blue-700 text-sm font-semibold uppercase tracking-widest mb-4">Премиальная недвижимость Москвы</p>
          <h1 className="text-6xl font-bold leading-tight mb-6">Найдём квартиру<br />вашей мечты</h1>
          <p className="text-xl text-slate-500 mb-10 max-w-lg">Более 15 лет на рынке. Юридическая чистота каждой сделки. Работаем с ипотекой всех банков.</p>
          <div className="flex gap-4">
            <a href="#contact" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded transition">Получить подборку</a>
            <a href="#objects" className="border border-slate-300 hover:border-blue-700 hover:text-blue-700 px-8 py-4 rounded transition font-semibold">Смотреть объекты</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 text-white py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "2 400+", label: "Сделок закрыто" },
            { num: "15 лет", label: "На рынке" },
            { num: "98%", label: "Довольных клиентов" },
            { num: "3 дня", label: "Средний срок подбора" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold">{s.num}</div>
              <div className="text-blue-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
        <p className="text-center text-slate-500 mb-16">Полное сопровождение от поиска до ключей в руках</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "НОВОСТРОЙКИ", desc: "Аккредитованные застройщики, эскроу-счета, рассрочка" },
            { title: "ВТОРИЧНЫЙ РЫНОК", desc: "Полная проверка юридической чистоты объекта" },
            { title: "КОММЕРЧЕСКАЯ", desc: "Офисы, торговые помещения, склады и производства" },
          ].map((item) => (
            <div key={item.title} className="bg-white border-l-4 border-blue-700 rounded-r-2xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-black tracking-widest text-blue-700 mb-3">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 bg-slate-900 text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Бесплатная консультация</h2>
        <p className="text-slate-400 mb-8">Расскажите о задаче — подберём варианты за 24 часа</p>
        <a href="tel:+74951234567" className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-10 py-4 rounded text-lg transition">+7 (495) 123-45-67</a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm bg-slate-900 border-t border-slate-800">
        © 2026 EliteRealty. Все права защищены.
      </footer>
    </main>
  )
}
