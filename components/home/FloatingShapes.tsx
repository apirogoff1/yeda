'use client'
import { useMemo } from 'react'

const emojis = ['🍓', '🥕', '🫐', '🍋', '🥦', '🍇', '🍊', '🥒', '🍅', '🌽', '🍄', '🧅', '🥝', '🍑']

const css = `
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.float-shape {
  position: absolute;
  pointer-events: none;
  user-select: none;
  filter: sepia(1) saturate(1.3) hue-rotate(345deg) brightness(1.2);
  animation: floatY linear infinite;
}
`

export default function FloatingShapes() {
  const items = useMemo(() => {
    return Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: (i * 7.3) % 95,
      y: (i * 83) % 4800,
      size: 5 + (i % 3) * 2,
      emoji: emojis[i % emojis.length],
      duration: 10 + (i % 8) * 2,
      delay: (i % 6) * 1.2,
      opacity: 0.4 + (i % 3) * 0.15,
    }))
  }, [])

  return (
    <>
      <style>{css}</style>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {items.map(item => (
          <div
            key={item.id}
            className="float-shape"
            style={{
              left: `${item.x}%`,
              top: `${item.y}px`,
              fontSize: item.size,
              opacity: item.opacity,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
    </>
  )
}
