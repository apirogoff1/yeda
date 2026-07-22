'use client'
import FloatingShapes from '@/components/home/FloatingShapes'
import { motion } from 'framer-motion'
import Image from 'next/image'

const brushes = [
  { src: '/photo_yeda/brushes/brush-carrot.png', top: -204, left: 324, w: 900, rotate: -30 },
  { src: '/photo_yeda/brushes/brush-skyblue.png', top: 914, left: 338, w: 880, rotate: -15 },
  { src: '/photo_yeda/brushes/brush-blue.png', top: 80, left: 920, w: 820, rotate: 90 },
  { src: '/photo_yeda/brushes/brush-zucchini.png', top: 490, left: -219, w: 860, rotate: -102 },
  { src: '/photo_yeda/brushes/brush-strawberry.png', top: 1039, left: 845, w: 880, rotate: 125 },
  { src: '/photo_yeda/brushes/brush-blue.png', top: 1663, left: 732, w: 860, rotate: -125 },
  { src: '/photo_yeda/brushes/brush-raspberry.png', top: 1886, left: -98, w: 900, rotate: 10 },
  { src: '/photo_yeda/brushes/brush-carrot.png', top: 2100, left: 880, w: 860, rotate: 60 },
  { src: '/photo_yeda/brushes/brush-skyblue.png', top: 2440, left: -60, w: 880, rotate: 35 },
  { src: '/photo_yeda/brushes/brush-zucchini.png', top: 2780, left: 860, w: 860, rotate: 42 },
  { src: '/photo_yeda/brushes/brush-raspberry.png', top: 3000, left: -40, w: 880, rotate: -18 },
]

const drops = [
  { src: '/photo_yeda/brushes/drop-pink.png', top: 625, left: 631, w: 580, rotate: -30 },
  { src: '/photo_yeda/brushes/drop-blue.png', top: 806, left: 992, w: 560, rotate: 50 },
  { src: '/photo_yeda/brushes/brush-zucchini.png', top: 1254, left: 58, w: 860, rotate: -150 },
]

const veggies = [
  { src: '/photo_yeda/vegetables/carrot_1.png', top: 1512, left: 926, w: 218, rotate: 25 },
  { src: '/photo_yeda/vegetables/zucchini_1.png', top: 675, left: 1273, w: 230, rotate: -15 },
  { src: '/photo_yeda/vegetables/zucchini_1.png', top: 2749, left: 668, w: 230, rotate: 20 },
  { src: '/photo_yeda/vegetables/broccoli.png', top: 504, left: 356, w: 220, rotate: -63 },
  { src: '/photo_yeda/vegetables/avocado.png', top: 943, left: 441, w: 300, rotate: -30 },
  { src: '/photo_yeda/vegetables/strawberry.png', top: 932, left: 896, w: 185, rotate: 12 },
  { src: '/photo_yeda/vegetables/strawberry.png', top: 1816, left: 1249, w: 185, rotate: -15 },
  { src: '/photo_yeda/vegetables/tomato.png', top: 1380, left: 40, w: 210, rotate: -18 },
  { src: '/photo_yeda/vegetables/pepper.png', top: 766, left: 332, w: 300, rotate: 22 },
  { src: '/photo_yeda/vegetables/raspberry.png', top: 1773, left: 853, w: 175, rotate: -12 },
  { src: '/photo_yeda/vegetables/raspberry.png', top: 323, left: 802, w: 175, rotate: 15 },
  { src: '/photo_yeda/vegetables/carrot_1.png', top: 1662, left: 84, w: 212, rotate: 18 },
  { src: '/photo_yeda/vegetables/broccoli.png', top: 2390, left: 343, w: 215, rotate: -25 },
  { src: '/photo_yeda/vegetables/avocado.png', top: 2946, left: 119, w: 300, rotate: 15 },
  { src: '/photo_yeda/vegetables/tomato.png', top: 2097, left: 850, w: 210, rotate: -20 },
  { src: '/photo_yeda/vegetables/pepper.png', top: 3025, left: 614, w: 195, rotate: 10 },
]

const dishes = [
  { src: '/photo_yeda/illustrations/burger_illustration_2-Photoroom.png', top: 342, left: 914, w: 294, rotate: 8 },
  { src: '/photo_yeda/illustrations/pizza_illustration_1-Photoroom.png', top: 899, left: 1143, w: 308, rotate: -6 },
  { src: '/photo_yeda/illustrations/sushi_6.png', top: 771, left: 39, w: 294, rotate: 10 },
  { src: '/photo_yeda/illustrations/donat.png', top: 1795, left: 240, w: 304, rotate: 12 },
  { src: '/photo_yeda/illustrations/Doner.png', top: 2209, left: 619, w: 350, rotate: -10 },
  { src: '/photo_yeda/illustrations/Lamb chops.png', top: 2570, left: 1001, w: 280, rotate: 8 },
  { src: '/photo_yeda/illustrations/shish_kebab_2.png', top: 1246, left: 589, w: 300, rotate: -8 },
]

const dishAnimations = [
  // Бургер — растяжение по вертикали
  {
    animate: { scaleY: [1, 1.18, 0.88, 1.12, 1] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Пицца — мигание/пульсация прозрачности
  {
    animate: { opacity: [1, 0.4, 1] },
    transition: { duration: 2.0, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Суши — наклон/искажение формы
  {
    animate: { skewX: [-8, 8, -8], skewY: [-4, 4, -4] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Пончик — пульсация
  {
    animate: { scale: [1, 1.12, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Шаверма — squash
  {
    animate: { scaleX: [1, 1.12, 0.92, 1.06, 1], scaleY: [1, 0.88, 1.10, 0.95, 1] },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Lamb chops — покачивание
  {
    animate: { rotate: [-6, 6, -6] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' as const }
  },
  // Шашлык — плавное покачивание вверх-вниз
  {
    animate: { y: [0, -10, 0] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
  },
]

const float = (i: number) => ({
  animate: { y: [0, -10, 0] },
  transition: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' as const }
})

const jump = (i: number) => ({
  animate: {
    y: [0, -(14 + (i % 3) * 8), -4, -(18 + (i % 2) * 6), 0],
    rotate: [0, 3 - i % 5, -2 + i % 3, 4 - i % 4, 0],
    scale: [1, 1.04 + (i % 3) * 0.01, 0.98, 1.03, 1],
  },
  transition: {
    duration: 2.8 + i * 0.55,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    times: [0, 0.3, 0.5, 0.75, 1],
  }
})

export default function HeroSection() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '3200px', overflow: 'hidden', background: '#F5EAD8' }}>
      <FloatingShapes />

      {brushes.map((b, i) => (
        <motion.div key={`b${i}`}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, zIndex: 1, pointerEvents: 'none' }}>
          <Image src={b.src} alt="" width={b.w} height={Math.round(b.w * 0.6)} style={{ objectFit: 'contain', transform: `rotate(${b.rotate}deg)`, opacity: 0.6 }} />
        </motion.div>
      ))}

      {drops.map((d, i) => (
        <motion.div key={`d${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.15 }}
          style={{ position: 'absolute', top: d.top, left: d.left, width: d.w, zIndex: 2, pointerEvents: 'none' }}>
          <Image src={d.src} alt="" width={d.w} height={d.w} style={{ objectFit: 'contain', transform: `rotate(${d.rotate}deg)`, opacity: 0.6 }} />
        </motion.div>
      ))}

      {dishes.map((dish, i) => (
        <motion.div key={`dish${i}`}
          {...dishAnimations[i]}
          style={{ position: 'absolute', top: dish.top, left: dish.left, width: dish.w, zIndex: 11, pointerEvents: 'none', transform: `rotate(${dish.rotate}deg)` }}>
          <Image src={dish.src} alt="" width={dish.w} height={dish.w} style={{ objectFit: 'contain' }} />
        </motion.div>
      ))}

      {veggies.map((v, i) => (
        <motion.div key={`v${i}`}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          {...float(i)}
          style={{ position: 'absolute', top: v.top, left: v.left, width: v.w, zIndex: 3, pointerEvents: 'none' }}>
          <Image src={v.src} alt="" width={v.w} height={v.w} style={{ objectFit: 'contain', transform: `rotate(${v.rotate}deg)` }} />
        </motion.div>
      ))}

      {/* BLOCK:block-title */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
        style={{ position: 'absolute', top: 92, left: 60, zIndex: 10 }}>
        <Image src="/photo_yeda/title-bubble.svg" alt="EDA, KOTORAYA RADUET." width={510} height={272} style={{ width: 'clamp(272px, 38.25vw, 510px)', height: 'auto' }} />
      </motion.div>

      {/* BLOCK:block-tags */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
        style={{ position: 'absolute', top: 856, left: 532, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: '#5B2D8E', fontWeight: 700 }}>Свежие продукты</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: '#5B2D8E', fontWeight: 700 }}>Быстрая доставка</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: '#5B2D8E', fontWeight: 700 }}>Полезные блюда</span>
      </motion.div>

      {/* BLOCK:block-btns */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
        style={{ position: 'absolute', top: 709, left: 324, zIndex: 10, display: 'flex', gap: '16px' }}>
        <button style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 900, fontSize: '18px', backgroundColor: '#FF4D00', color: '#fff', border: 'none', borderRadius: '50px', padding: '16px 44px', cursor: 'pointer' }}>Заказать</button>
        <button style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 900, fontSize: '18px', backgroundColor: 'transparent', color: '#5B2D8E', border: '2.5px solid #1a1a1a', borderRadius: '50px', padding: '16px 44px', cursor: 'pointer' }}>Меню</button>
      </motion.div>

      {/* BLOCK:block-fresh */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1124, left: 11, zIndex: 10, maxWidth: '380px' }}>
        <Image src="/photo_yeda/title-fresh.png" alt="Svjezhie produkty kazhdyj den" width={760} height={300} style={{ width: "380px", height: "auto" }} />
      </motion.div>

      {/* BLOCK:block-fresh-tag-1 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1304, left: 58, zIndex: 10, maxWidth: '380px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#FF4D00' }}>Мы закупаем овощи ежедневно и готовим блюда только из свежих ингредиентов</p>
      </motion.div>

      {/* BLOCK:block-delivery */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1351, left: 900, zIndex: 10, maxWidth: '360px' }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#5B2D8E' }}>Доставка за 30-60 минут</h2>
      </motion.div>

      {/* BLOCK:block-delivery-tag-1 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1459, left: 952, zIndex: 10, maxWidth: '360px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#CC5500' }}>Курьеры всегда рядом</p>
      </motion.div>

      {/* BLOCK:block-delivery-tag-2 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1502, left: 935, zIndex: 10, maxWidth: '360px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#CC5500' }}>Доставим горячим прямо к вашей двери</p>
      </motion.div>

      {/* BLOCK:block-how */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1500, left: 60, zIndex: 10 }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#1A7A2E' }}>Как это работает</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '18px' }}>
          {['Выбираете блюда', 'Оплачиваете', 'Готовим', 'Доставляем', 'Наслаждаетесь'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <span style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '52px', fontWeight: 900, color: '#FF4D00' }}>{i + 1}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 700, color: '#5B2D8E' }}>{s}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BLOCK:block-why */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 1929, left: 629, zIndex: 10, maxWidth: '380px' }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#D4007A' }}>Почему выбирают YEDA</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {['Свежие ингредиенты', 'Понятный состав', 'Прозрачные цены', 'Доставка каждый день', 'Поддержка 24/7'].map((s, i) => (
            <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 700, color: '#1A7A2E' }}>✔ {s}</span>
          ))}
        </div>
      </motion.div>

      {/* BLOCK:block-ai */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2160, left: 60, zIndex: 10, maxWidth: '420px' }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#FFFF00' }}>ИИ поможет выбрать рацион</h2>
      </motion.div>

      {/* BLOCK:block-ai-tag-1 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2220, left: 60, zIndex: 10, maxWidth: '420px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#FFFF00' }}>Расскажите о своих предпочтениях, аллергиях и целях — YEDA предложит подходящее меню</p>
      </motion.div>

      {/* BLOCK:block-ai-btn */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2290, left: 60, zIndex: 10, maxWidth: '420px' }}>
        <button style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', backgroundColor: '#A855F7', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 36px', cursor: 'pointer' }}>Попробовать AI</button>
      </motion.div>

      {/* BLOCK:block-sub */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2527, left: 619, zIndex: 10, maxWidth: '400px' }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#1A7A2E' }}>Получайте любимую еду регулярно</h2>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <input type="email" placeholder="Ваш email" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', padding: '14px 20px', borderRadius: '50px', border: '2px solid #e0e0e0', outline: 'none', flex: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
          <button style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '15px', backgroundColor: '#FF4D00', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 28px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Подписаться</button>
        </div>
      </motion.div>

      {/* BLOCK:block-sub-tag-1 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2587, left: 619, zIndex: 10, maxWidth: '400px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 700, color: '#FF2D6B' }}>Оформите подписку и получайте свежие блюда каждый день без лишних забот</p>
      </motion.div>

      {/* BLOCK:block-social */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2560, left: 60, zIndex: 10 }}>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '34px', fontWeight: 700, color: '#8B008B' }}>Мы всегда рядом</h2>
        <div style={{ display: 'flex', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Telegram', color: '#29B6F6', href: 'https://t.me/yeda' },
            { label: 'MAX',      color: '#FF4D00', href: '#' },
            { label: 'Email',    color: '#5B2D8E', href: 'mailto:hello@yeda.ru' },
            { label: 'Telefon',  color: '#1A237E', href: 'tel:+78001234567' },
          ].map((c, i) => (
            <motion.a key={i} href={c.href} whileHover={{ scale: 1.15 }} style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '11px', textDecoration: 'none', textAlign: 'center', lineHeight: 1.2, transform: `translateY(${i % 2 === 0 ? -8 : 8}px)` }}>
              {c.label}
            </motion.a>
          ))}
        </div>
      </motion.div>


      {/* BLOCK:block-footer */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 2900, left: 60, zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '48px', fontWeight: 900, color: '#FF4D00' }}>YEDA</span>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#999', marginTop: '16px' }}>© 2025 YEDA. Все права защищены.</p>
      </motion.div>

    </div>
  )
}

