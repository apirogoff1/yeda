import { AiChat } from '@/features/ai-chat'

export default function AiChatPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFF8F4', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box' }}>
      <AiChat />
    </main>
  )
}
