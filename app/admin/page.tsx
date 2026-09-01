'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store'

type OrderItem = { id: string; name: string; price: number; quantity: number }
type Order = { id: string; name: string; phone: string; address: string; total: number; status: string; createdAt: string; items: OrderItem[] }
type Subscription = { id: string; email: string; plan: string; createdAt: string }
type User = { id: string; name: string; email: string; role: string; createdAt: string }
type Stats = { totalOrders: number; totalRevenue: number; newOrders: number; totalSubscriptions: number; totalUsers: number }

function AdminPageInner() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'stats' | 'orders' | 'subscriptions' | 'users'>((searchParams.get('tab') as any) || 'stats')
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date')
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
      }
      es.onerror = () => {
        es.close()
        setTimeout(connect, 3000)
      }
    }

    connect()
    return () => es?.close()
  }, [])

  const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n)

  const statusLabel: Record<string, string> = {
    new: 'Новый',
    cooking: 'Готовится',
    delivery: 'Доставляется',
    done: 'Выполнен',
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
    users: '#E8789A',
  }

  const tabStyle = (t: string) => {
    const color = tabColors[t]
    const active = tab === t
    return {
      padding: '10px 28px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-geologica)',
      fontSize: '15px',
      fontWeight: active ? 700 : 600,
      background: active ? color : color + '44',
      color: active ? '#fff' : '#433932',
      boxShadow: active ? `0 4px 16px ${color}55` : '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.2s',
    }
  }

  const card = (label: string, value: string | number, sub?: string) => (
    <div style={{ background: '#fff', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 6px 32px rgba(0,0,0,0.13)', minWidth: '180px', flex: 1 }}>
      <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '36px', fontWeight: 900, color: '#FF4D00' }}>{value}</div>
      {sub && <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#999', marginTop: '4px' }}>{sub}</div>}
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', background: '#F4F4F4' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        <h1 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '48px', fontWeight: 900, color: '#FF4D00', marginBottom: '8px' }}>Admin</h1>


        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button style={tabStyle('stats')} onClick={() => setTab('stats')}>Статистика</button>
          <button style={tabStyle('orders')} onClick={() => setTab('orders')}>Заказы</button>
          <button style={tabStyle('subscriptions')} onClick={() => setTab('subscriptions')}>Подписки</button>
          <button style={tabStyle('users')} onClick={() => setTab('users')}>Пользователи</button>
        </div>

        {loading && <p style={{ fontFamily: 'var(--font-geologica)', color: '#999' }}>Loading...</p>}

        {/* Stats */}
        {!loading && tab === 'stats' && stats && (
          <>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {card('Всего заказов', stats.totalOrders)}
              {card('Новые заказы', stats.newOrders)}
              {card('Выручка', fmt(stats.totalRevenue) + ' руб.')}
              {card('Подписки', stats.totalSubscriptions)}
              {card('Пользователи', stats.totalUsers)}
            </div>
            <h2 style={{ fontFamily: 'var(--font-geologica)', fontSize: '18px', fontWeight: 700, color: '#433932', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Статусы заказов</h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { key: 'new', label: 'Новый', bg: '#FFF0EB', color: '#FF4D00', border: '#FFD4C2' },
                { key: 'cooking', label: 'Готовится', bg: '#FFF8E1', color: '#F59E0B', border: '#FFE9A0' },
                { key: 'delivery', label: 'Доставляется', bg: '#E8F4FF', color: '#4A90D9', border: '#B8D8F8' },
                { key: 'done', label: 'Выполнен', bg: '#EFFFEF', color: '#2ecc71', border: '#A8F0B8' },
              ].map(s => (
                <div key={s.key} style={{ background: s.bg, border: `2px solid ${s.border}`, borderRadius: '20px', padding: '24px 32px', flex: 1, minWidth: '160px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                  <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '42px', fontWeight: 900, color: s.color, lineHeight: 1 }}>
                    {orders.filter(o => o.status === s.key).length}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '12px', color: '#999', marginTop: '6px' }}>заказов</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Orders */}
        {!loading && tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Поиск по имени, телефону, адресу"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 2, minWidth: '200px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' }}
              />
              <div style={{ position: 'relative', flex: 1, minWidth: '140px' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#bbb', pointerEvents: 'none', zIndex: 1 }}>с</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px 12px 28px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: dateFrom ? '#433932' : '#bbb', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ position: 'relative', flex: 1, minWidth: '140px' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#bbb', pointerEvents: 'none', zIndex: 1 }}>по</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px 12px 36px', borderRadius: '12px', border: '1.5px solid #FFD4C2', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: dateTo ? '#433932' : '#bbb', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button onClick={() => { setSortBy('date'); setSortDir(d => d === 'desc' ? 'asc' : 'desc') }} style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: sortBy === 'date' ? '#fff' : '#433932', background: sortBy === 'date' ? '#FF4D00' : '#fff', boxShadow: sortBy === 'date' ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}>
                {sortBy === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : ''} Дата
              </button>
              <button onClick={() => { setSortBy('total'); setSortDir(d => d === 'desc' ? 'asc' : 'desc') }} style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600, color: sortBy === 'total' ? '#fff' : '#433932', background: sortBy === 'total' ? '#FF4D00' : '#fff', boxShadow: sortBy === 'total' ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}>
                {sortBy === 'total' ? (sortDir === 'desc' ? '↓' : '↑') : ''} Сумма
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {['all', 'new', 'cooking', 'delivery', 'done'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '8px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: statusFilter === s ? 700 : 600, background: statusFilter === s ? '#FF4D00' : '#fff', color: statusFilter === s ? '#fff' : '#433932', boxShadow: statusFilter === s ? '0 4px 16px rgba(255,77,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}>
                  {s === 'all' ? 'Все' : s === 'new' ? 'Новый' : s === 'cooking' ? 'Готовится' : s === 'delivery' ? 'Доставляется' : 'Выполнен'}
                </button>
              ))}
            </div>
            {(() => {
              const filtered = orders
                .filter(o => (statusFilter === 'all' || o.status === statusFilter))
                .filter(o => search === '' || o.name.toLowerCase().includes(search.toLowerCase()) || o.phone.includes(search) || o.address.toLowerCase().includes(search.toLowerCase()))
                .filter(o => {
                  const d = new Date(o.createdAt)
                  if (dateFrom && d < new Date(dateFrom)) return false
                  if (dateTo && d > new Date(dateTo + 'T23:59:59')) return false
                  return true
                })
                .sort((a, b) => {
                  if (sortBy === 'total') return sortDir === 'desc' ? b.total - a.total : a.total - b.total
                  return sortDir === 'desc' ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                })
              if (filtered.length === 0) return <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>Нет заказов</p>
              return filtered.map(o => (
              <div key={o.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 6px 24px rgba(0,0,0,0.11)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div onClick={() => router.push('/admin/orders/' + o.id)} style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '18px', color: '#FF4D00', cursor: 'pointer', textDecoration: 'underline' }}>{o.name}</div>
                    <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#999', marginTop: '4px' }}>{o.phone} · {o.address}</div>
                    <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#bbb', marginTop: '4px' }}>{fmtDate(o.createdAt)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 900, fontSize: '22px', color: '#FF4D00' }}>{fmt(o.total)} руб.</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', justifyContent: 'flex-end' }}>
                      <div style={{ padding: '4px 14px', borderRadius: '20px', background: (statusColor[o.status] ?? statusColor.new).bg, color: (statusColor[o.status] ?? statusColor.new).color, fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>{statusLabel[o.status] ?? o.status}</div>
                      {o.status !== 'done' && <button onClick={() => changeStatus(o.id, nextStatus[o.status] ?? 'new')} style={{ padding: '4px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: '#FF4D00', color: '#fff', fontFamily: 'var(--font-geologica)', fontSize: '12px', fontWeight: 600 }}>→</button>}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {o.items.map(i => (
                    <span key={i.id} style={{ background: '#FFF8EF', border: '1px solid #FFD4C2', borderRadius: '8px', padding: '4px 12px', fontFamily: 'var(--font-geologica)', fontSize: '13px', color: '#433932' }}>
                      {i.name} x{i.quantity}
                    </span>
                  ))}
                </div>
              </div>
            ))})()}
          </div>
        )}

        {/* Subscriptions */}
        {!loading && tab === 'subscriptions' && (
          <div>
            {subscriptions.length === 0 && <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>No subscriptions yet</p>}
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.11)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FF4D00' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Почта</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Тариф</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((s, idx) => (
                    <tr key={s.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FFF8EF' }}>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932' }}>{s.email}</td>
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
          <div>
            {users.length === 0 && <p style={{ color: '#999', fontFamily: 'var(--font-geologica)' }}>No users yet</p>}
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.11)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FF4D00' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Имя</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Почта</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Роль</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-geologica)', color: '#fff', fontWeight: 600 }}>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FFF8EF' }}>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932', fontWeight: 600 }}>{u.name}</td>
                      <td style={{ padding: '12px 20px', fontFamily: 'var(--font-geologica)', color: '#433932' }}>{u.email}</td>
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
