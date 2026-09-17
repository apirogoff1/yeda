'use client'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import FloatingShapes from '@/components/home/FloatingShapes'

const planPrices: Record<string, { label: string; price: number }> = {
  'YEDA Start': { label: 'YEDA Start', price: 2490 },
  'YEDA Balance': { label: 'YEDA Balance', price: 4990 },
  'YEDA Pro': { label: 'YEDA Pro', price: 7990 },
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const planName = searchParams.get('plan')
  const planData = planName ? planPrices[planName] : null
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [savedAddresses, setSavedAddresses] = useState<string[]>([])
  useEffect(() => {
    fetch('/api/addresses')
      .then(r => r.json())
      .then(data => {
        const addrs = (data.addresses || []).map((a: any) => a.value)
        setSavedAddresses(addrs)
        if (addrs.length > 0) setAddress(addrs[0])
      })
      .catch(() => {})
  }, [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'
  const accent = '#FF4D00'
  const dark = '#433932'
  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.75)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(8px)', marginBottom: '32px' }

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      setError('Заполните все поля')
      return
    }
    if (!planData && items.length === 0) {
      setError('Корзина пуста')
      return
    }
    setLoading(true)
    setError('')
    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU'),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      name, phone, address,
      items: items.map((i: any) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total,
      status: 'Принят',
    }
    if (planData) {
      const sub = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        name, phone, address,
        plan: planData.label,
        price: planData.price,
        status: 'Активна',
      }
      const existingSubs = JSON.parse(localStorage.getItem('yeda_subscriptions') || '[]')
      existingSubs.unshift(sub)
      localStorage.setItem('yeda_subscriptions', JSON.stringify(existingSubs))
    } else {
      const existing = JSON.parse(localStorage.getItem('yeda_orders') || '[]')
      existing.unshift(order)
      localStorage.setItem('yeda_orders', JSON.stringify(existing))
    }
    try {
      await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, name, phone, address }),
      })
    } catch (e) {
      console.log('API unavailable, continuing anyway')
    } finally {
      await clearCart()
      window.location.href = window.location.origin + '/payment-success'
    }
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <img src="/photo_yeda/brushes/brush-lemon.png" alt="" style={{ position: 'absolute', top: '-100px', left: '-200px', width: '1000px', opacity: 0.4, pointerEvents: 'none', zIndex: 0, transform: 'rotate(20deg)', filter: 'blur(1.5px)', maxWidth: 'none' }} />
      <img src="/photo_yeda/brushes/brush-skyblue.png" alt="" style={{ position: 'absolute', top: '400px', right: '-300px', width: '1000px', opacity: 0.4, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-30deg)', filter: 'blur(1.5px)', maxWidth: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 className="pay-h1" style={{ fontFamily: font1, fontSize: '48px', fontWeight: 900, color: accent, lineHeight: 1.2, marginBottom: '12px' }}>Оформление заказа</h1>
          <p style={{ fontFamily: font2, fontSize: '16px', color: dark }}>Заполните данные для доставки</p>
        </div>

        <div className="pay-card" style={card}>
          <h2 style={{ fontFamily: font1, fontSize: '22px', fontWeight: 800, color: dark, marginBottom: '24px' }}>Ваши данные</h2>
          <div className="pay-input-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" style={{ fontFamily: font2, fontSize: '16px', padding: '14px 20px', borderRadius: '16px', border: '2px solid rgba(255,77,0,0.2)', outline: 'none', background: 'rgba(255,255,255,0.8)', color: dark, width: '100%', boxSizing: 'border-box' }} />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" style={{ fontFamily: font2, fontSize: '16px', padding: '14px 20px', borderRadius: '16px', border: '2px solid rgba(255,77,0,0.2)', outline: 'none', background: 'rgba(255,255,255,0.8)', color: dark, width: '100%', boxSizing: 'border-box' }} />
            {savedAddresses.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                {savedAddresses.map((addr, i) => (
                  <div key={i} onClick={() => setAddress(addr)} style={{ padding: '12px 20px', borderRadius: '16px', border: `2px solid ${address === addr ? accent : 'rgba(255,77,0,0.2)'}`, background: address === addr ? 'rgba(255,77,0,0.06)' : 'rgba(255,255,255,0.8)', cursor: 'pointer', fontFamily: font2, fontSize: '15px', color: dark, transition: 'all 0.2s' }}>
                    {addr}
                  </div>
                ))}
              </div>
            )}
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Или введите новый адрес" style={{ fontFamily: font2, fontSize: '16px', padding: '14px 20px', borderRadius: '16px', border: '2px solid rgba(255,77,0,0.2)', outline: 'none', background: 'rgba(255,255,255,0.8)', color: dark, width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div className="pay-card" style={{ ...card, marginBottom: '24px' }}>
          <h2 style={{ fontFamily: font1, fontSize: '22px', fontWeight: 800, color: dark, marginBottom: '16px' }}>{planData ? 'Подписка' : 'Ваш заказ'}</h2>
          {planData ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(123,63,160,0.06)', borderRadius: '16px', marginBottom: '16px' }}>
                <span style={{ fontFamily: font2, fontSize: '16px', color: dark, fontWeight: 600 }}>{planData.label}</span>
                <span style={{ fontFamily: font1, fontWeight: 900, fontSize: '18px', color: accent }}>{planData.price.toLocaleString('ru-RU')} ₽/мес.</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontFamily: font1, fontWeight: 800, fontSize: '20px', color: dark }}>Итого</span>
                <span style={{ fontFamily: font1, fontWeight: 900, fontSize: '24px', color: accent }}>{planData.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          ) : items.length === 0 ? (
            <p style={{ fontFamily: font2, color: '#888' }}>Корзина пуста</p>
          ) : (
            <>
              {items.map((item: any) => (
                <div key={item.id} className="pay-order-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid rgba(255,77,0,0.1)' }}>
                  <span style={{ fontFamily: font2, fontSize: '15px', color: dark }}>{item.name} x{item.quantity}</span>
                  <span style={{ fontFamily: font1, fontWeight: 700, fontSize: '15px', color: accent }}>{item.price * item.quantity}₽</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontFamily: font1, fontWeight: 800, fontSize: '20px', color: dark }}>Итого</span>
                <span style={{ fontFamily: font1, fontWeight: 900, fontSize: '24px', color: accent }}>{total}₽</span>
              </div>
            </>
          )}
        </div>

        {error && <p style={{ fontFamily: font2, color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}

        <button className="pay-submit-btn" onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: loading ? '#ccc' : 'linear-gradient(135deg, #FF7A1A, #FF4E1A)', color: '#fff', fontFamily: font1, fontWeight: 900, fontSize: '18px', padding: '18px 36px', borderRadius: '50px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 8px 32px rgba(255,90,31,0.4)', transition: 'all 0.3s' }}>
          {loading ? 'Подготовка...' : 'Перейти к оплате →'}
        </button>
      </div>
    </main>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div style={{ padding: '120px 24px', textAlign: 'center', fontFamily: 'var(--font-comfortaa)', fontSize: '18px', color: '#FF4D00' }}>Загрузка...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
