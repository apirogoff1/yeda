'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const navItems = [
  { label: 'Главная',      color: '#FF5A1F', y: 10,  href: '/'             },
  { label: 'Меню',         color: '#42B883', y: -14, href: '/menu'         },
  { label: 'Как работает', color: '#25A9E0', y: 6,   href: '/how-it-works' },
  { label: 'Подписка',     color: '#B85CFF', y: -10, href: '/subscription' },
  { label: 'Доставка',     color: '#FF5A1F', y: 14,  href: '/delivery'     },
  { label: 'О компании',   color: '#42B883', y: -6,  href: '/about'        },
  { label: 'FAQ',          color: '#25A9E0', y: 8,   href: '/faq'          },
  { label: 'Контакты',     color: '#B85CFF', y: -12, href: '/contacts'     },
]

export default function HeaderClient({ userRole }: { userRole: string | null }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [logoHovered, setLogoHovered] = useState(false)
  const router = useRouter()

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
              <Link href={userRole === 'ADMIN' ? '/admin' : '/dashboard'} style={{
                fontFamily: 'var(--font-geologica)', fontWeight: 900, fontSize: '18px',
                color: '#433932', textDecoration: 'none', padding: '8px 16px',
              }}>
                {userRole === 'ADMIN' ? 'Админка' : 'Личный кабинет'}
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
          }}>Заказать</Link>
        </div>
      </div>
    </header>
  )
}
