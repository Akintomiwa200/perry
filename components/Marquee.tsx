'use client'
const items = [
  'Fashion Accessories', 'Luxury Footwear', 'Premium Wigs',
  'Beauty Products', 'Handbags & Purses', 'Style. Grace. You.',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: 'var(--deep)', color: 'var(--gold)',
      overflow: 'hidden', padding: '1rem 0', position: 'relative', zIndex: 2,
    }}>
      <div className="marquee-inner" style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem', fontStyle: 'italic', padding: '0 2rem',
            }}>{item}</span>
            <span style={{ color: 'var(--terracotta)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
