'use client'
import { useEffect } from 'react'

const categories = [
  { name: 'Accessories', sub: 'Jewellery · Scarves · Bags', icon: '💍', grad: 'linear-gradient(135deg,#c9a96e,#d4806a)', span: true },
  { name: 'Footwear', sub: 'Heels · Sandals · Flats', icon: '👠', grad: 'linear-gradient(135deg,#8a5a42,#c07858)', span: false },
  { name: 'Wigs & Hair', sub: 'Human · Synthetic · Lace Front', icon: '💆‍♀️', grad: 'linear-gradient(135deg,#2a1a12,#8a5a42)', span: false },
  { name: 'Beauty', sub: 'Skincare · Makeup · Fragrance', icon: '💄', grad: 'linear-gradient(135deg,#e8c4b0,#c9a96e)', span: false },
  { name: 'Handbags', sub: 'Clutch · Tote · Crossbody', icon: '👜', grad: 'linear-gradient(135deg,#c07858,#2a1a12)', span: false },
]

export default function Categories() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="categories" style={{ padding: '6rem 5rem', position: 'relative', zIndex: 1 }}>
      <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
        <div>
          <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '.6rem' }}>Browse</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--deep)', lineHeight: 1.1 }}>
            Shop by Category
          </h2>
        </div>
        <a href="#" style={{ fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none' }}>
          View all →
        </a>
      </div>

      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr',
        gridTemplateRows: '260px 260px',
        gap: '1.2rem',
      }}>
        {categories.map((cat, i) => (
          <div key={cat.name}
            style={{
              position: 'relative', overflow: 'hidden', borderRadius: 2,
              display: 'flex', alignItems: 'flex-end',
              gridRow: cat.span ? '1 / 3' : 'auto',
              transition: 'transform .4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ position: 'absolute', inset: 0, background: cat.grad, transition: 'transform .6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,26,18,.72) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', opacity: .22, pointerEvents: 'none' }}>
              {cat.icon}
            </div>
            <div style={{ position: 'relative', zIndex: 2, padding: '1.6rem', width: '100%' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#fff', marginBottom: '.3rem' }}>{cat.name}</div>
              <div style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>{cat.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
