import Link from 'next/link'
import FloatingShapes from '@/components/home/FloatingShapes'

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Выбираете блюдо',
      text: 'Открывайте меню и собирайте заказ под своё настроение. Хочется чего-то сытного? Берите бургер или боул. Полегче? Есть салаты, супы и полезные блюда. А если хочется просто порадовать себя — мы не осуждаем десерты.',
      micro: 'Фильтруйте блюда по категории, составу и тегам.',
      btn: { text: 'Перейти в меню', href: '/menu' },
    },
    {
      num: '02',
      title: 'Оформляете заказ',
      text: 'Добавьте блюда в корзину, проверьте состав и выберите удобный способ оплаты. Никаких длинных форм — только самое необходимое.',
      micro: 'Можно сохранить адрес, чтобы в следующий раз оформить заказ ещё быстрее.',
      btn: { text: 'Оформить заказ', href: '/cart' },
    },
    {
      num: '03',
      title: 'Мы готовим',
      text: 'После подтверждения заказ отправляется на кухню. Повара начинают готовить из свежих продуктов — без долгого хранения готовых блюд.',
      micro: 'Готовим ближе к моменту доставки, чтобы еда приехала вкусной.',
      btn: null,
    },
    {
      num: '04',
      title: 'Курьер везёт',
      text: 'Заказ аккуратно упаковывается и отправляется к вам. Следить за статусом можно в личном кабинете.',
      micro: 'Ориентировочное время доставки — 30–60 минут.',
      btn: null,
    },
    {
      num: '05',
      title: 'Наслаждаетесь',
      text: 'Открываете пакет. Достаёте любимое блюдо. Всё остальное можно отложить хотя бы на полчаса.',
      micro: null,
      btn: { text: 'Заказать прямо сейчас', href: '/menu' },
    },
  ]

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      
      <FloatingShapes />
      <img src="/photo_yeda/brushes/brush-carrot.png" alt="" style={{ position: 'absolute', top: '100px', left: '-80px', width: '1200px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(25deg)', filter: 'blur(1.5px)' }} />
      <FloatingShapes />
      <img src="/photo_yeda/brushes/brush-carrot.png" alt="" style={{ position: 'absolute', top: '950px', right: '-200px', width: '1300px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-80deg)', filter: 'blur(1.5px)' }} />
      <FloatingShapes />
      <img src="/photo_yeda/brushes/brush-carrot.png" alt="" style={{ position: 'absolute', top: '1800px', left: '-100px', width: '1250px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(150deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-orange.png" alt="" style={{ position: 'absolute', top: '300px', right: '-100px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-orange.png" alt="" style={{ position: 'absolute', top: '1200px', left: '-100px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-120deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-orange.png" alt="" style={{ position: 'absolute', top: '2100px', right: '-80px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(200deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/vegetables/carrot_1.png" alt="" style={{ position: 'absolute', top: '90px', left: '6%', width: '400px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-15deg)', filter: 'blur(1.5px)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '48px', fontWeight: 900, color: '#FF5A1F', lineHeight: 1.2, marginBottom: '16px' }}>
            Еда, которую хочется заказать ещё до того, как проголодался
          </h1>
          <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '18px', color: '#3D2E28', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
            Выбирайте любимые блюда, оформляйте заказ за пару минут — и уже через 30–60 минут вкусный обед или ужин будет у вашей двери.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={{ background: '#FF5A1F', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>Заказать еду</Link>
            <Link href="/menu" style={{ background: 'transparent', color: '#FF5A1F', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', border: '2px solid #FF5A1F' }}>Посмотреть меню</Link>
          </div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '32px', fontWeight: 900, color: '#433932', textAlign: 'center', marginBottom: '32px' }}>5 шагов до вкусного</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.65)', borderRadius: '24px', padding: '24px 28px', backdropFilter: 'blur(8px)' }}>
                <div style={{ minWidth: '56px', height: '56px', borderRadius: '50%', background: '#FF5A1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-comfortaa)', fontSize: '20px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '22px', fontWeight: 700, color: '#433932', marginBottom: '6px' }}>{step.title}</div>
                  <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '17px', color: '#3D2E28', lineHeight: 1.6, marginBottom: step.micro || step.btn ? '8px' : '0' }}>{step.text}</div>
                  {step.micro && <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#FF5A1F', fontStyle: 'italic', marginBottom: step.btn ? '12px' : '0' }}>{step.micro}</div>}
                  {step.btn && <Link href={step.btn.href} style={{ display: 'inline-block', background: '#FF5A1F', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '14px', padding: '10px 24px', borderRadius: '50px', textDecoration: 'none' }}>{step.btn.text}</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '48px', background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '28px', fontWeight: 900, color: '#433932', marginBottom: '12px' }}>От голода до еды — несколько кликов</h2>
          <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', color: '#3D2E28', marginBottom: '32px' }}>Не нужно планировать ужин на неделю вперёд. YEDA помогает решить вопрос с едой тогда, когда он действительно возник.</p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { emoji: '🥕', title: 'Свежие продукты', text: 'Готовим из ингредиентов, которые сами хотели бы видеть в своей тарелке.' },
              { emoji: '⚡', title: 'Быстрая доставка', text: 'Ориентир 30–60 минут.' },
              { emoji: '🧠', title: 'AI-помощник', text: 'Подскажет блюдо или соберёт рацион под ваши предпочтения.' },
            ].map((item) => (
              <div key={item.title} style={{ flex: '1', minWidth: '200px', maxWidth: '220px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{item.emoji}</div>
                <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '16px', fontWeight: 700, color: '#433932', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', color: '#3D2E28' }}>{item.text}</div>
              </div>
            ))}
          </div>
          <Link href="/menu" style={{ background: '#FF5A1F', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>Подобрать еду</Link>
        </div>

        <div style={{ marginBottom: '48px', background: 'rgba(255,90,31,0.08)', borderRadius: '32px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '26px', fontWeight: 900, color: '#433932', marginBottom: '12px' }}>Не знаете, что заказать?</h2>
          <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', color: '#3D2E28', marginBottom: '8px' }}>Расскажите YEDA AI, чего хочется сегодня — он поможет определиться.</p>
          <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#FF5A1F', fontStyle: 'italic', marginBottom: '24px' }}>«Хочу что-нибудь сытное, но не слишком тяжёлое, без острого»</p>
          <Link href="/ai-chat" style={{ background: '#FF5A1F', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>Спросить AI</Link>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '28px', fontWeight: 900, color: '#433932', marginBottom: '24px' }}>Выбирайте еду. Мы позаботимся об остальном.</h2>
          <Link href="/menu" style={{ background: '#FF5A1F', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '18px', padding: '18px 48px', borderRadius: '50px', textDecoration: 'none' }}>Заказать в YEDA</Link>
        </div>

      </div>
    </main>
  )
}
