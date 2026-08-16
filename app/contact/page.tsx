'use client';

import { useState } from 'react';
import FloatingShapes from '@/components/home/FloatingShapes';
import SupportModal from '@/components/SupportModal';

const ACCENT = '#5BC4D8';
const ACCENT_LIGHT = 'rgba(91,196,216,0.12)';
const ACCENT_BORDER = 'rgba(91,196,216,0.3)';
const TEXT_DARK = '#433932';
const TEXT_MED = '#3D2E28';
const BG = '#FFF8EF';

export default function ContactPage() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', order: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.contact || !form.message) {
      setError('Zapolnite obyazatelnye polya: imya, kontakt i soobshenie.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', contact: '', order: '', topic: '', message: '' });
      } else {
        setError('Chto-to poshlo ne tak. Poprobujte eshyo raz.');
      }
    } catch {
      setError('Oshibka seti. Poprobujte pozhe.');
    }
    setSending(false);
  };

  return (
    <main style={{ background: BG, minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      {modal && <SupportModal onClose={() => setModal(false)} />}

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <FloatingShapes />
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Zagolovok */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', background: ACCENT_LIGHT, borderRadius: '100px', padding: '8px 20px', marginBottom: '20px' }}>
            <span style={{ color: ACCENT, fontFamily: 'var(--font-geologica)', fontSize: '14px', fontWeight: 600 }}>Kontakty</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '42px', fontWeight: 700, color: TEXT_DARK, marginBottom: '16px', lineHeight: 1.2 }}>
            My na svyazi
          </h1>
          <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '17px', color: TEXT_MED, maxWidth: '520px', margin: '0 auto' }}>
            Est vopros po zakazu, dostavke ili podpiske? Napishite nam — razberomsa.
          </p>
        </div>

        {/* Bloky podderzhki */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '48px' }}>

          {/* Chat */}
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '28px', padding: '32px 28px', backdropFilter: 'blur(10px)', border: `2px solid ${ACCENT_BORDER}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '36px' }}>💬</div>
            <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '18px', fontWeight: 700, color: TEXT_DARK }}>Onlayn-chat</div>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_MED, lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
              Samyy bystryy sposob poluchit otvet po tekushemu zakazu.
            </p>
            <button
              onClick={() => setModal(true)}
              style={{ marginTop: '8px', padding: '12px 24px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Otkryt chat
            </button>
          </div>

          {/* Telefon */}
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '28px', padding: '32px 28px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '36px' }}>📞</div>
            <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '18px', fontWeight: 700, color: TEXT_DARK }}>Telefon</div>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '20px', fontWeight: 700, color: ACCENT, margin: 0 }}>+7 (495) 123-45-67</p>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: TEXT_MED, margin: 0 }}>Ezhednevno, 08:00–23:00</p>
            
              
              <a href="tel:+74951234567"
              style={{ marginTop: '8px', padding: '12px 24px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Pozvonit
            </a>
          </div>

          {/* Email */}
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '28px', padding: '32px 28px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '36px' }}>✉️</div>
            <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '18px', fontWeight: 700, color: TEXT_DARK }}>Email</div>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '15px', color: ACCENT, fontWeight: 600, margin: 0 }}>hello@yeda.ru</p>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: TEXT_MED, margin: 0 }}>Po voprosam sotrudnichestva: partners@yeda.ru</p>
            
              href="mailto:hello@yeda.ru"
              style={{ marginTop: '8px', padding: '12px 24px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Napisat nam
            </a>
          </div>

        </div>

        {/* Adres + karta */}
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '28px', padding: '40px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.6)', marginBottom: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'inline-block', background: ACCENT_LIGHT, borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
              <span style={{ color: ACCENT, fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>Gde nas nayti</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '24px', fontWeight: 700, color: TEXT_DARK, margin: '0 0 8px' }}>
              г. Москва, ул. Садовая-Кудринская, д. 11, офис 204
            </h2>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: TEXT_MED, margin: 0, opacity: 0.7 }}>
              Dlya polucheniya zakaza priezhat po etomu adresu ne nuzhno — my sami privezom ego k vam.
            </p>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '320px' }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.589600%2C55.764500&z=16&pt=37.589600%2C55.764500,pm2rdm"
              width="100%"
              height="320"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen
              title="YEDA na karte"
            />
          </div>
        </div>

        {/* Forma */}
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '28px', padding: '40px', backdropFilter: 'blur(10px)', border: `2px solid ${ACCENT_BORDER}` }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'inline-block', background: ACCENT_LIGHT, borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
              <span style={{ color: ACCENT, fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600 }}>Obratnaya svyaz</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '28px', fontWeight: 700, color: TEXT_DARK, margin: '0 0 8px' }}>Ostalis voprosy?</h2>
            <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', color: TEXT_MED, margin: 0 }}>Zapolnite formu — my otvetim v blizhayshee vremya.</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💚</div>
              <p style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '22px', fontWeight: 700, color: TEXT_DARK, marginBottom: '8px' }}>Soobshenie otpravleno!</p>
              <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '16px', color: TEXT_MED }}>My skoro vernemsya s otvetom 💚</p>
              <button onClick={() => setSent(false)} style={{ marginTop: '24px', padding: '12px 28px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Otpravit eshyo raz</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600, color: TEXT_MED, marginBottom: '8px' }}>Vashe imya *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ivan Ivanov"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: '2px solid rgba(91,196,216,0.2)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_DARK, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600, color: TEXT_MED, marginBottom: '8px' }}>Email ili telefon *</label>
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="mail@example.com"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: '2px solid rgba(91,196,216,0.2)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_DARK, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600, color: TEXT_MED, marginBottom: '8px' }}>Nomer zakaza</label>
                  <input
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    placeholder="#12345"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: '2px solid rgba(91,196,216,0.2)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_DARK, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600, color: TEXT_MED, marginBottom: '8px' }}>Tema obrashenia</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: '2px solid rgba(91,196,216,0.2)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_DARK, outline: 'none', boxSizing: 'border-box', appearance: 'none' }}
                  >
                    <option value="">Vyberte temu</option>
                    <option value="Zakaz">Zakaz</option>
                    <option value="Dostavka">Dostavka</option>
                    <option value="Oplata">Oplata</option>
                    <option value="Podpiska">Podpiska</option>
                    <option value="Sotrudnichestvo">Sotrudnichestvo</option>
                    <option value="Drugoe">Drugoe</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-geologica)', fontSize: '13px', fontWeight: 600, color: TEXT_MED, marginBottom: '8px' }}>Rasskazhite, chto sluchilos *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Opisanie vashego voprosa..."
                  rows={5}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: '2px solid rgba(91,196,216,0.2)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: TEXT_DARK, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              {error && (
                <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#E8446A', margin: 0 }}>{error}</p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{ padding: '14px 36px', background: sending ? '#aaa' : ACCENT, color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-geologica)', fontSize: '16px', fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {sending ? 'Otpravka...' : 'Otpravit soobshenie'}
                </button>
                <p style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: TEXT_MED, opacity: 0.65, margin: 0 }}>
                  Nazhimaya «Otpravit soobshenie», vy soglashaetes s obrabotkoj personalnyh dannyh.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </main>
  );
}
