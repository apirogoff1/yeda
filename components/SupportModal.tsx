'use client';
import { useEffect } from 'react';
interface SupportModalProps {
  onClose: () => void;
}
const IconTelegram = () => (
  <img src="/photo_yeda/telegram.png" width="44" height="44" alt="Telegram" style={{objectFit: "contain"}}/>
);
const IconMAX = () => (
  <img src="/photo_yeda/MAX_Messenger.png" width="44" height="44" alt="MAX" style={{objectFit: "contain"}}/>
);
const IconEmail = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);
export default function SupportModal({ onClose }: SupportModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);
  const contacts = [
    { label: 'Telegram', color: 'transparent', href: 'https://t.me/yeda',   icon: <IconTelegram /> },
    { label: 'MAX',      color: 'transparent', href: '#',                    icon: <IconMAX /> },
    { label: 'Email',    color: '#5B2D8E', href: 'mailto:hello@yeda.ru', icon: <IconEmail /> },
    { label: 'Telefon',  color: '#1A237E', href: 'tel:+78001234567',     icon: <IconPhone /> },
  ];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(67,57,50,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#FFF8EF', borderRadius: '32px', padding: '40px', maxWidth: '420px', width: '100%', position: 'relative' }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#433932', lineHeight: 1 }}
        >×</button>
        <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '24px', fontWeight: 700, color: '#433932', marginBottom: '8px', marginTop: 0 }}>Напишите нам</h2>
        <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#3D2E28', marginBottom: '32px', marginTop: 0 }}>Выберите удобный способ связи</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contacts.map((c, i) => (
            <button
              key={i}
              onClick={() => { if (c.href !== '#') window.open(c.href, '_blank'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.8)', border: '2px solid rgba(255,255,255,0.9)', borderRadius: '16px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
              <span style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', fontWeight: 600, color: '#433932' }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}









