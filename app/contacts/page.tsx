'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import FloatingShapes from '@/components/home/FloatingShapes'

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', contact: '', order: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)

  const accent = '#FF4D8D'
  const dark = '#433932'
  const muted = '#3D2E28'
  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'
  const card = { background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', marginBottom: '32px' }
  const btn = { background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }
  const inputStyle = { width: '100%', padding: '14px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff', boxSizing: 'border-box' as const, marginBottom: '12px' }
  const textareaStyle = { width: '100%', padding: '14px 20px', borderRadius: '24px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff', boxSizing: 'border-box' as const, marginBottom: '12px', minHeight: '120px', resize: 'none' as const }

  const handleSubmit = async () => {
    if (!form.name || !form.contact || !form.message) return
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
  }

  const contacts = [
    { label: 'Telegram', color: '#29B6F6', href: 'https://t.me/yeda', img: '/photo_yeda/telegram.png' },
    { label: 'MAX', color: '#FF4D00', href: '#', img: '/photo_yeda/MAX_Messenger.png' },
    { label: 'Телефон', href: 'tel:+74951234567', img: '/photo_yeda/phone.png' },
    { label: 'Email', href: 'mailto:apirogoff1@gmail.com', img: '/photo_yeda/email.png' },
  ]

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />

      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '0px', left: '-80px', width: '1200px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(25deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '800px', right: '-450px', width: '1300px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(100deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '1600px', left: '-350px', width: '1250px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '200px', right: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '1000px', left: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-120deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-raspberry.png" alt="" style={{ position: 'absolute', top: '1900px', right: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(20deg)', filter: 'blur(1.5px)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '16px' }}>
            Мы на связи
          </h1>
          <p style={{ fontFamily: font2, fontSize: '18px', color: muted, lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Есть вопрос по заказу, доставке или подписке? Напишите нам — разберёмся.
          </p>
        </div>

        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '24px' }}>Поддержка</h2>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: font1, fontSize: '17px', fontWeight: 700, color: dark, marginBottom: '6px' }}>Онлайн-чат</p>
            <p style={{ fontFamily: font2, fontSize: '15px', color: muted, marginBottom: '16px' }}>Самый быстрый способ получить ответ по текущему заказу.</p>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            {contacts.map((c, i) => (
              <a key={i} href={c.href} title={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                <img src={c.img} alt={c.label} style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
                <span style={{ fontFamily: font2, fontSize: '12px', color: muted }}>{c.label}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: '32px', background: 'rgba(255,77,141,0.06)', borderRadius: '20px', padding: '20px 24px' }}>
            <p style={{ fontFamily: font1, fontSize: '17px', fontWeight: 700, color: dark, marginBottom: '4px' }}>+7 (495) 123-45-67</p>
            <p style={{ fontFamily: font2, fontSize: '14px', color: muted, marginBottom: '0' }}>Ежедневно, 08:00–23:00</p>
          </div>

          <div style={{ marginTop: '16px', background: 'rgba(255,77,141,0.06)', borderRadius: '20px', padding: '20px 24px' }}>
            <p style={{ fontFamily: font1, fontSize: '17px', fontWeight: 700, color: dark, marginBottom: '4px' }}>apirogoff1@gmail.com</p>
            <p style={{ fontFamily: font2, fontSize: '14px', color: '#888' }}>По вопросам сотрудничества: partners@yeda.ru</p>
          </div>
        </div>

        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Где нас найти</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: dark, fontWeight: 600, marginBottom: '4px' }}>г. Москва, Хлебный переулок, д. 3</p>
          <p style={{ fontFamily: font2, fontSize: '14px', color: accent, fontStyle: 'italic', marginBottom: '24px' }}>Для получения заказа приезжать по этому адресу не нужно — мы сами привезём его к вам.</p>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.588144%2C55.754093&z=16&pt=37.588144%2C55.754093"
              width="100%"
              height="300"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen
            />
          </div>
        </div>

        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '24px' }}>Остались вопросы?</h2>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ fontFamily: font1, fontSize: '22px', fontWeight: 700, color: accent }}>Сообщение отправлено! Мы скоро вернёмся с ответом 💚</p>
            </div>
          ) : (
            <div>
              <input style={inputStyle} placeholder="Ваше имя" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input style={inputStyle} placeholder="Email или телефон" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
              <input style={inputStyle} placeholder="Номер заказа (если вопрос связан с заказом)" value={form.order} onChange={e => setForm({...form, order: e.target.value})} />
              <input style={inputStyle} placeholder="Тема обращения" value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} />
              <textarea style={textareaStyle} placeholder="Расскажите, что случилось" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <p style={{ fontFamily: font2, fontSize: '13px', color: muted, marginBottom: '16px' }}>Нажимая «Отправить сообщение», вы соглашаетесь с обработкой персональных данных.</p>
              <button onClick={handleSubmit} style={btn}>Отправить сообщение</button>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
