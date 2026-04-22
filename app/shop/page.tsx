'use client'
import { useState, useSearchParams } from 'react'
import Link from 'next/link'
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
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('filter') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('newest')

  const filtered = mockProducts.filter(p => 
    activeCategory === 'all' || p.category.toLowerCase() === activeCategory || p.category.toLowerCase().replace(' ', '-') === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return b.isNew ? 1 : -1
    }
  })

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
          Shop
        </h1>
        <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>Browse our curated collection</p>
      </section>

      <div className="shop-filters">
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? 'active' : ''}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="products-count">
        Showing {sorted.length} products
      </div>

      <ProductList products={sorted} />

      <style jsx>{`
        .shop-page { padding: 8rem 1.5rem 4rem; max-width: 1400px; margin: 0 auto; }
        .shop-hero { text-align: center; margin-bottom: 3rem; }
        .shop-filters { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
        .category-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .category-tabs button {
          background: transparent; border: 1px solid var(--blush); padding: 0.6rem 1.2rem;
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;
        }
        .category-tabs button.active { background: var(--deep); color: var(--cream); border-color: var(--deep); }
        .sort-select { padding: 0.6rem 1rem; border: 1px solid var(--blush); background: var(--cream); font-family: 'Jost', sans-serif; }
        .products-count { font-size: 0.8rem; color: var(--mid); margin-bottom: 2rem; }
        @media (max-width: 768px) {
          .shop-filters { flex-direction: column; align-items: stretch; }
          .category-tabs { overflow-x: auto; padding-bottom: 0.5rem; }
        }
      `}</style>
    </div>
  )
}