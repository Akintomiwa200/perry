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
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="categories" className="section-pad" style={{ position: 'relative', zIndex: 1 }}>
      <div className="reveal section-header">
        <div>
          <div className="section-label">Browse</div>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <a href="#" style={{ fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none' }}>
          View all →
        </a>
      </div>

      <div className="reveal cat-grid">
        {categories.map((cat) => (
          <div key={cat.name}
            className={cat.span ? 'cat-span' : ''}
            style={{
              position: 'relative', overflow: 'hidden', borderRadius: 2,
              display: 'flex', alignItems: 'flex-end', transition: 'transform .4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ position: 'absolute', inset: 0, background: cat.grad }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,26,18,.72) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', opacity: .22, pointerEvents: 'none' }}>
              {cat.icon}
            </div>
            <div style={{ position: 'relative', zIndex: 2, padding: '1.4rem', width: '100%' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#fff', marginBottom: '.3rem' }}>{cat.name}</div>
              <div style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>{cat.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
