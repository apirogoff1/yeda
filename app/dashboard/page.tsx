'use client'
import { useRouter } from 'next/navigation'
import FloatingShapes from '@/components/home/FloatingShapes'
import { useAuthStore } from '@/store'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuthStore()
  const [addresses, setAddresses] = useState<any[]>([])
  const [newAddress, setNewAddress] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'orders'|'addresses'|'favorites'|'profile'>('orders')

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    fetchAll()
  }, [isAuthenticated])

  const fetchAll = async () => {
    const [ordRes, adrRes, favRes, profRes] = await Promise.all([
      fetch('/api/orders').then(r => r.json()).catch(() => ({})),
      fetch('/api/addresses').then(r => r.json()).catch(() => ({})),
      fetch('/api/favorites').then(r => r.json()).catch(() => ({})),
      fetch('/api/profile').then(r => r.json()).catch(() => ({})),
    ])
    setOrders(ordRes.orders || [])
    setAddresses(adrRes.addresses || [])
    setFavorites(favRes.favorites || [])
    setProfile(profRes.user || null)
    setEditName(profRes.user?.name || '')
    setEditPhone(profRes.user?.phone || '')
  }

  const handleAddAddress = async () => {
    if (!newAddress.trim()) return
    await fetch('/api/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: newAddress.trim() }),
    })
    setNewAddress('')
    fetchAll()
  }

  const handleRemoveAddress = async (id: string) => {
    await fetch('/api/addresses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchAll()
  }

  const handleRemoveFavorite = async (id: string) => {
    await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchAll()
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, phone: editPhone }),
    })
    setSaving(false)
    setEditMode(false)
    fetchAll()
  }

  const handleLogout = () => { logout(); router.push('/') }

  const font1 = 'var(--font-comfortaa)'
  const font2 = 'var(--font-geologica)'
  const accent = '#1A6FD4'
  const dark = '#433932'
  const card = {
    background: 'rgba(255,255,255,0.65)',
    borderRadius: '32px',
    padding: '40px',
    backdropFilter: 'blur(8px)',
    marginBottom: '32px',
  }
  const tabBtn = (tab: string) => ({
    fontFamily: font1,
    fontWeight: 700,
    fontSize: '15px',
    padding: '10px 24px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    background: activeTab === tab ? accent : 'rgba(255,255,255,0.5)',
    color: activeTab === tab ? '#fff' : dark,
    transition: 'all 0.2s',
  })

  const initials = user?.name
    ? user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const pageDekor_brushes = [
    { src: '/photo_yeda/brushes/brush-carrot.png', top: 1328, left: -237, w: 900, rotate: 170 },
    { src: '/photo_yeda/brushes/brush-ezhevika.png', top: 420, left: -135, w: 900, rotate: -20 },
    { src: '/photo_yeda/brushes/brush-lemon.png', top: -190, left: 806, w: 900, rotate: 15 },
    { src: '/photo_yeda/brushes/brush-raspberry.png', top: -168, left: -184, w: 900, rotate: -35 },
    { src: '/photo_yeda/brushes/brush-skyblue.png', top: 1192, left: 506, w: 900, rotate: 120 },
    { src: '/photo_yeda/brushes/brush-strawberry.png', top: 1584, left: 584, w: 900, rotate: 25 },
    { src: '/photo_yeda/brushes/brush-zucchini.png', top: 541, left: 869, w: 900, rotate: 120 },
  ]

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      {pageDekor_brushes.map((b, i) => (
        <img key={i} src={b.src} alt="" style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, opacity: 0.4, pointerEvents: 'none', zIndex: 0, transform: `rotate(${b.rotate}deg)`, filter: 'blur(1.5px)' }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: font1, fontSize: '52px', fontWeight: 900, color: accent, marginBottom: '8px' }}>Личный кабинет</h1>
          <p style={{ fontFamily: font2, fontSize: '18px', color: dark }}>Управляйте своим аккаунтом и заказами</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <div style={{ ...card, textAlign: 'center' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, #ff8c42)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 32px rgba(255,77,0,0.3)', fontSize: '36px', fontWeight: 900, color: '#fff', fontFamily: font1 }}>
                {initials}
              </div>
              <p style={{ fontFamily: font1, fontSize: '22px', fontWeight: 800, color: dark, marginBottom: '6px' }}>{user?.name || 'Гость'}</p>
              <p style={{ fontFamily: font2, fontSize: '14px', color: '#888', marginBottom: '4px' }}>{user?.email || ''}</p>
              <p style={{ fontFamily: font2, fontSize: '14px', color: '#888', marginBottom: '8px' }}>{profile?.phone || ''}</p>
              <span style={{ display: 'inline-block', background: 'rgba(26,111,212,0.1)', color: accent, fontFamily: font2, fontSize: '12px', padding: '4px 14px', borderRadius: '50px', marginBottom: '28px' }}>{user?.role || 'user'}</span>
              <button onClick={handleLogout} style={{ width: '100%', padding: '14px', borderRadius: '50px', border: `2px solid ${accent}`, background: 'transparent', color: accent, fontFamily: font1, fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = accent; (e.target as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = accent }}
              >Выйти</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button style={tabBtn('orders')} onClick={() => setActiveTab('orders')}>Заказы</button>
              <button style={tabBtn('addresses')} onClick={() => setActiveTab('addresses')}>Адреса</button>
              <button style={tabBtn('favorites')} onClick={() => setActiveTab('favorites')}>Избранное</button>
              <button style={tabBtn('profile')} onClick={() => setActiveTab('profile')}>Профиль</button>
            </div>
          </div>
          <div>
            {activeTab === 'orders' && (
              <div style={card}>
                <h2 style={{ fontFamily: font1, fontSize: '24px', fontWeight: 900, color: dark, marginBottom: '20px' }}>История заказов</h2>
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,77,0,0.04)', borderRadius: '20px' }}>
                    <p style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '8px' }}>Заказов пока нет</p>
                    <p style={{ fontFamily: font2, fontSize: '14px', color: '#888' }}>Сделайте свой первый заказ в разделе Меню</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map((order: any) => (
                      <div key={order.id} style={{ background: 'rgba(255,77,0,0.04)', borderRadius: '20px', padding: '20px 24px', border: '1.5px solid rgba(255,77,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div>
                            <p style={{ fontFamily: font1, fontWeight: 800, fontSize: '16px', color: dark, marginBottom: '2px' }}>Заказ #{order.id.toString().slice(-6)}</p>
                            <p style={{ fontFamily: font2, fontSize: '13px', color: '#888' }}>{new Date(order.createdAt).toLocaleDateString('ru-RU')} {new Date(order.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontFamily: font1, fontWeight: 900, fontSize: '18px', color: accent }}>{order.total}₽</span>
                            <span style={{ background: '#e8f5e9', color: '#2e7d32', fontFamily: font2, fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>{order.status}</span>
                          </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,77,0,0.08)', paddingTop: '12px' }}>
                          {order.items.map((item: any, i: number) => (
                            <p key={i} style={{ fontFamily: font2, fontSize: '13px', color: dark, marginBottom: '4px' }}>{item.name} x{item.quantity} — {item.price * item.quantity}₽</p>
                          ))}
                        </div>
                        <p style={{ fontFamily: font2, fontSize: '12px', color: '#aaa', marginTop: '8px' }}>Доставка: {order.address}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'addresses' && (
              <div style={card}>
                <h2 style={{ fontFamily: font1, fontSize: '24px', fontWeight: 900, color: dark, marginBottom: '20px' }}>Адреса доставки</h2>
                {addresses.map((addr) => (
                  <div key={addr.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ flex: 1, padding: '12px 20px', borderRadius: '50px', background: 'rgba(255,77,0,0.06)', fontFamily: font2, fontSize: '15px', color: dark }}>{addr.value}</div>
                    <button onClick={() => handleRemoveAddress(addr.id)} style={{ background: 'none', border: '2px solid #FF4D00', color: '#FF4D00', borderRadius: '50px', padding: '8px 16px', cursor: 'pointer', fontFamily: font1, fontWeight: 700, fontSize: '13px' }}>Удалить</button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder='Новый адрес' style={{ flex: 1, padding: '14px 20px', borderRadius: '50px', border: '2px solid rgba(255,77,0,0.3)', fontFamily: font2, fontSize: '15px', outline: 'none', background: '#fff', boxSizing: 'border-box' as const }} onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = 'rgba(255,77,0,0.3)'} />
                  <button onClick={handleAddAddress} style={{ background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '15px', padding: '12px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>+ Добавить</button>
                </div>
              </div>
            )}
            {activeTab === 'favorites' && (
              <div style={card}>
                <h2 style={{ fontFamily: font1, fontSize: '24px', fontWeight: 900, color: dark, marginBottom: '20px' }}>Избранное</h2>
                {favorites.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,77,0,0.04)', borderRadius: '20px' }}>
                    <p style={{ fontFamily: font1, fontSize: '18px', fontWeight: 700, color: dark, marginBottom: '8px' }}>Избранных блюд пока нет</p>
                    <p style={{ fontFamily: font2, fontSize: '14px', color: '#888' }}>Добавляйте блюда через сердечки в Меню</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {favorites.map((fav: any) => (
                      <div key={fav.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderRadius: '20px', background: 'rgba(255,77,0,0.04)', border: '1.5px solid rgba(255,77,0,0.1)' }}>
                        <div>
                          <p style={{ fontFamily: font1, fontWeight: 700, fontSize: '16px', color: dark }}>{fav.dishName}</p>
                          <p style={{ fontFamily: font2, fontSize: '14px', color: accent }}>{fav.price}₽</p>
                        </div>
                        <button onClick={() => handleRemoveFavorite(fav.id)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer' }}>❤️</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'profile' && (
              <div style={card}>
                <h2 style={{ fontFamily: font1, fontSize: '24px', fontWeight: 900, color: dark, marginBottom: '20px' }}>Профиль</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <p style={{ fontFamily: font2, fontSize: '13px', color: '#888', marginBottom: '6px' }}>Имя</p>
                    {editMode ? (
                      <input value={editName} onChange={e => setEditName(e.target.value)} style={{ width: '100%', padding: '12px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }} />
                    ) : (
                      <p style={{ fontFamily: font1, fontWeight: 700, fontSize: '18px', color: dark }}>{profile?.name || user?.name}</p>
                    )}
                  </div>
                  <div>
                    <p style={{ fontFamily: font2, fontSize: '13px', color: '#888', marginBottom: '6px' }}>Email</p>
                    <p style={{ fontFamily: font1, fontWeight: 700, fontSize: '18px', color: dark }}>{profile?.email || user?.email}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: font2, fontSize: '13px', color: '#888', marginBottom: '6px' }}>Телефон</p>
                    {editMode ? (
                      <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder='+7 (999) 000-00-00' style={{ width: '100%', padding: '12px 20px', borderRadius: '50px', border: `2px solid ${accent}`, fontFamily: font2, fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }} />
                    ) : (
                      <p style={{ fontFamily: font1, fontWeight: 700, fontSize: '18px', color: dark }}>{profile?.phone || 'Не указан'}</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    {editMode ? (
                      <>
                        <button onClick={handleSaveProfile} disabled={saving} style={{ padding: '12px 32px', borderRadius: '50px', border: 'none', background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>{saving ? 'Сохраняю...' : 'Сохранить'}</button>
                        <button onClick={() => setEditMode(false)} style={{ padding: '12px 32px', borderRadius: '50px', border: `2px solid ${accent}`, background: 'transparent', color: accent, fontFamily: font1, fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Отмена</button>
                      </>
                    ) : (
                      <button onClick={() => setEditMode(true)} style={{ padding: '12px 32px', borderRadius: '50px', border: 'none', background: accent, color: '#fff', fontFamily: font1, fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Редактировать</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}