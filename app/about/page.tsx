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
  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', marginBottom: '40px' }
  const btn: React.CSSProperties = { background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }
  const btnOutline: React.CSSProperties = { background: 'transparent', color: accent, fontFamily: font1, fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block', border: `2px solid ${accent}` }

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />

      {/* Плавающая навигация */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 200 }}>
        {navOpen && (
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '24px', padding: '24px', marginBottom: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '260px', maxHeight: '90vh', overflowY: 'auto' }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setNavOpen(false) }} style={{ background: activeSection === n.id ? accent : 'transparent', color: activeSection === n.id ? '#fff' : muted, fontFamily: font1, fontWeight: 600, fontSize: '17px', padding: '12px 20px', borderRadius: '14px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setNavOpen(!navOpen)} style={{ background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '20px', padding: '20px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(66,184,131,0.4)', transition: 'all 0.2s' }}>
          {navOpen ? 'Закрыть' : 'Разделы'}
        </button>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div id="about" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '20px' }}>
            YEDA — сервис еды,<br />который создан вокруг человека
          </h1>
          <p style={{ fontFamily: font2, fontSize: '18px', color: muted, lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 32px' }}>
            Мы соединяем свежую еду, удобный заказ, быструю доставку и технологии, чтобы каждый день было проще нормально поесть.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={btn}>Посмотреть меню</Link>
            <Link href="/how-it-works" style={btnOutline}>Как всё устроено</Link>
          </div>
        </div>

        {/* ЧТО ТАКОЕ YEDA */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Мы не просто привозим еду</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '16px' }}>
            YEDA — сервис доставки свежей еды для тех, кто хочет питаться вкусно и разнообразно, но не хочет превращать каждый приём пищи в отдельную задачу.
          </p>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Мы берём на себя весь путь: от разработки блюд и работы с ингредиентами до приготовления, упаковки, доставки и поддержки после заказа. Пользователь должен сделать только главное — выбрать, что ему хочется сегодня.
          </p>
          <p style={{ fontFamily: font1, fontSize: '20px', fontWeight: 700, color: dark, marginBottom: '16px' }}>
            Еда должна быть частью жизни, а не ещё одним делом в списке
          </p>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Работа, учёба, встречи, семья, спорт, отдых — у каждого свой ритм. Поэтому мы строим YEDA вокруг простого принципа: еда должна подстраиваться под человека, а не наоборот. Можно заказать один обед, собрать ужин на компанию, повторить любимый заказ или настроить регулярную доставку через подписку.
          </p>
          <Link href="/menu" style={btn}>Перейти в меню</Link>
        </div>

        {/* ИСТОРИЯ */}
        <div id="history" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '8px' }}>Как появилась YEDA</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '32px' }}>
            Всё началось не с инвестиций и не с большой команды. Началось с простого раздражения — каждый день тратить время на вопрос «что поесть?», а потом ещё больше времени на его решение.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { year: '[ГОД ОСНОВАНИЯ]', title: 'Появилась идея', text: 'Основатели YEDA столкнулись с одной и той же проблемой: нормально поесть в течение рабочего дня — отдельная задача. Доставка была либо медленной, либо непонятной по составу, либо просто невкусной. Захотелось сделать иначе.' },
              { year: '[ГОД]', title: 'Первые заказы', text: 'Небольшая кухня, несколько блюд в меню, курьеры на велосипедах. Первые клиенты — друзья и знакомые. Каждый заказ разбирался вручную, каждая ошибка фиксировалась и исправлялась.' },
              { year: '[ГОД]', title: 'Запуск полноценного сервиса', text: 'Появился сайт, расширилась кухня, выросла команда. Меню стало стабильным — не просто список блюд, а продуманный набор позиций под разные запросы: завтрак, обед, ужин, перекус.' },
              { year: '[ГОД]', title: 'Расширение меню и географии', text: 'YEDA вышла за пределы одного района. Новые блюда, новые поставщики, первые корпоративные клиенты. Появилась подписка — для тех, кто хочет заказывать регулярно без лишних действий.' },
              { year: '[ГОД]', title: 'Запуск YEDA AI', text: 'Мы добавили AI-ассистента, который помогает выбрать блюдо обычным языком. Не фильтры и не сортировка — просто диалог. «Хочу что-нибудь лёгкое без мяса» — и система предлагает варианты.' },
              { year: 'Сейчас', title: 'Новый этап', text: 'YEDA продолжает развиваться: новые города, новые блюда, улучшение логистики и клиентского опыта. Главная задача не изменилась — сделать хорошую еду простой частью обычного дня.' },
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

        {/* ПОЧЕМУ ПОЯВИЛАСЬ YEDA */}
        <div id="how" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Мы начали с простой проблемы</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            У современного человека постоянно не хватает времени на простые вещи. Нужно решить, что купить, придумать, что приготовить, найти продукты, приготовить еду, убрать после готовки. С другой стороны, обычная доставка часто заставляет выбирать между скоростью, вкусом, качеством и понятным составом. YEDA создаётся для того, чтобы убрать этот компромисс.
          </p>
          <h3 style={{ fontFamily: font1, fontSize: '22px', fontWeight: 700, color: dark, marginBottom: '20px' }}>Что мы хотим изменить</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { title: 'Выбор', text: 'Когда человек открывает приложение, он не должен изучать сотни случайных позиций. Меню должно помогать принять решение — предлагать подходящее, а не перегружать.' },
              { title: 'Качество', text: 'Свежая еда начинается не с красивой фотографии блюда, а с ингредиентов, рецептуры, процессов на кухне и контроля качества. Без этого любая упаковка — просто упаковка.' },
              { title: 'Время', text: 'Человек заказывает еду именно потому, что хочет освободить время. Поэтому скорость должна быть частью всего сервиса, а не только последнего километра доставки.' },
              { title: 'Персонализация', text: 'Одинаковое меню подходит не всем. Предпочтения, образ жизни, ограничения и привычки у каждого разные. Хороший сервис это учитывает.' },
              { title: 'Простота', text: 'От первого клика до получения заказа не должно быть лишних действий. Никаких обязательных регистраций, запутанных корзин и неожиданных условий на последнем шаге.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px' }}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* КАЧЕСТВО */}
        <div id="quality" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Свежесть — это не рекламное слово</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            За каждым блюдом стоит цепочка решений, которые принимаются задолго до того, как заказ попадает к курьеру. Мы контролируем каждый этап — от поставщика до тарелки.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {[
              { title: 'Поставщики', text: 'Мы работаем только с проверенными поставщиками. Каждый проходит отбор по качеству продуктов, условиям хранения и стабильности поставок. Случайных партнёров нет.' },
              { title: 'Приёмка', text: 'Каждая партия ингредиентов проверяется при поступлении. Продукты с нарушением температурного режима, истекающим сроком или видимыми дефектами не принимаются.' },
              { title: 'Хранение', text: 'Разные продукты хранятся в разных условиях. Температурный режим, влажность и сроки использования контролируются ежедневно.' },
              { title: 'Приготовление', text: 'Блюда готовятся по зафиксированным рецептурам. Порционирование, время приготовления и финальный вид проверяются перед упаковкой.' },
              { title: 'Упаковка', text: 'Упаковка подбирается под тип блюда. Горячее сохраняет температуру, хрупкое защищено от повреждений, каждый заказ промаркирован.' },
              { title: 'Рекламации', text: 'Если что-то пошло не так — мы разбираем каждый случай. Не просто возврат или извинение, а анализ причины и изменение процесса.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px' }}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <Link href="/delivery" style={btn}>Подробнее о доставке</Link>
        </div>

        {/* AI */}
        <div id="ai" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Технологии должны помогать выбирать, а не усложнять выбор</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            В YEDA мы используем AI, чтобы помочь человеку быстрее найти подходящую еду. Не фильтры и не сортировка — просто обычный диалог.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.9 }}>
              <div style={{ marginBottom: '8px' }}>— Хочу лёгкий ужин без мяса.</div>
              <div style={{ marginBottom: '8px' }}>— Подбери что-нибудь сытное до 800 рублей.</div>
              <div>— Нужно заказать еду на троих.</div>
            </div>
          </div>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            AI анализирует запрос и предлагает подходящие варианты из меню. Он учитывает предпочтения, бюджет, состав блюд и доступные фильтры. При этом финальное решение всегда остаётся за пользователем — AI предлагает, вы решаете.
          </p>
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
          <Link href="/ai-chat" style={btn}>Попробовать YEDA AI</Link>
        </div>

        {/* КОМАНДА */}
        <div id="team" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>За YEDA стоят люди</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Над сервисом работают специалисты разных направлений: кухня, продукт, логистика, разработка, дизайн, поддержка, маркетинг, операционная команда. Каждый отвечает за свой участок пути, но конечная задача одна — сделать хороший заказ для клиента.
          </p>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Мы не публикуем фотографии сотрудников без их согласия и не создаём выдуманные профили. Реальная информация о команде появится здесь, когда будет готова.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px' }}>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '0' }}>
              Мы растём — и всегда ищем людей, которым важны вкус, качество и хороший сервис.
            </p>
          </div>
        </div>

        {/* ЦЕННОСТИ */}
        <div id="values" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '32px' }}>Во что мы верим</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { num: '01', title: 'Вкус имеет значение', text: 'Мы не считаем вкус второстепенной характеристикой продукта. Если еда полезная, быстрая и удобная, но невкусная — мы не сделали свою работу.' },
              { num: '02', title: 'Клиенту не должно быть сложно', text: 'Сервис должен экономить время, а не забирать его. Каждый лишний шаг в интерфейсе, каждая непонятная формулировка — это наша недоработка.' },
              { num: '03', title: 'Говорим честно', text: 'Мы не обещаем того, чего не можем выполнить. Если что-то пошло не так — объясняем ситуацию и ищем решение, а не прячемся за скриптами поддержки.' },
              { num: '04', title: 'Улучшаем продукт постоянно', text: 'Смотрим на обратную связь, анализируем заказы и меняем процессы, когда видим возможность сделать их лучше. Хорошего достаточно не бывает.' },
              { num: '05', title: 'Технологии работают на человека', text: 'AI, автоматизация и аналитика нужны не ради самих технологий. Их задача — сделать опыт клиента проще и точнее.' },
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
        <div id="geo" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Где работает YEDA</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '24px' }}>
            Реальная география сервиса будет опубликована здесь. Мы не пишем «работаем по всей России», если это не соответствует действительности.
          </p>
          <div style={{ background: 'rgba(26,122,46,0.06)', borderRadius: '20px', padding: '24px' }}>
            <p style={{ fontFamily: font1, fontSize: '17px', fontWeight: 700, color: dark, marginBottom: '8px' }}>[ДАННЫЕ ОТ КОМПАНИИ]</p>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7 }}>Список городов, зоны доставки и время работы появятся после подтверждения данных.</p>
          </div>
        </div>

        {/* КОНТАКТЫ */}
        <div id="contacts" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '24px' }}>Давайте на связи</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {[
              { title: 'Поддержка клиентов', lines: ['Телефон: [ДАННЫЕ ОТ КОМПАНИИ]', 'Email: [ДАННЫЕ ОТ КОМПАНИИ]'] },
              { title: 'Для партнёров', lines: ['Email: [ДАННЫЕ ОТ КОМПАНИИ]'] },
              { title: 'Для СМИ', lines: ['Email: [ДАННЫЕ ОТ КОМПАНИИ]'] },
              { title: 'Юридический адрес', lines: ['[ДАННЫЕ ОТ КОМПАНИИ]'] },
            ].map((block, i) => (
              <div key={i}>
                <div style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '6px' }}>{block.title}</div>
                {block.lines.map((line, j) => (
                  <div key={j} style={{ fontFamily: font2, fontSize: '17px', color: muted }}>{line}</div>
                ))}
              </div>
            ))}
          </div>
          <Link href="/contacts" style={btn}>Открыть контакты</Link>
        </div>

        {/* ФИНАЛ */}
        <div style={{ ...card, textAlign: 'center', marginBottom: 0 }}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '16px' }}>Теперь вы знаете, что стоит за вашим заказом</h2>
          <p style={{ fontFamily: font2, fontSize: '17px', color: muted, lineHeight: 1.7, marginBottom: '32px' }}>
            За каждой доставкой YEDA стоят продукты, люди, кухня, технологии, логистика и множество небольших решений. Мы продолжаем улучшать этот путь, чтобы хорошая еда становилась простой частью обычного дня.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={btn}>Посмотреть меню</Link>
            <Link href="/how-it-works" style={btnOutline}>Как работает YEDA</Link>
          </div>
        </div>

      </div>
    </main>
  )
}
