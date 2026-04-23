'use client'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/db'

export default function Products() {
  const newProducts = mockProducts.filter(p => p.isNew).slice(0, 6)

  if (newProducts.length === 0) return null

  return (
    <section id="new" className="section-pad" style={{ background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="section-header">
        <div>
          <div className="section-label">New In</div>
          <h2 className="section-title">Fresh Picks</h2>
        </div>

        <Link href="/shop" style={{
          fontSize: '.75rem',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: 'var(--terracotta)',
          textDecoration: 'none'
        }}>
          View all →
        </Link>
      </div>

      {/* Grid - 3 per row */}
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {newProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
