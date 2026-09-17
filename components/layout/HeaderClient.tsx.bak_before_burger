'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store'

const navItems = [
  { label: 'Меню',         color: '#42B883', y: -14, href: '/menu'         },
  { label: 'Как работает', color: '#25A9E0', y: 6,   href: '/how-it-works' },
  { label: 'Подписка',     color: '#B85CFF', y: -10, href: '/subscription' },
  { label: 'Доставка',     color: '#FF5A1F', y: 14,  href: '/delivery'     },
  { label: 'О компании',   color: '#42B883', y: -6,  href: '/about'        },
  { label: 'FAQ',          color: '#25A9E0', y: 8,   href: '/faq'          },
  { label: 'Контакты',     color: '#B85CFF', y: -12, href: '/contacts'     },
]

export default function HeaderClient({ userRole }: { userRole: string | null }) {
  const pathname = usePathname()
  if (pathname.startsWith('/editor')) return null
  const [hovered, setHovered] = useState<string | null>(null)
  const [logoHovered, setLogoHovered] = useState(false)
  const router = useRouter()

  const user = useAuthStore(state => state.user)
  const initials = user?.name ? user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : 'ЛК'

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: '88px', display: 'flex', alignItems: 'center', padding: '0 48px',
    }}>
      <div style={{
        width: '100%', maxWidth: '1600px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(180deg, #FFE8C0 0%, #FFE6C4 25%, #FFE5CC 50%, #FFE4D8 75%, #FFE4E8 100%)',
        borderRadius: '22px',
        boxShadow: '0 4px 24px rgba(255,100,0,0.18)',
        padding: '0 36px',
        height: '64px',
      }}>
        <Link href="/"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            fontFamily: 'var(--font-comfortaa)',
            fontSize: '42px', fontWeight: 900, color: '#FF4D00',
            textDecoration: 'none', display: 'inline-block',
            transform: logoHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.25s',
          }}>
          YEDA
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-pulse"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: 'var(--font-geologica)',
                fontWeight: 900,
                fontSize: '18px',
                color: hovered === item.label ? '#FF4D00' : item.color,
                textDecoration: 'none',
                display: 'inline-block',
                transform: `translateY(${item.y}px) scale(${hovered === item.label ? 1.08 : 1})`,
                transition: 'color 0.22s, transform 0.22s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {userRole ? (
            <>
              <Link href="/dashboard"
  onMouseEnter={() => setHovered('cabinet')}
  onMouseLeave={() => setHovered(null)}
  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
  title="Личный кабинет">
  <div style={{
    width: '42px', height: '42px', borderRadius: '50%',
    background: hovered === 'cabinet' ? 'linear-gradient(135deg, #2196F3, #1565C0)' : 'linear-gradient(135deg, #1A6FD4, #0D47A1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: hovered === 'cabinet' ? '0 8px 24px rgba(33,150,243,0.6)' : '0 3px 12px rgba(13,71,161,0.35)',
    transform: hovered === 'cabinet' ? 'scale(1.13) rotate(-4deg)' : 'scale(1) rotate(0deg)',
    transition: 'all 0.25s',
    fontFamily: 'var(--font-comfortaa)',
    fontSize: '22px', fontWeight: 900, color: '#fff', textShadow: '0 0 6px rgba(255,255,255,0.7)',
    letterSpacing: '0.5px',
    userSelect: 'none',
  }}>
    {initials}
  </div>
</Link>
              <button onClick={handleLogout} style={{
                fontFamily: 'var(--font-geologica)', fontWeight: 900, fontSize: '18px',
                color: '#433932', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
              }}>
                Выйти
              </button>
            </>
          ) : (
            <Link href="/login" style={{
              fontFamily: 'var(--font-geologica)', fontWeight: 900, fontSize: '18px',
              color: '#433932', textDecoration: 'none', padding: '8px 16px',
            }}>Войти</Link>
          )}
          <Link href="/cart" style={{
            fontFamily: 'var(--font-geologica)', fontWeight: 900, fontSize: '18px',
            background: 'linear-gradient(135deg, #FF7A1A, #FF4E1A)', color: '#fff',
            borderRadius: '50px', padding: '12px 30px',
            boxShadow: '0 4px 16px rgba(255,90,31,0.35)',
            transition: 'transform 0.22s, filter 0.22s',
            textDecoration: 'none', display: 'inline-block',
          }}>Корзина</Link>
        </div>
      </div>
    </header>
  )
}
