'use client'
import Link from 'next/link'
import { useState } from 'react'
import FloatingShapes from '@/components/home/FloatingShapes'

const css = `
.faq-search::placeholder { color: rgba(67,57,50,0.3); }
`

const accent = '#D4A017'
const dark = '#433932'
const muted = '#3D2E28'
const font1 = 'var(--font-comfortaa)'
const font2 = 'var(--font-geologica)'
const card = { background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '0', backdropFilter: 'blur(8px)', marginBottom: '24px', overflow: 'hidden' as const }

const faqs = [
  {
    qRu: 'Как быстро доставляется заказ?',
    aRu: 'Ориентировочное время доставки — 30–60 минут. Точное время зависит от адреса, загрузки кухни и дорожной ситуации. Актуальный прогноз показываем при оформлении заказа.',
  },
  {
    qRu: 'Как узнать, доставляете ли вы по моему адресу?',
    aRu: 'Введите адрес в корзине или на странице доставки. Система автоматически проверит доступность доставки.',
  },
  {
    qRu: 'Сколько стоит доставка?',
    aRu: 'Стоимость зависит от условий заказа и адреса. Точная сумма отображается перед оплатой.',
  },
  {
    qRu: 'Есть ли бесплатная доставка?',
    aRu: 'Да. При заказе от [указать сумму] ₽ доставка бесплатная. Актуальные условия отображаются в корзине.',
  },
  {
    qRu: 'Можно ли изменить заказ после оформления?',
    aRu: 'Если кухня ещё не начала приготовление, мы постараемся внести изменения. Свяжитесь с поддержкой как можно скорее.',
    btn: { label: 'Написать в поддержку', href: '/contacts' },
  },
  {
    qRu: 'Можно ли отменить заказ?',
    aRu: 'Да, если заказ ещё не перешёл в стадию приготовления. Возможность отмены зависит от статуса заказа.',
  },
  {
    qRu: 'Как оплатить заказ?',
    aRu: 'Доступные способы оплаты отображаются во время оформления. Выберите удобный вариант и подтвердите заказ.',
  },
  {
    qRu: 'Можно ли заказать еду на конкретное время?',
    aRu: 'Если функция доступна для вашего адреса, при оформлении появится возможность выбрать время доставки.',
  },
  {
    qRu: 'Где посмотреть состав блюда?',
    aRu: 'Откройте карточку блюда — там указаны ингредиенты, вес, теги и другая доступная информация.',
  },
  {
    qRu: 'Есть ли в меню вегетарианские блюда?',
    aRu: 'Да. Такие позиции отмечены специальным тегом «Вегетарианское». Также можно использовать фильтры меню.',
  },
  {
    qRu: 'Можно ли попросить убрать ингредиент?',
    aRu: 'Для некоторых блюд возможны изменения состава. Если опция доступна, она будет показана в карточке блюда или при оформлении заказа.',
  },
  {
    qRu: 'Что делать, если блюдо приехало повреждённым?',
    aRu: 'Напишите в поддержку и приложите фото заказа. Мы разберёмся в ситуации и предложим решение.',
  },
  {
    qRu: 'Что такое YEDA AI?',
    aRu: 'Это AI-помощник, который помогает подобрать еду на основе ваших предпочтений. Можно написать: «Хочу лёгкий ужин без мяса» или «Подбери обед до 800 рублей на двоих».',
  },
  {
    qRu: 'Как работает подписка?',
    aRu: 'Вы выбираете подходящий тариф, настраиваете предпочтения и получаете регулярные заказы и бонусы в соответствии с условиями тарифа.',
    btn: { label: 'Посмотреть подписку', href: '/subscription' },
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(f =>
    f.qRu.toLowerCase().includes(search.toLowerCase()) ||
    f.aRu.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{css}</style>
      <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden', background: '#FFF8EF' }}>
      <FloatingShapes />

      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '-60px', left: '-120px', width: '1000px', opacity: 0.75, pointerEvents: 'none', zIndex: 0, transform: 'rotate(15deg)', filter: 'blur(0.3px)' }} />
      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '400px', right: '-350px', width: '1100px', opacity: 0.7, pointerEvents: 'none', zIndex: 0, transform: 'rotate(120deg)', filter: 'blur(0.3px)' }} />
      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '800px', left: '-280px', width: '1000px', opacity: 0.7, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-20deg)', filter: 'blur(0.3px)' }} />
      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '1200px', right: '-300px', width: '1050px', opacity: 0.7, pointerEvents: 'none', zIndex: 0, transform: 'rotate(80deg)', filter: 'blur(0.3px)' }} />
      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '1600px', left: '-200px', width: '1000px', opacity: 0.7, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-40deg)', filter: 'blur(0.3px)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: '#FFC800', lineHeight: 1.2, marginBottom: '16px', textShadow: '0 2px 0 #C8960A, 0 3px 4px rgba(0,0,0,0.12)' }}>
            Вопросы? У нас есть ответы
          </h1>
          <p style={{ fontFamily: font2, fontSize: '18px', color: muted, lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 32px' }}>
            Собрали всё самое важное. А если не нашли нужного — просто напишите нам.
          </p>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Например: «Как оплатить заказ?»"
            className="faq-search"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '16px 24px',
              borderRadius: '50px',
              border: `2px solid ${accent}`,
              fontFamily: font2,
              fontSize: '16px',
              outline: 'none',
              background: '#fff',
              color: dark,
              boxSizing: 'border-box',
            }}
          />
        </div>

        {filtered.length === 0 && (
          <div style={{ background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontFamily: font2, fontSize: '17px', color: muted }}>Ничего не найдено. Попробуйте другой запрос или <Link href="/contacts" style={{ color: accent, textDecoration: 'none', fontWeight: 700 }}>напишите нам</Link>.</p>
          </div>
        )}

        {filtered.map((item) => {
          const realIndex = faqs.indexOf(item)
          const isOpen = open === realIndex
          return (
            <div key={realIndex} style={card}>
              <div
                onClick={() => setOpen(isOpen ? null : realIndex)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '28px 36px',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontFamily: font1, fontWeight: 900, fontSize: '18px', color: accent, minWidth: '32px' }}>{realIndex + 1}.</span>
                  <span style={{ fontFamily: font1, fontWeight: 700, fontSize: '17px', color: dark }}>{item.qRu}</span>
                </div>
                <span style={{ fontSize: '24px', color: accent, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', lineHeight: 1 }}>+</span>
              </div>
              {isOpen && (
                <div style={{ padding: '0 36px 28px', borderTop: `1px solid rgba(255,229,102,0.3)` }}>
                  <p style={{ fontFamily: font2, fontSize: '16px', color: muted, lineHeight: 1.75, marginTop: '20px', marginBottom: 0 }}>
                    {item.aRu}
                  </p>
                  {item.btn && (
                    <Link href={item.btn.href} style={{ display: 'inline-block', marginTop: '16px', background: accent, color: dark, fontFamily: font1, fontWeight: 700, fontSize: '15px', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none' }}>
                      {item.btn.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          )
        })}

        <div style={{ textAlign: 'center', marginTop: '24px', padding: '40px', background: 'rgba(255,255,255,0.65)', borderRadius: '32px', backdropFilter: 'blur(8px)' }}>
          <p style={{ fontFamily: font1, fontWeight: 700, fontSize: '20px', color: dark, marginBottom: '16px' }}>Не нашли ответ?</p>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '24px' }}>Напишите нам — ответим быстро.</p>
          <Link href="/contacts" style={{ background: '#FFD700', color: dark, fontFamily: font1, fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>
            Написать нам
          </Link>
        </div>

      </div>
    </main>
    </>
  )
}
