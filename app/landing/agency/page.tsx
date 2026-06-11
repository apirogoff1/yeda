export default function AgencyLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="px-8 py-5 flex justify-between items-center">
        <div className="text-2xl font-black">MAKE<span className="text-violet-600">SENSE</span></div>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <a href="#work" className="hover:text-violet-600 transition">Работы</a>
          <a href="#services" className="hover:text-violet-600 transition">Услуги</a>
          <a href="#team" className="hover:text-violet-600 transition">Команда</a>
        </div>
        <a href="#contact" className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white px-6 py-2 rounded-full text-sm font-bold transition">Обсудить проект</a>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-24 max-w-6xl mx-auto">
        <div className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-2 rounded-full mb-8">Креативное агентство</div>
        <h1 className="text-7xl font-black leading-none mb-8">
          Делаем бренды<br />
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">которые помнят</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mb-12">Стратегия, дизайн, разработка и маркетинг под ключ. Превращаем идеи в продукты, которые продают.</p>
        <div className="flex gap-4">
          <a href="#contact" className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-full transition text-lg">Начать проект</a>
          <a href="#work" className="text-slate-600 hover:text-violet-600 font-bold px-8 py-4 rounded-full border border-slate-200 hover:border-violet-600 transition">Наши работы →</a>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-violet-600 text-white py-4 overflow-hidden">
        <div className="flex gap-16 text-sm font-bold uppercase tracking-widest whitespace-nowrap">
          {["Брендинг", "Веб-дизайн", "Разработка", "SEO", "SMM", "Контекст", "Брендинг", "Веб-дизайн", "Разработка", "SEO", "SMM", "Контекст"].map((t, i) => (
            <span key={i}>{t} ✦</span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-16">Что мы делаем</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { num: "01", title: "Брендинг и айдентика", desc: "Логотип, фирменный стиль, брендбук. Создаём образ, который выделяет вас среди конкурентов." },
            { num: "02", title: "Веб-дизайн и разработка", desc: "Лендинги, корпоративные сайты, интернет-магазины. Красиво, быстро, конверсионно." },
            { num: "03", title: "Маркетинг и реклама", desc: "Яндекс Директ, ВКонтакте, Telegram Ads. Приводим целевой трафик и считаем ROAS." },
            { num: "04", title: "SMM и контент", desc: "Ведение соцсетей, съёмка, тексты. Строим лояльную аудиторию вокруг вашего бренда." },
          ].map((item) => (
            <div key={item.num} className="border border-slate-200 rounded-2xl p-8 hover:border-violet-600 hover:shadow-lg transition group">
              <div className="text-violet-600 font-black text-lg mb-4">{item.num}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-8 mb-24 rounded-3xl bg-gradient-to-br from-violet-600 to-pink-500 text-white text-center py-24 px-4">
        <h2 className="text-5xl font-black mb-4">Готовы к росту?</h2>
        <p className="text-violet-100 mb-10 text-lg">Оставьте заявку — ответим в течение часа и предложим решение</p>
        <a href="tel:+74951234567" className="bg-white text-violet-600 font-black px-10 py-4 rounded-full text-lg hover:bg-violet-50 transition">+7 (495) 123-45-67</a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100">
        © 2026 MakeSense Agency. Все права защищены.
      </footer>
    </main>
  )
}
