'use client'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
type Message = { role: string; content: string }
export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const userMessage: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const text = await res.text()
      setMessages([...newMessages, { role: 'assistant', content: text }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error' }])
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, height: 'calc(100vh - 180px)', maxWidth: '800px', margin: '0 auto', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 8px 48px rgba(255,77,0,0.10)', background: '#fff', boxSizing: 'border-box' as const }}>
      <div style={{ background: 'linear-gradient(90deg, #FF4D00 0%, #ff7a3d 100%)', padding: '20px 28px', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-comfortaa)', fontSize: '22px', fontWeight: 900, color: '#fff' }}>AI Ассистент</div>
        <div style={{ fontFamily: 'var(--font-geologica)', fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Спроси меня про меню, доставку или состав блюд</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '20px', display: 'flex', flexDirection: 'column' as const, gap: '12px', background: '#E8D5C4' }}>
        {messages.length === 0 && (
          <p style={{ fontFamily: 'var(--font-geologica)', color: '#bbb', textAlign: 'center' as const, marginTop: '40px', fontSize: '15px' }}>Напиши что-нибудь...</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', borderRadius: '18px', padding: '12px 16px', fontSize: '14px', fontFamily: 'var(--font-geologica)', background: m.role === 'user' ? 'linear-gradient(90deg, #FF4D00 0%, #ff7a3d 100%)' : '#fff', color: m.role === 'user' ? '#fff' : '#433932', boxShadow: m.role === 'user' ? '0 4px 16px rgba(255,77,0,0.2)' : '0 2px 12px rgba(0,0,0,0.08)', boxSizing: 'border-box' as const }}>
              {m.role === 'assistant' ? (
                <div style={{ maxWidth: '80%', borderRadius: '18px', padding: '12px 16px', fontSize: '14px', fontFamily: 'var(--font-geologica)', background: '#fff', color: '#433932', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', boxSizing: 'border-box' as const }}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: '#fff', borderRadius: '18px', padding: '12px 16px', fontFamily: 'var(--font-geologica)', fontSize: '14px', color: '#bbb', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>Думаю...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding: '16px 20px', background: '#fff', borderTop: '1.5px solid #FFD4C2', flexShrink: 0, boxSizing: 'border-box' as const }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Напиши сообщение...'
          style={{ flex: 1, minWidth: 0, background: '#FFFAF8', border: '1.5px solid #FFD4C2', borderRadius: '14px', padding: '12px 16px', fontFamily: 'var(--font-geologica)', fontSize: '15px', color: '#433932', outline: 'none', boxSizing: 'border-box' as const }}
        />
        <button
          type='submit'
          disabled={isLoading}
          style={{ flexShrink: 0, background: isLoading ? '#ffb899' : 'linear-gradient(90deg, #FF4D00 0%, #ff7a3d 100%)', color: '#fff', borderRadius: '14px', padding: '12px 20px', fontFamily: 'var(--font-geologica)', fontSize: '15px', fontWeight: 700, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(255,77,0,0.25)', whiteSpace: 'nowrap' as const }}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}
