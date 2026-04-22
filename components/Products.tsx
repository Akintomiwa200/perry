'use client'
import { useState } from 'react'
import Link from 'next/link'

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    cat: 'Accessories',
    name: 'Gold Statement Necklace',
    price: '₦8,500',
    oldPrice: null,
    badge: 'New',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    cat: 'Footwear',
    name: 'Strappy Block Heel',
    price: '₦11,500',
    oldPrice: '₦15,000',
    badge: 'Hot',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    cat: 'Wigs & Hair',
    name: 'Lace Front — Body Wave',
    price: '₦45,000',
    oldPrice: null,
    badge: null,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop',
    cat: 'Handbags',
    name: 'Structured Mini Tote',
    price: '₦16,000',
    oldPrice: '₦22,000',
    badge: 'Sale',
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* IMAGE */}
      <div style={{
        aspectRatio: '3/4',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '1rem',
        borderRadius: 6,
        background: '#f3ece7',
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform .6s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* HOVER OVERLAY — blur + dim */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(42, 26, 18, 0.35)',
          backdropFilter: hovered ? 'blur(3px)' : 'blur(0px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity .4s ease, backdrop-filter .4s ease',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '1.5rem',
        }}>
          <button
            style={{
              fontSize: '.72rem',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              background: 'var(--cream)',
              color: 'var(--deep)',
              border: 'none',
              padding: '.75rem 1.6rem',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              transform: hovered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'transform .4s ease, background .3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)', e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--cream)', e.currentTarget.style.color = 'var(--deep)')}
            onClick={e => e.stopPropagation()}
          >
            Add to Cart
          </button>
        </div>

        {/* BADGE */}
        {product.badge && (
          <div style={{
            position: 'absolute',
            top: '.8rem',
            left: '.8rem',
            background: 'var(--terracotta)',
            color: '#fff',
            fontSize: '.65rem',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            padding: '.3rem .7rem',
          }}>
            {product.badge}
          </div>
        )}

        {/* WISHLIST */}
        <button
          onClick={e => { e.stopPropagation(); setWished(w => !w) }}
          style={{
            position: 'absolute',
            top: '.8rem',
            right: '.8rem',
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '.9rem',
            border: 'none',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'all .3s ease',
            color: wished ? 'var(--terracotta)' : '#333',
            boxShadow: '0 6px 18px rgba(0,0,0,.08)',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>

      {/* TEXT */}
      <div style={{
        fontSize: '.68rem',
        letterSpacing: '.16em',
        textTransform: 'uppercase',
        color: 'var(--mid)',
        marginBottom: '.25rem',
      }}>
        {product.cat}
      </div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
        fontWeight: 400,
        color: 'var(--deep)',
        marginBottom: '.5rem',
      }}>
        {product.name}
      </div>

      <div style={{
        fontSize: '.95rem',
        fontWeight: 500,
        color: 'var(--terracotta)',
      }}>
        {product.oldPrice && (
          <span style={{
            textDecoration: 'line-through',
            color: '#b8a39a',
            marginRight: '.5rem'
          }}>
            {product.oldPrice}
          </span>
        )}
        {product.price}
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section
      id="new"
      className="section-pad"
      style={{
        background: 'var(--cream)',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* HEADER */}
      <div className="section-header">
        <div>
          <div className="section-label">New In</div>
          <h2 className="section-title">Fresh Picks</h2>
        </div>

        <Link href="/products" style={{
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
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}