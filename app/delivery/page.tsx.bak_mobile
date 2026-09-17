'use client'
import Link from 'next/link'
import { useState } from 'react'
import FloatingShapes from '@/components/home/FloatingShapes'

export default function DeliveryPage() {
  const [address, setAddress] = useState('')
  const [checked, setChecked] = useState<null | boolean>(null)
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const accent = '#4A90D9'
  const dark = '#433932'
  const muted = '#3D2E28'
  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'
  const card = { background: 'rgba(255,255,255,0.65)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', marginBottom: '32px' }
  const btn = { background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '50px', border: 'none', cursor: 'pointer', textDecoration: 'none' }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      
      <img src="/photo_yeda/brushes/brush-blue.png" alt="" style={{ position: 'absolute', top: '0px', left: '-80px', width: '1200px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(25deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-blue.png" alt="" style={{ position: 'absolute', top: '800px', right: '-450px', width: '1300px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(100deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/brush-blue.png" alt="" style={{ position: 'absolute', top: '1600px', left: '-350px', width: '1250px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-blue.png" alt="" style={{ position: 'absolute', top: '200px', right: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(30deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-blue.png" alt="" style={{ position: 'absolute', top: '1000px', left: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-120deg)', filter: 'blur(1.5px)' }} />
      <img src="/photo_yeda/brushes/drop-blue.png" alt="" style={{ position: 'absolute', top: '1900px', right: '-20px', width: '800px', opacity: 0.45, pointerEvents: 'none', zIndex: 0, transform: 'rotate(20deg)', filter: 'blur(1.5px)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '16px' }}>
            Горячая еда — прямо к вашей двери
          </h1>
          <p style={{ fontFamily: font2, fontSize: '18px', color: muted, lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
            Готовим после заказа и стараемся доставить его в течение 30–60 минут.
          </p>
          <a href="#zone" style={{ ...btn, display: 'inline-block' }}>Проверить адрес</a>
        </div>

        {/* Зона доставки */}
        <div id="zone" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Доставляем туда, где вы находитесь</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '24px' }}>Введите адрес — система автоматически проверит, входит ли он в зону доставки.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Введите улицу, дом и квартиру"
              style={{ flex: 1, minWidth: '240px', padding: '14px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff' }}
            />
            <button onClick={() => setChecked(Math.random() > 0.5)} style={btn}>Проверить доставку</button>
          </div>
          {checked === true && (
            <p style={{ fontFamily: font2, fontSize: '15px', color: '#2E7D32', background: 'rgba(46,125,50,0.08)', borderRadius: '16px', padding: '12px 20px' }}>
              Да! Мы доставляем по этому адресу 🎉
            </p>
          )}
          {checked === false && (
            <div>
              <p style={{ fontFamily: font2, fontSize: '15px', color: muted, marginBottom: '12px' }}>
                Пока не доставляем сюда, но обязательно хотим расширить зону. Оставьте контакты — сообщим, когда YEDA появится рядом.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваш email или телефон" style={{ flex: 1, minWidth: '200px', padding: '12px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff' }} />
                <button onClick={() => setNotified(true)} style={{ ...btn, fontSize: '14px', padding: '12px 24px' }}>Сообщить мне</button>
              </div>
              {notified && <p style={{ fontFamily: font2, fontSize: '14px', color: accent, marginTop: '8px' }}>Отлично! Сообщим, как только появимся рядом.</p>}
            </div>
          )}
        </div>

        {/* Стоимость */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Сколько стоит доставка?</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '16px' }}>Базовая стоимость уточняется при оформлении. Точная цена показывается до оплаты — никаких сюрпризов после оформления.</p>
          <div style={{ background: `rgba(74,144,217,0.08)`, borderRadius: '20px', padding: '20px 24px' }}>
            <p style={{ fontFamily: font1, fontSize: '16px', fontWeight: 700, color: accent, margin: 0 }}>До бесплатной доставки осталось 350 ₽. Добавим что-нибудь вкусное?</p>
          </div>
        </div>

        {/* Бесплатная доставка */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Доставка за наш счёт</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '24px' }}>При заказе от [указать сумму] ₽ доставка бесплатная.</p>
          <Link href="/menu" style={{ ...btn, display: 'inline-block' }}>Добавить блюдо</Link>
        </div>

        {/* Время */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Обычно — через 30–60 минут</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '24px' }}>Время зависит от адреса, загрузки кухни, дорожной ситуации и количества заказов. После оформления показываем актуальное ориентировочное время доставки.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Заказ принят', 'Готовим', 'Упаковываем', 'Курьер уже едет', 'Заказ у двери'].map((status, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '14px' }}>{i + 1}</div>
                <span style={{ fontFamily: font2, fontSize: '16px', color: dark }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Опоздание */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Что делать, если курьер опаздывает?</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', fontWeight: 600, color: muted, marginBottom: '16px' }}>Мы понимаем: когда ждёшь еду, каждая минута кажется длиннее.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              'Проверьте статус в личном кабинете',
              'Если задержка существенная — напишите нам',
              'Поддержка поможет разобраться с ситуацией',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: accent, fontWeight: 700, fontFamily: font1, minWidth: '20px' }}>{i + 1}.</span>
                <span style={{ fontFamily: font2, fontSize: '17px', color: muted }}>{t}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, fontStyle: 'italic', marginBottom: '24px' }}>Если заказ действительно опоздал по нашей вине, мы предложим подходящий вариант компенсации согласно правилам сервиса.</p>
          <Link href="/contacts" style={{ ...btn, display: 'inline-block', fontSize: '15px', padding: '12px 28px' }}>Связаться с поддержкой</Link>
        </div>

        {/* Получение */}
        <div style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '12px' }}>Просто заберите и наслаждайтесь</h2>
          <p style={{ fontFamily: font2, fontSize: '16px', color: muted, marginBottom: '12px' }}>Курьер может передать заказ лично или оставить его у двери — если такой вариант доступен для вашего адреса.</p>
          <p style={{ fontFamily: font2, fontSize: '14px', color: accent, fontStyle: 'italic' }}>Пожалуйста, убедитесь, что номер телефона в заказе актуален.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: '16px' }}>
          <h2 style={{ fontFamily: font1, fontSize: '28px', fontWeight: 900, color: dark, marginBottom: '24px' }}>А куда сегодня доставить вкусное?</h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input placeholder="Введите адрес доставки" style={{ minWidth: '280px', padding: '14px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff' }} />
            <Link href="/menu" style={{ ...btn, display: 'inline-block' }}>Заказать</Link>
          </div>
        </div>

      </div>
    </main>
  )
}
