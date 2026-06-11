export default function RestaurantLanding() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600')] bg-cover bg-center opacity-30" />
        <div className="relative z-10">
          <p className="text-amber-400 uppercase tracking-widest text-sm mb-4">Изысканная кухня</p>
          <h1 className="text-6xl font-bold mb-6">Bella Italia</h1>
          <p className="text-xl text-zinc-300 mb-10 max-w-xl">Настоящая итальянская кухня в сердце города. Живая музыка, уютная атмосфера, незабываемый вкус.</p>
          <div className="flex gap-4 justify-center">
            <a href="#reserve" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full transition">Забронировать стол</a>
            <a href="#menu" className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-full transition">Смотреть меню</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Авторская кухня", desc: "Шеф-повар с опытом 20 лет, рецепты из регионов Италии" },
            { title: "Винная карта", desc: "Более 200 позиций итальянских и французских вин" },
            { title: "Живая музыка", desc: "Джаз и акустика каждую пятницу и субботу" },
          ].map((item) => (
            <div key={item.title} className="bg-zinc-900 rounded-2xl p-8 text-center border border-zinc-800">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="py-24 bg-amber-500 text-black text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Забронируйте стол прямо сейчас</h2>
        <p className="text-lg mb-8">Звоните или пишите — ответим в течение 5 минут</p>
        <a href="tel:+74951234567" className="bg-black text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-zinc-800 transition">+7 (495) 123-45-67</a>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 text-sm">
        © 2026 Bella Italia. Все права защищены.
      </footer>
    </main>
  )
}
