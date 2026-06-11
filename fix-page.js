const fs = require('fs')

const content = `import type { Metadata } from 'next'
import VideoSlider from '@/components/VideoSlider'

export const metadata: Metadata = {
  title: 'МедПремиум — Частная клиника в Москве',
  description: 'Частная многопрофильная клиника МедПремиум в Москве. 25 врачей, 8 специализаций. Онлайн-запись 24/7 без очередей.',
}

const SPECIALIZATIONS = [
  { name: 'Терапия', desc: 'Общая терапия и диагностика', slug: 'terapiya' },
  { name: 'Кардиология', desc: 'Лечение сердца и сосудов', slug: 'kardiologiya' },
  { name: 'Неврология', desc: 'Заболевания нервной системы', slug: 'nevrologiya' },
  { name: 'Ортопедия', desc: 'Опорно-двигательный аппарат', slug: 'ortopediya' },
  { name: 'Офтальмология', desc: 'Диагностика и лечение зрения', slug: 'oftalmologiya' },
  { name: 'Дерматология', desc: 'Заболевания кожи', slug: 'dermatologiya' },
  { name: 'Эндокринология', desc: 'Заболевания эндокринной системы', slug: 'endokrinologiya' },
  { name: 'Гастроэнтерология', desc: 'Заболевания ЖКТ', slug: 'gastroenterologiya' },
]

const ADVANTAGES = [
  { title: '25+', label: 'врачей', desc: 'Специалисты высшей категории с опытом от 10 лет' },
  { title: '24/7', label: 'онлайн-запись', desc: 'Записывайтесь в любое время без звонков и очередей' },
  { title: '8', label: 'специализаций', desc: 'Все направления медицины под одной крышей' },
  { title: '10+', label: 'лет на рынке', desc: 'МРТ, КТ, УЗИ экспертного класса' },
]

const STEPS = [
  { number: '01', title: 'Выберите врача', desc: 'Найдите специалиста по нужной специализации или выберите из списка лучших врачей клиники' },
  { number: '02', title: 'Выберите время', desc: 'Удобный календарь покажет свободные слоты. Выберите дату и время приёма' },
  { number: '03', title: 'Получите подтверждение', desc: 'Подтверждение записи придёт на email и в личный кабинет. Напоминание за день до приёма' },
]

const REVIEWS = [
  { name: 'Анна К.', text: 'Кардиолог Волков помог справиться с гипертензией. Профессиональный подход, внимательное отношение. Рекомендую!', rating: 5 },
  { name: 'Михаил С.', text: 'Гастроэнтеролог Голубев провёл комплексное обследование. Всё объяснил доступно, назначил эффективное лечение.', rating: 5 },
  { name: 'Ольга П.', text: 'Невролог Левин быстро определил причину головных болей. После курса лечения чувствую себя отлично.', rating: 5 },
]

async function getTopDoctors() {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(base + '/api/clinic/doctors?limit=3', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.slice(0, 3)
  } catch {
    return []
  }
}

export default async function ClinicPage() {
  const doctors = await getTopDoctors()

  return (
    <>
      <div style={{height: '4px', background: 'linear-gradient(90deg, #21A0E1, #0BD5D0)'}} />

      <section className="relative text-white overflow-hidden" style={{minHeight: '100vh', background: '#1a1e24'}}>
        <div className="absolute inset-0 flex" style={{zIndex: 2}}>
          <div style={{width: '8%', background: 'rgba(15,18,22,0.85)'}} />
          <div style={{flex: 1}} />
          <div style={{width: '8%', background: 'rgba(15,18,22,0.85)'}} />
        </div>
        <div className="absolute inset-0" style={{zIndex: 1}}>
          <VideoSlider />
        </div>
        <div className="absolute bottom-0 left-0 right-0" style={{height: '180px', background: 'linear-gradient(to bottom, transparent, #EEF4F8)', zIndex: 3}} />
        <div className="relative flex flex-col items-center justify-center text-center px-4" style={{minHeight: '100vh', zIndex: 4}}>
          <div className="max-w-3xl">
            <div className="flex flex-col items-center mb-12">
              <div className="w-16 h-16 rounded-2xl border-2 border-white/40 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-light">М</span>
              </div>
              <span className="text-white/90 text-2xl font-light tracking-[0.4em] uppercase">МедПремиум</span>
              <div className="w-24 h-px bg-white/30 mt-3"></div>
              <span className="text-white/50 text-xs tracking-[0.35em] uppercase mt-3">Многопрофильная клиника</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light leading-tight mb-6 tracking-tight whitespace-nowrap">
              Ваше здоровье — наш приоритет
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Частная многопрофильная клиника в Москве. 25 врачей, 8 специализаций.
              Онлайн-запись за 2 минуты без очередей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/clinic/booking" className="text-white font-semibold px-8 py-4 rounded-xl transition-all text-center text-lg" style={{background: 'linear-gradient(90deg,#21A0E1,#0BD5D0)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)'}}>
                Записаться онлайн
              </a>
              <a href="/clinic/doctors" className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center text-lg">
                Наши врачи
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{background: '#EEF4F8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Почему выбирают МедПремиум</h2>
          <p className="text-center mb-12" style={{color: '#6b7a8d'}}>Качество, которому доверяют тысячи пациентов</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 text-center" style={{boxShadow: '0 4px 20px rgba(33,160,225,0.08)', border: '1px solid rgba(33,160,225,0.15)'}}>
                <div className="text-4xl font-bold mb-1" style={{background: 'linear-gradient(90deg,#21A0E1,#0BD5D0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.title}</div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-3" style={{color: '#21A0E1'}}>{item.label}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{background: '#F5F9FC'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Наши специализации</h2>
          <p className="text-center mb-12" style={{color: '#6b7a8d'}}>8 направлений медицины под одной крышей</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALIZATIONS.map((spec) => (
              <a key={spec.name} href={'/clinic/doctors?specialization=' + spec.slug}
                className="bg-white rounded-2xl p-6 transition-all group hover:-translate-y-1"
                style={{boxShadow: '0 4px 20px rgba(33,160,225,0.08)', border: '1px solid rgba(33,160,225,0.12)'}}>
                <div className="w-2 h-8 rounded-full mb-4" style={{background: 'linear-gradient(180deg,#21A0E1,#0BD5D0)'}}></div>
                <div className="font-semibold text-gray-900 mb-2">{spec.name}</div>
                <div className="text-sm" style={{color: '#6b7a8d'}}>{spec.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{background: '#EEF4F8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Как записаться</h2>
          <p className="text-center mb-12" style={{color: '#6b7a8d'}}>Три простых шага до приёма к врачу</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-8" style={{boxShadow: '0 4px 20px rgba(33,160,225,0.08)', border: '1px solid rgba(33,160,225,0.12)'}}>
                <div className="text-5xl font-bold mb-4" style={{color: '#21A0E1', opacity: 0.25}}>{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {doctors.length > 0 && (
        <section className="py-16" style={{background: '#F5F9FC'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Наши врачи</h2>
            <p className="text-center mb-12" style={{color: '#6b7a8d'}}>Лучшие специалисты клиники</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor: any) => (
                <a key={doctor.id} href={'/clinic/doctors/' + doctor.id}
                  className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 group"
                  style={{boxShadow: '0 4px 20px rgba(33,160,225,0.08)', border: '1px solid rgba(33,160,225,0.12)'}}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4" style={{background: 'linear-gradient(135deg,#21A0E1,#0BD5D0)'}}>
                    {doctor.user.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{doctor.user.name}</h3>
                  <p className="text-sm font-medium mb-2" style={{color: '#21A0E1'}}>{doctor.specialization.name}</p>
                  <p className="text-sm text-gray-600">Стаж {doctor.experienceYears} лет</p>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/clinic/doctors" className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl transition-all" style={{background: 'linear-gradient(90deg,#21A0E1,#0BD5D0)'}}>
                Все врачи →
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="py-16" style={{background: '#EEF4F8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Отзывы пациентов</h2>
          <p className="text-center mb-12" style={{color: '#6b7a8d'}}>Что говорят о нас наши пациенты</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl p-6" style={{boxShadow: '0 4px 20px rgba(33,160,225,0.08)', border: '1px solid rgba(33,160,225,0.12)'}}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-lg" style={{color: '#21A0E1'}}>★</span>
                  ))}
                </div>
                <p className="text-gray-800 mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы записаться?</h2>
          <p className="mb-10 text-xl" style={{color: 'rgba(255,255,255,0.7)'}}>Выберите врача и удобное время. Запись за 2 минуты.</p>
          <a href="/clinic/booking" className="text-white font-semibold px-12 py-4 rounded-xl inline-block text-lg" style={{background: 'linear-gradient(90deg,#21A0E1,#0BD5D0)', boxShadow: '0 8px 25px rgba(33,160,225,0.3)'}}>
            Записаться на приём
          </a>
        </div>
      </section>
    </>
  )
}
`

fs.writeFileSync('app/clinic/page.tsx', content, 'utf8')
console.log('Done')
