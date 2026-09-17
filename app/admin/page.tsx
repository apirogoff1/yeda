'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store'

type OrderItem = { id: string; name: string; price: number; quantity: number }
type Order = { id: string; name: string; phone: string; address: string; total: number; status: string; createdAt: string; items: OrderItem[] }
type Subscription = { id: string; email: string; plan: string; createdAt: string }
type User = { id: string; name: string; email: string; role: string; createdAt: string }
type Stats = { totalOrders: number; totalRevenue: number; newOrders: number; totalSubscriptions: number; totalUsers: number }
type PlanSubscription = { id: number; date: string; name: string; phone: string; address: string; plan: string; price: number; status: string }

function AdminPageInner() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'stats' | 'orders' | 'subscriptions' | 'plans' | 'users'>((searchParams.get('tab') as any) || 'stats')
  const [planSubs, setPlanSubs] = useState<PlanSubscription[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const [amountFrom, setAmountFrom] = useState<string>('')
  const [amountTo, setAmountTo] = useState<string>('')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date')
  const [newsletterSubject, setNewsletterSubject] = useState<string>('')
  const [newsletterBody, setNewsletterBody] = useState<string>('')
  const [newsletterStatus, setNewsletterStatus] = useState<string>('')
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false)
  const router = useRouter()
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    if (!user || (user.role as string) !== 'ADMIN') {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    let es: EventSource
    const connect = () => {
      es = new EventSource('/api/admin/stream')
      es.onmessage = (e) => {
        const data = JSON.parse(e.data)
        setStats(data.stats)
        setOrders(data.orders)
        setSubscriptions(data.subscriptions)
        setUsers(data.users)
        setLoading(false)
        const stored = JSON.parse(localStorage.getItem('yeda_subscriptions') || '[]')
        setPlanSubs(stored)
      }
      es.onerror = () => {
        es.close()
        setTimeout(connect, 3000)
      }
    }
    connect()
    return () => es?.close()
  }, [])

  const sendNewsletter = async () => {
    if (!newsletterSubject.trim() || !newsletterBody.trim()) {
      setNewsletterStatus('error_empty')
      return
    }
    setNewsletterLoading(true)
    setNewsletterStatus('')
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: newsletterSubject, html: newsletterBody })
      })
      if (res.ok) {
        setNewsletterStatus('ok')
        setNewsletterSubject('')
        setNewsletterBody('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
    setNewsletterLoading(false)
  }

  const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n)

  const statusLabel: Record<string, string> = {
    new: '\u041d\u043e\u0432\u044b\u0439',
    cooking: '\u0413\u043e\u0442\u043e\u0432\u0438\u0442\u0441\u044f',
    delivery: '\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f',
    done: '\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d',
  }

  const statusColor: Record<string, { bg: string; color: string }> = {
    new: { bg: '#FFF0EB', color: '#FF4D00' },
    cooking: { bg: '#FFF8E1', color: '#F59E0B' },
    delivery: { bg: '#E8F4FF', color: '#4A90D9' },
    done: { bg: '#EFFFEF', color: '#2ecc71' },
  }

  const nextStatus: Record<string, string> = {
    new: 'cooking',
    cooking: 'delivery',
    delivery: 'done',
    done: 'new',
  }

  const changeStatus = async (orderId: string, status: string) => {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status }),
    })
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
  }

  const fmtDate = (s: string) => new Date(s).toLocaleDateString('ru-RU')

  const tabColors: Record<string, string> = {
    stats: '#FF4D00',
    orders: '#4A90D9',
    subscriptions: '#5DBB63',
    plans: '#7B3FA0',
    users: '#E8789A',
  }

  const tabStyle = (t: string): React.CSSProperties => {
    const color = tabColors[t]
    const active = tab === t
    return {
      padding: '8px 18px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-geologica)',
      fontSize: '14px',
      fontWeight: active ? 700 : 600,
      background: active ? color : color + '44',
      color: active ? '#fff' : '#433932',
      boxShadow: active ? '0 4px 16px ' + color + '55' : '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap' as const,
      boxSizing: 'border-box' as const,
      width: 'auto' as const,
      alignSelf: 'flex-start' as const,
    }
  }

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.65)',
    borderRadius: '32px',
    padding: '40px',
    backdropFilter: 'blur(8px)',
    marginBottom: '32px',
  }

  const statCard = (label: string, value: string | number, sub?: string) => (
    <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 6px 32px rgba(0,0,0,0.13)', flex: '1 1 140px', boxSizing: 'border-box' as const, minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#999', marginBottom: '8px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '32px', fontWeight: 900, color: '#FF4D00', wordBreak: 'break-word' as const }}>{value}</div>
      {sub && <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#999', marginTop: '4px' }}>{sub}</div>}
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', background: '#F4F4F4', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', overflow: 'hidden', zIndex: 1, boxSizing: 'border-box' as const }}>

        <h1 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '48px', fontWeight: 900, color: '#FF4D00', marginBottom: '24px' }}>Admin</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' as const }}>
          <button style={tabStyle('stats')} onClick={() => setTab('stats')}>{'Статистика'}</button>
          <button style={tabStyle('orders')} onClick={() => setTab('orders')}>{'Заказы'}</button>
          <button style={tabStyle('subscriptions')} onClick={() => setTab('subscriptions')}>{'Рассылки'}</button>
          <button style={tabStyle('plans')} onClick={() => setTab('plans')}>{'Подписки'}</button>
          <button style={tabStyle('users')} onClick={() => setTab('users')}>{'Пользователи'}</button>
        </div>

        {loading && <p style={{ fontFamily: 'var(--font-geologica)', color: '#999' }}>Loading...</p>}

        {/* Stats */}
        {!loading && tab === 'stats' && stats && (
          <div className="sub-card" style={card}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, marginBottom: '32px' }}>
              {statCard('Всего заказов', stats.totalOrders)}
              {statCard('Новые заказы', stats.newOrders)}
              {statCard('Выручка', fmt(stats.totalRevenue) + ' руб.')}
              {statCard('Рассылки', stats.totalSubscriptions)}
              {statCard('Пользователи', stats.totalUsers)}
            </div>
            <h2 style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', fontWeight: 700, color: '#433932', marginBottom: '16px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{'Статусы заказов'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {[
                { key: 'new', label: 'Новый', bg: '#FFF0EB', color: '#FF4D00', border: '#FFD4C2' },
                { key: 'cooking', label: 'Готовится', bg: '#FFF8E1', color: '#F59E0B', border: '#FFE9A0' },
                { key: 'delivery', label: 'Доставляется', bg: '#E8F4FF', color: '#4A90D9', border: '#B8D8F8' },
                { key: 'done', label: 'Выполнен', bg: '#EFFFEF', color: '#2ecc71', border: '#A8F0B8' },
              ].map(s => (
                <div key={s.key} style={{ background: s.bg, border: '2px solid ' + s.border, borderRadius: '12px', padding: '8px 14px', boxSizing: 'border-box' as const, minWidth: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: s.color, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '10px' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '36px', fontWeight: 900, color: s.color, lineHeight: 1 }}>
                    {orders.filter(o => o.status === s.key).length}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#999', marginTop: '6px' }}>{'заказов'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {!loading && tab === 'orders' && (
          <div className="sub-card" style={card}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
              <input
                type="text"
                placeholder="Поиск по имени, телефону, адресу"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: '1 1 200px', minWidth: 0, padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const }}
              />
              {sortBy === 'date' ? (
                <>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                    style={{ flex: '1 1 140px', minWidth: 0, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: dateFrom ? '#433932' : '#bbb', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                    style={{ flex: '1 1 140px', minWidth: 0, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: dateTo ? '#433932' : '#bbb', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="От"
                    value={amountFrom}
                    onChange={e => setAmountFrom(e.target.value)}
                    style={{ flex: '1 1 140px', minWidth: 0, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={amountTo}
                    onChange={e => setAmountTo(e.target.value)}
                    style={{ flex: '1 1 140px', minWidth: 0, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </>
              )}
              <button onClick={() => { setSortBy('date'); setSortDir(d => d === 'desc' ? 'asc' : 'desc') }} style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: sortBy === 'date' ? '#fff' : '#433932', background: sortBy === 'date' ? '#FF4D00' : '#fff', boxShadow: sortBy === 'date' ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s', whiteSpace: 'nowrap' as const, boxSizing: 'border-box' as const }}>
                {sortBy === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : ''} {'Дата'}
              </button>
              <button onClick={() => { setSortBy('total'); setSortDir(d => d === 'desc' ? 'asc' : 'desc') }} style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: sortBy === 'total' ? '#fff' : '#433932', background: sortBy === 'total' ? '#FF4D00' : '#fff', boxShadow: sortBy === 'total' ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s', whiteSpace: 'nowrap' as const, boxSizing: 'border-box' as const }}>
                {sortBy === 'total' ? (sortDir === 'desc' ? '↓' : '↑') : ''} {'Сумма'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' as const, overflowX: 'auto' as const, marginBottom: '24px', paddingBottom: '4px' }}>
              {['all', 'new', 'cooking', 'delivery', 'done'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '8px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: statusFilter === s ? 700 : 600, background: statusFilter === s ? '#FF4D00' : '#fff', color: statusFilter === s ? '#fff' : '#433932', boxShadow: statusFilter === s ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s', boxSizing: 'border-box' as const }}>
                  {s === 'all' ? 'Все' : s === 'new' ? 'Новый' : s === 'cooking' ? 'Готовится' : s === 'delivery' ? 'Доставляется' : 'Выполнен'}
                </button>
              ))}
            </div>
            {(() => {
              const filtered = orders
                .filter(o => (statusFilter === 'all' || o.status === statusFilter))
                .filter(o => search === '' || o.name.toLowerCase().includes(search.toLowerCase()) || o.phone.includes(search) || o.address.toLowerCase().includes(search.toLowerCase()))
                .filter(o => {
                  if (sortBy === 'date') {
                    const d = new Date(o.createdAt)
                    if (dateFrom && d < new Date(dateFrom)) return false
                    if (dateTo && d > new Date(dateTo + 'T23:59:59')) return false
                  }
                  if (sortBy === 'total') {
                    if (amountFrom !== '' && o.total < Number(amountFrom)) return false
                    if (amountTo !== '' && o.total > Number(amountTo)) return false
                  }
                  return true
                })
                .sort((a, b) => {
                  if (sortBy === 'total') return sortDir === 'desc' ? b.total - a.total : a.total - b.total
                  return sortDir === 'desc' ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                })
              if (filtered.length === 0) return <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>{'Нет заказов'}</p>
              return filtered.map(o => (
                <div key={o.id} style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', boxSizing: 'border-box' as const, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' as const, gap: '12px' }}>
                    <div style={{ minWidth: 0, flex: '1 1 160px' }}>
                      <div onClick={() => router.push('/admin/orders/' + o.id)} style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '17px', color: '#FF4D00', cursor: 'pointer', textDecoration: 'underline', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{o.name}</div>
                      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#999', marginTop: '4px', wordBreak: 'break-word' as const }}>{o.phone}</div>
                      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#999', marginTop: '2px', wordBreak: 'break-word' as const }}>{o.address}</div>
                      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#bbb', marginTop: '4px' }}>{fmtDate(o.createdAt)}</div>
                    </div>
                    <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 900, fontSize: '20px', color: '#FF4D00' }}>{fmt(o.total)} {'руб.'}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' as const }}>
                        <div style={{ padding: '4px 12px', borderRadius: '20px', background: (statusColor[o.status] ?? statusColor.new).bg, color: (statusColor[o.status] ?? statusColor.new).color, fontFamily: 'var(--font-geologica)', fontSize: '12px', fontWeight: 600 }}>{statusLabel[o.status] ?? o.status}</div>
                        {o.status !== 'done' && <button onClick={() => changeStatus(o.id, nextStatus[o.status] ?? 'new')} style={{ padding: '4px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: '#FF4D00', color: '#fff', fontFamily: 'var(--font-geologica)', fontSize: '12px', fontWeight: 600 }}>{'↑'}</button>}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                    {o.items.map(i => (
                      <span key={i.id} style={{ background: '#FFF8EF', border: '1px solid #FFD4C2', borderRadius: '8px', padding: '4px 10px', fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#433932', boxSizing: 'border-box' as const }}>
                        {i.name} x{i.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        )}

        {/* Subscriptions */}
        {!loading && tab === 'subscriptions' && (
          <div className="sub-card" style={card}>
            {/* Newsletter form */}
            <div style={{ marginBottom: '32px', background: '#FFF8EF', border: '2px solid #FFD4C2', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', fontWeight: 700, color: '#433932', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '16px' }}>{'Рассылка подписчикам'}</h2>
              <input
                type="text"
                placeholder="Тема письма"
                value={newsletterSubject}
                onChange={e => setNewsletterSubject(e.target.value)}
                style={{ width: '100%', marginBottom: '12px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const, background: '#fff' }}
              />
              <textarea
                placeholder="Текст письма"
                value={newsletterBody}
                onChange={e => setNewsletterBody(e.target.value)}
                rows={5}
                style={{ width: '100%', marginBottom: '16px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const, background: '#fff', resize: 'vertical' as const }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' as const }}>
                <button
                  onClick={sendNewsletter}
                  disabled={newsletterLoading}
                  style={{ padding: '13px 32px', borderRadius: '12px', border: 'none', background: newsletterLoading ? '#ccc' : 'linear-gradient(135deg, #FF4D00 0%, #ff7a3d 100%)', color: '#fff', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 700, cursor: newsletterLoading ? 'not-allowed' : 'pointer', boxShadow: newsletterLoading ? 'none' : '0 4px 16px rgba(255,77,0,0.3)', transition: 'all 0.2s', letterSpacing: '0.04em' }}
                >
                  {newsletterLoading ? 'Отправка...' : 'Отправить всем'}
                </button>
                {newsletterStatus === 'ok' && <span style={{ color: '#2ecc71', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600 }}>{'Рассылка отправлена!'}</span>}
                {newsletterStatus === 'error' && <span style={{ color: '#FF4D00', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600 }}>{'Ошибка отправки'}</span>}
                {newsletterStatus === 'error_empty' && <span style={{ color: '#FF4D00', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600 }}>{'Заполните тему и текст'}</span>}
              </div>
            </div>
            {subscriptions.length === 0 && <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>No subscriptions yet</p>}
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: '400px' }}>
                <thead>
                  <tr style={{ background: '#FF4D00' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Почта'}</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Тариф'}</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Дата'}</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((s, idx) => (
                    <tr key={s.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FFF8EF' }}>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932', wordBreak: 'break-word' as const }}>{s.email}</td>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#FF4D00', fontWeight: 600 }}>{s.plan}</td>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#999' }}>{fmtDate(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users */}
        {!loading && tab === 'users' && (
          <div className="sub-card" style={card}>
            {users.length === 0 && <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>No users yet</p>}
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: '500px' }}>
                <thead>
                  <tr style={{ background: '#FF4D00' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Имя'}</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Почта'}</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Роль'}</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Дата'}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FFF8EF' }}>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932', fontWeight: 600, wordBreak: 'break-word' as const }}>{u.name}</td>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932', wordBreak: 'break-word' as const }}>{u.email}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{ padding: '3px 12px', borderRadius: '20px', background: u.role === 'ADMIN' ? '#FF4D00' : '#F0F0F0', color: u.role === 'ADMIN' ? '#fff' : '#666', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>{u.role}</span>
                      </td>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#999' }}>{fmtDate(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Plans */}
        {!loading && tab === 'plans' && (
          <div className="sub-card" style={card}>
            <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '22px', fontWeight: 800, color: '#433932', marginBottom: '24px' }}>{'Подписки на тарифы'}</h2>
            {planSubs.length === 0 ? (
              <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>{'Нет оформленных подписок'}</p>
            ) : (
              <>
                {/* Desktop */}
                <div className="admin-plans-desktop" style={{ overflowX: 'auto' as const }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: '600px' }}>
                    <thead>
                      <tr style={{ background: '#7B3FA0' }}>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Имя'}</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Телефон'}</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Тариф'}</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Сумма'}</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Дата'}</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left' as const, fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>{'Статус'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planSubs.map((s, idx) => (
                        <tr key={s.id} style={{ background: idx % 2 === 0 ? '#fff' : '#F9F4FF' }}>
                          <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932', fontWeight: 600 }}>{s.name}</td>
                          <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932' }}>{s.phone}</td>
                          <td style={{ padding: '12px 20px' }}>
                            <span style={{ padding: '3px 14px', borderRadius: '20px', background: '#7B3FA0', color: '#fff', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 700 }}>{s.plan}</span>
                          </td>
                          <td style={{ padding: '12px 20px', fontFamily: 'var(--font-comfortaa)', fontWeight: 800, color: '#7B3FA0' }}>{s.price.toLocaleString('ru-RU')} ₽</td>
                          <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#999' }}>{s.date}</td>
                          <td style={{ padding: '12px 20px' }}>
                            <span style={{ padding: '3px 14px', borderRadius: '20px', background: '#E8F5E9', color: '#2E7D32', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>{s.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile */}
                <div className="admin-plans-mobile" style={{ display: 'none' }}>
                  {planSubs.map((s, idx) => (
                    <div key={s.id} style={{ background: idx % 2 === 0 ? '#fff' : '#F9F4FF', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid rgba(123,63,160,0.15)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 800, fontSize: '16px', color: '#433932' }}>{s.name}</span>
                        <span style={{ padding: '3px 14px', borderRadius: '20px', background: '#7B3FA0', color: '#fff', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 700 }}>{s.plan}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#666', marginBottom: '4px' }}>{s.phone}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 800, color: '#7B3FA0', fontSize: '16px' }}>{s.price.toLocaleString('ru-RU')} ₽/мес.</span>
                        <span style={{ padding: '3px 14px', borderRadius: '20px', background: '#E8F5E9', color: '#2E7D32', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>{s.status}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#999', marginTop: '6px' }}>{s.date}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </main>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminPageInner />
    </Suspense>
  )
}
