'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import FloatingShapes from '@/components/home/FloatingShapes'

export default function AboutPage() {
  const accent = '#1A7A2E'
  const dark = '#433932'
  const muted = '#3D2E28'
  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.65)',
    borderRadius: '32px',
    padding: '40px',
    backdropFilter: 'blur(8px)',
    marginBottom: '40px'
  }
  const btn: React.CSSProperties = {
    background: accent,
    color: '#fff',
    fontFamily: font1,
    fontWeight: 700,
    fontSize: '16px',
    padding: '14px 36px',
    borderRadius: '50px',
    textDecoration: 'none',
    display: 'inline-block'
  }
  const btnOutline: React.CSSProperties = {
    background: 'transparent',
    color: accent,
    fontFamily: font1,
    fontWeight: 700,
    fontSize: '16px',
    padding: '14px 36px',
    borderRadius: '50px',
    textDecoration: 'none',
    display: 'inline-block',
    border: `2px solid ${accent}`
  }

  const [activeSection, setActiveSection] = useState('')
  const [navOpen, setNavOpen] = useState(false)

  const navItems = [
    { id: 'about', label: 'О YEDA' },
    { id: 'history', label: 'История' },
    { id: 'how', label: 'Как устроено' },
    { id: 'quality', label: 'Качество' },
    { id: 'ai', label: 'AI' },
    { id: 'team', label: 'Команда' },
    { id: 'values', label: 'Ценности' },
    { id: 'geo', label: 'География' },
    { id: 'contacts', label: 'Контакты' },
  ]

  useEffect(() => {
    const handler = () => {
      const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]!
        if (el.getBoundingClientRect().top <= 120) {
          setActiveSection(el.id)
          return
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top, behavior: 'smooth' }); }
    setNavOpen(false)
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />

      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '-80px', left: '-150px', width: '1100px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(12deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '400px', right: '-380px', width: '1050px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-145deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '900px', left: '-200px', width: '900px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(55deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '1400px', right: '-100px', width: '850px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '1900px', left: '-250px', width: '1000px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(80deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '2500px', right: '-300px', width: '950px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-170deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '2900px', left: '-180px', width: '980px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(40deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-zucchini.png" alt="" style={{ position: 'absolute', top: '3300px', right: '-350px', width: '1050px', opacity: 0.38, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-60deg)', filter: 'blur(1.5px)' }} />

      {/* Плавающая навигация */}
      <div className="about-nav-wrap" style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 200 }}>
        {navOpen && (
          <div className="about-nav-menu" style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '24px', padding: '20px', marginBottom: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px', maxHeight: '70vh', overflowY: 'auto' }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: activeSection === n.id ? accent : 'transparent', color: activeSection === n.id ? '#fff' : muted, fontFamily: font1, fontWeight: 600, fontSize: '15px', padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
        <button className="about-nav-btn" onClick={() => setNavOpen(!navOpen)} style={{ background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '15px', padding: '12px 28px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(26,122,46,0.35)', transition: 'all 0.2s' }}>
          {navOpen ? 'Закрыть' : 'Разделы'}
        </button>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div id="about" className="about-hero" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 className="about-h1" style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '20px' }}>
            YEDA — сервис еды,<br />который создан вокруг человека
          </h1>
          <p className="about-sub" style={{ fontFamily: font2, fontSize: '18px', color: muted, lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 32px' }}>
            Мы соединяем свежую еду, удобный заказ, быструю доставку и технологии, чтобы каждый день было проще нормально поесть.
          </p>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={btn}>Посмотреть меню</Link>
            <Link href="/how-it-works" style={btnOutline}>Как всё устроено</Link>
          </div>
        </div>

        {/* ЧТО ТАКОЕ YEDA */}
        <div className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Мы не просто привозим еду</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '16px' }}>
            YEDA — сервис доставки свежей еды для тех, кто хочет питаться вкусно и разнообразно, но не хочет превращать каждый приём пищи в отдельную задачу.
          </p>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Мы берём на себя весь путь: от разработки блюд и работы с ингредиентами до приготовления, упаковки, доставки и поддержки после заказа.
          </p>
          <p style={{ fontFamily: font1, fontSize: '20px', fontWeight: 700, color: dark, marginBottom: '16px' }}>
            Еда должна быть частью жизни, а не ещё одним делом в списке
          </p>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Работа, учёба, встречи, семья, спорт, отдых — у каждого свой ритм. Можно заказать один обед, собрать ужин на компанию, повторить любимый заказ.
          </p>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px' }}>
            <Link href="/menu" style={btn}>Перейти в меню</Link>
          </div>
        </div>

        {/* ИСТОРИЯ */}
        <div id="history" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '8px' }}>Как появилась YEDA</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '32px' }}>
            Всё началось не с инвестиций и не с большой команды. Началось с простого раздражения.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { year: '2022', title: 'Появилась идея', text: 'Основатели YEDA столкнулись с одной и той же проблемой: нормально поесть в течение рабочего дня — отдельная задача.' },
              { year: '2022', title: 'Первые заказы', text: 'Небольшая кухня, несколько блюд в меню, курьеры на велосипедах. Первые клиенты — друзья и знакомые.' },
              { year: '2023', title: 'Запуск полноценного сервиса', text: 'Появился сайт, расширилась кухня, выросла команда. Меню стало стабильным.' },
              { year: '2023', title: 'Расширение меню и географии', text: 'YEDA вышла за пределы одного района. Появилась подписка.' },
              { year: '2024', title: 'Запуск YEDA AI', text: 'Мы добавили AI-ассистента, который помогает выбрать блюдо обычным языком.' },
              { year: 'Сейчас', title: 'Новый этап', text: 'YEDA продолжает развиваться: новые города, новые блюда, улучшение логистики.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', paddingBottom: '32px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '40px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '4px' }} />
                  {i < 5 && <div style={{ width: '2px', flex: 1, background: 'rgba(26,122,46,0.2)', marginTop: '8px' }} />}
                </div>
                <div style={{ paddingBottom: '8px' }}>
                  <div style={{ fontFamily: font1, fontSize: '14px', fontWeight: 700, color: accent, marginBottom: '4px' }}>{item.year}</div>
                  <div style={{ fontFamily: font1, fontSize: '20px', fontWeight: 700, color: dark, marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* КАК УСТРОЕНО */}
        <div id="how" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Мы начали с простой проблемы</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            У современного человека постоянно не хватает времени. YEDA создаётся для того, чтобы убрать этот компромисс.
          </p>
          <h3 style={{ fontFamily: font1, fontSize: '22px', fontWeight: 700, color: dark, marginBottom: '20px' }}>Что мы хотим изменить</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { title: 'Выбор', text: 'Меню должно помогать принять решение — предлагать подходящее, а не перегружать.' },
              { title: 'Качество', text: 'Свежая еда начинается с ингредиентов, рецептуры и контроля качества.' },
              { title: 'Время', text: 'Скорость должна быть частью всего сервиса, а не только последнего километра доставки.' },
              { title: 'Персонализация', text: 'Одинаковое меню подходит не всем. Предпочтения, образ жизни, ограничения и привычки у каждого разные.' },
              { title: 'Простота', text: 'От первого клика до получения заказа не должно быть лишних действий.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px' }}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* КАЧЕСТВО */}
        <div id="quality" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Свежесть — это не рекламное слово</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Мы контролируем каждый этап — от поставщика до тарелки.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {[
              { title: 'Поставщики', text: 'Работаем только с проверенными поставщиками.' },
              { title: 'Приёмка', text: 'Каждая партия ингредиентов проверяется при поступлении.' },
              { title: 'Хранение', text: 'Температурный режим, влажность и сроки контролируются ежедневно.' },
              { title: 'Приготовление', text: 'Блюда готовятся по зафиксированным рецептурам.' },
              { title: 'Упаковка', text: 'Упаковка подбирается под тип блюда.' },
              { title: 'Рекламации', text: 'Если что-то пошло не так — мы разбираем каждый случай.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px' }}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px' }}>
            <Link href="/delivery" style={btn}>Подробнее о доставке</Link>
          </div>
        </div>

        {/* AI */}
        <div id="ai" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Технологии должны помогать выбирать, а не усложнять выбор</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            В YEDA мы используем AI, чтобы помочь человеку быстрее найти подходящую еду.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.9 }}>
              <div style={{ marginBottom: '8px' }}>— Хочу лёгкий ужин без мяса.</div>
              <div style={{ marginBottom: '8px' }}>— Подбери что-нибудь сытное до 800 рублей.</div>
              <div>— Нужно заказать еду на троих.</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {[
              'Подбор блюд по описанию запроса',
              'Рекомендации на основе предпочтений',
              'Поиск альтернатив и похожих блюд',
              'Подбор по бюджету',
              'Учёт ограничений и фильтров',
              'Помощь с выбором для компании',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                <span style={{ fontFamily: font2, fontSize: '17px', color: muted }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px' }}>
            <Link href="/ai-chat" style={btn}>Попробовать YEDA AI</Link>
          </div>
        </div>

        {/* КОМАНДА */}
        <div id="team" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>За YEDA стоят люди</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Над сервисом работают специалисты разных направлений.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px' }}>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '0' }}>
              Мы растём — и всегда ищем людей, которым важны вкус, качество и хороший сервис.
            </p>
          </div>
        </div>

        {/* ЦЕННОСТИ */}
        <div id="values" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '32px' }}>Во что мы верим</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { num: '01', title: 'Вкус имеет значение', text: 'Если еда полезная, быстрая и удобная, но невкусная — мы не сделали свою работу.' },
              { num: '02', title: 'Клиенту не должно быть сложно', text: 'Сервис должен экономить время, а не забирать его.' },
              { num: '03', title: 'Говорим честно', text: 'Мы не обещаем того, чего не можем выполнить.' },
              { num: '04', title: 'Улучшаем продукт постоянно', text: 'Хорошего достаточно не бывает.' },
              { num: '05', title: 'Технологии работают на человека', text: 'AI, автоматизация и аналитика нужны, чтобы сделать опыт клиента проще.' },
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px' }}>
                <div style={{ fontFamily: font1, fontSize: '32px', fontWeight: 900, color: accent, opacity: 0.4, minWidth: '48px' }}>{v.num}</div>
                <div>
                  <div style={{ fontFamily: font1, fontSize: '20px', fontWeight: 700, color: dark, marginBottom: '8px' }}>{v.title}</div>
                  <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{v.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ГЕОГРАФИЯ */}
        <div id="geo" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Где работает YEDA</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Реальная география сервиса будет опубликована здесь.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px' }}>
            <p style={{ fontFamily: font1, fontSize: '17px', fontWeight: 700, color: dark, marginBottom: '8px' }}>г. Москва, Хлебный переулок, д. 3</p>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>Москва — ЦАО, САО, НАО и Бутово. Ежедневно 08:00–23:00.</p>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginTop: '8px' }}>Санкт-Петербург — Василеостровский, Петроградский, Центральный районы. Ежедневно 09:00–22:00.</p>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginTop: '8px' }}>Новосибирск — Железнодорожный, Октябрьский, Ленинский районы. Ежедневно 10:00–21:00.</p>
          </div>
        </div>

        {/* КОНТАКТЫ */}
        <div id="contacts" className="about-card del-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '24px' }}>Как с нами связаться</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {[
              { title: 'Поддержка клиентов', lines: ['Тел.: +7 (495) 123-45-67', 'Email: apirogoff1@gmail.com'] },
              { title: 'Для партнёров', lines: ['Email: partners@yeda.ru'] },
              { title: 'Для СМИ', lines: ['Email: press@yeda.ru'] },
              { title: 'Юридический адрес', lines: ['г. Москва, Хлебный переулок, д. 3'] },
            ].map((block, i) => (
              <div key={i}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{block.title}</div>
                {block.lines.map((line, j) => (
                  <div key={j} style={{ fontFamily: font2, fontSize: '17px', color: muted }}>{line}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px' }}>
            <Link href="/contacts" style={btn}>Открыть контакты</Link>
          </div>
        </div>

        {/* ФИНАЛ */}
        <div className="about-card del-card" style={{ ...card, textAlign: 'center', marginBottom: 0 }}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Теперь вы знаете, что стоит за вашим заказом</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '32px' }}>
            Мы продолжаем улучшать этот путь, чтобы хорошая еда становилась простой частью обычного дня.
          </p>
          <div className="del-btn-group" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={btn}>Посмотреть меню</Link>
            <Link href="/how-it-works" style={btnOutline}>Как работает YEDA</Link>
          </div>
        </div>

      </div>
    </main>
  )
}
