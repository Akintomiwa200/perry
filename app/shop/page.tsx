'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductList from '@/components/product/ProductList'
import { mockProducts } from '@/lib/db'

const categories = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'accessories', name: 'Accessories', icon: '💍' },
  { id: 'footwear', name: 'Footwear', icon: '👠' },
  { id: 'wigs-hair', name: 'Wigs & Hair', icon: '💆‍♀️' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'handbags', name: 'Handbags', icon: '👜' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = mockProducts.filter(p =>
    activeCategory === 'all' ||
    p.category.toLowerCase().replace(/[\s&]+/g, '-') === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
    }
  })

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
            Shop
          </h1>
          <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>Browse our curated collection</p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'var(--deep)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--cream)' : 'var(--deep)',
                  border: '1px solid var(--blush)',
                  borderColor: activeCategory === cat.id ? 'var(--deep)' : 'var(--blush)',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: '0.6rem 1rem', border: '1px solid var(--blush)', background: 'var(--cream)', fontFamily: "'Jost', sans-serif" }}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--mid)', marginBottom: '2rem' }}>
          Showing {sorted.length} products
        </div>

         <ProductList products={sorted} gridCols={4} />
      </main>
      <Footer />
    </>
  )
}
