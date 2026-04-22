'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const categories = [
  {
    name: 'Accessories',
    sub: 'Jewellery · Scarves · Bags',
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop',
    span: true,
  },
  {
    name: 'Footwear',
    sub: 'Heels · Sandals · Flats',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    span: false,
  },
  {
    name: 'Wigs & Hair',
    sub: 'Human · Synthetic · Lace Front',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    span: false,
  },
  {
    name: 'Beauty',
    sub: 'Skincare · Makeup · Fragrance',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    span: false,
  },
  {
    name: 'Handbags',
    sub: 'Clutch · Tote · Crossbody',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop',
    span: false,
  },
]

export default function Categories() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="categories" className="section-pad" style={{ position: 'relative', zIndex: 1 }}>
      
      {/* HEADER */}
      <div className="reveal section-header">
        <div>
          <div className="section-label">Browse</div>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        <Link href="/categories" style={{
          fontSize: '.75rem',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: 'var(--terracotta)',
          textDecoration: 'none'
        }}>
          View all →
        </Link>
      </div>

      {/* GRID */}
      <div className="reveal cat-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={cat.span ? 'cat-span' : ''}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'flex-end',
              transition: 'transform .4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* DARK OVERLAY */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 60%)'
            }} />

            {/* CONTENT */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: '1.4rem',
              width: '100%',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#fff',
                marginBottom: '.3rem'
              }}>
                {cat.name}
              </div>

              <div style={{
                fontSize: '.7rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.75)'
              }}>
                {cat.sub}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}