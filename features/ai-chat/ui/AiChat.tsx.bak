'use client'
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
    <div className='flex flex-col h-[600px] max-w-2xl mx-auto border rounded-xl overflow-hidden'>
      <div className='bg-gray-900 px-4 py-3 text-white font-semibold'>
        AI Assistant
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950'>
        {messages.length === 0 && (
          <p className='text-gray-500 text-center mt-8'>Write something...</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={m.role === 'user' ? 'max-w-[80%] rounded-xl px-4 py-2 text-sm bg-blue-600 text-white' : 'max-w-[80%] rounded-xl px-4 py-2 text-sm bg-gray-800 text-gray-100'}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-gray-800 text-gray-400 rounded-xl px-4 py-2 text-sm'>
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className='flex gap-2 p-4 bg-gray-900'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Write a message...'
          className='flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 text-sm font-medium'
        >
          Send
        </button>
      </form>
    </div>
  )
}