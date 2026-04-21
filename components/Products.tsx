'use client'
import { useState } from 'react'

const products = [
  { id: 1, icon: '💍', cat: 'Accessories', name: 'Gold Statement Necklace', price: '₦8,500', oldPrice: null, badge: 'New' },
  { id: 2, icon: '👠', cat: 'Footwear', name: 'Strappy Block Heel', price: '₦11,500', oldPrice: '₦15,000', badge: 'Hot' },
  { id: 3, icon: '💆‍♀️', cat: 'Wigs & Hair', name: 'Lace Front — Body Wave', price: '₦45,000', oldPrice: null, badge: null },
  { id: 4, icon: '👜', cat: 'Handbags', name: 'Structured Mini Tote', price: '₦16,000', oldPrice: '₦22,000', badge: 'Sale' },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{
        aspectRatio: '3/4', position: 'relative', overflow: 'hidden',
        marginBottom: '1rem', background: 'var(--light-gold)', borderRadius: 2,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem',
          transition: 'transform .5s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}>{product.icon}</div>

        {product.badge && (
          <div style={{
            position: 'absolute', top: '.8rem', left: '.8rem',
            background: 'var(--terracotta)', color: '#fff',
            fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase',
            padding: '.3rem .7rem',
          }}>{product.badge}</div>
        )}

        <button
          onClick={() => setWished(w => !w)}
          style={{
            position: 'absolute', top: '.8rem', right: '.8rem',
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(253,248,242,.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '.85rem', border: 'none',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity .3s, transform .3s',
            color: wished ? 'var(--terracotta)' : 'var(--deep)',
          }}
        >{wished ? '♥' : '♡'}</button>
      </div>

      <div style={{ fontSize: '.68rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.25rem' }}>{product.cat}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--deep)', marginBottom: '.5rem' }}>{product.name}</div>
      <div style={{ fontSize: '.95rem', fontWeight: 500, color: 'var(--terracotta)' }}>
        {product.oldPrice && <span style={{ textDecoration: 'line-through', color: 'var(--blush)', marginRight: '.5rem' }}>{product.oldPrice}</span>}
        {product.price}
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section id="new" style={{ padding: '6rem 5rem', background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
        <div>
          <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '.6rem' }}>New In</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--deep)', lineHeight: 1.1 }}>Fresh Picks</h2>
        </div>
        <a href="#" style={{ fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none' }}>View all →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.8rem' }}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
