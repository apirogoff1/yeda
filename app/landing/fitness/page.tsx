export default function FitnessLanding() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-4">Фитнес-клуб №1</p>
          <h1 className="text-6xl font-black mb-6">POWER <span className="text-green-400">GYM</span></h1>
          <p className="text-xl text-zinc-300 mb-10 max-w-xl">Современное оборудование, профессиональные тренеры, результат уже через 30 дней или вернём деньги.</p>
          <div className="flex gap-4 justify-center">
            <a href="#trial" className="bg-green-500 hover:bg-green-400 text-black font-black px-8 py-4 rounded-full transition text-lg">Пробное занятие бесплатно</a>
            <a href="#prices" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-8 py-4 rounded-full transition">Цены</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green-500 text-black">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "5000+", label: "Клиентов" },
            { num: "50+", label: "Тренеров" },
            { num: "3000м²", label: "Площадь" },
            { num: "24/7", label: "Работаем" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black">{s.num}</div>
              <div className="text-sm font-bold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16">Наши направления</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Силовые тренировки", desc: "Тренажёрный зал с профессиональным оборудованием" },
            { title: "Йога и растяжка", desc: "Групповые занятия для гибкости и баланса" },
            { title: "Бокс и единоборства", desc: "Тренировки с мастерами спорта" },
            { title: "Бассейн", desc: "25-метровый бассейн с инструктором" },
            { title: "Кардио", desc: "Велотренажёры, беговые дорожки, эллипсы" },
            { title: "Нутрициология", desc: "Персональный план питания от диетолога" },
          ].map((item) => (
            <div key={item.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="trial" className="py-24 text-center px-4">
        <h2 className="text-4xl font-black mb-4">Первое занятие — <span className="text-green-400">бесплатно</span></h2>
        <p className="text-zinc-400 mb-8">Оставьте номер — перезвоним и запишем вас на удобное время</p>
        <a href="tel:+74951234567" className="bg-green-500 hover:bg-green-400 text-black font-black px-10 py-4 rounded-full text-lg transition">+7 (495) 123-45-67</a>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 text-sm border-t border-zinc-800">
        © 2026 Power Gym. Все права защищены.
      </footer>
    </main>
  )
}
