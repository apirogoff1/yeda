export function BubbleTags() {
  const tags = ['Свежие продукты', 'Быстрая доставка', 'Полезные блюда']
  return (
    <>
      {tags.map((t, i) => (
        <span key={i} style={{
          fontFamily: 'var(--font-nunito), sans-serif',
          fontSize: '28px',
          fontWeight: 900,
          color: '#5B2D8E',
          textShadow: '3px 3px 0px rgba(0,0,0,0.25)',
          display: 'inline-block',
          letterSpacing: '1px',
        }}>{t}</span>
      ))}
    </>
  )
}

export function BubbleText({ text, color = '#5B2D8E' }: { text: string; color?: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-nunito), sans-serif',
      fontSize: '28px',
      fontWeight: 900,
      color: color,
      textShadow: '3px 3px 0px rgba(0,0,0,0.25)',
      display: 'inline-block',
      letterSpacing: '1px',
    }}>{text}</span>
  )
}
