import HeroSection from '@/components/home/HeroSection'
import FloatingShapes from '@/components/home/FloatingShapes'

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#F5EAD8', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <HeroSection />
    </main>
  )
}



