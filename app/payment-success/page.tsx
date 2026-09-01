'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FloatingShapes from '@/components/home/FloatingShapes'

const pageDekor_brushes = [
  { src: '/photo_yeda/brushes/brush-lemon.png', top: 352, left: 188, w: 1000, rotate: 15 },
  { src: '/photo_yeda/brushes/brush-strawberry.png', top: 47, left: -192, w: 1000, rotate: -25 },
  { src: '/photo_yeda/brushes/brush-skyblue.png', top: 233, left: 847, w: 900, rotate: 40 },
]
const pageDekor_drops = [

]
const pageDekor_veggies = [

]

export default function PaymentSuccessPage() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'
  const accent = '#FF4D00'
  const dark = '#433932'

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <FloatingShapes />
      {pageDekor_brushes.map((b, i) => (
        <img key={i} src={b.src} alt="" style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, opacity: 0.4, pointerEvents: 'none', zIndex: 0, transform: `rotate(${b.rotate}deg)`, filter: 'blur(1.5px)' }} />
      ))}
      {pageDekor_drops.map((b, i) => (
        <img key={i} src={b.src} alt="" style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, opacity: 0.6, pointerEvents: 'none', zIndex: 0, transform: `rotate(${b.rotate}deg)` }} />
      ))}
      {pageDekor_veggies.map((b, i) => (
        <img key={i} src={b.src} alt="" style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, pointerEvents: 'none', zIndex: 1, transform: `rotate(${b.rotate}deg)` }} />
      ))}

      <div style={{
        position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto', padding: '0 24px',
        textAlign: 'center',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
      }}>

        <h1 style={{ fontFamily: font1, fontSize: '52px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '16px' }}>
          Заказ принят!
        </h1>

        <p style={{ fontFamily: font2, fontSize: '20px', color: dark, marginBottom: '24px', lineHeight: 1.6 }}>
          Спасибо, что оформили заказ!
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '32px 40px',
          marginBottom: '40px',
          border: '1.5px solid rgba(255,77,0,0.12)',
        }}>
          <p style={{ fontFamily: font2, fontSize: '15px', color: '#888', lineHeight: 1.7, margin: 0 }}>
            Данный сайт является демонстрационным. После подключения ЮКассы здесь будет реальная оплата, подтверждение заказа на email и смс-уведомление.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/menu" style={{
            background: 'linear-gradient(135deg, #FF7A1A, #FF4E1A)',
            color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '16px',
            padding: '14px 36px', borderRadius: '50px', textDecoration: 'none',
            display: 'inline-block', boxShadow: '0 4px 16px rgba(255,90,31,0.35)',
          }}>
            Вернуться в меню
          </Link>
          <Link href="/" style={{
            background: 'rgba(255,255,255,0.8)',
            color: accent, fontFamily: font1, fontWeight: 700, fontSize: '16px',
            padding: '14px 36px', borderRadius: '50px', textDecoration: 'none',
            display: 'inline-block', border: '2px solid #FF4D00',
            backdropFilter: 'blur(8px)',
          }}>
            На главную
          </Link>
        </div>
      </div>
    </main>
  )
}
