'use client'

import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/db'
import { Product } from '@/types/product.types'

export default function Products() {
  const now = new Date()

  const isRecentlyAdded = (date: string) => {
    const created = new Date(date)
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= 30
  }

  const popularityScore = (p: Product) =>
    p.reviewCount * 0.7 + p.rating * 20

  const sortedByDate = [...mockProducts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const sortedByPopularity = [...mockProducts].sort(
    (a, b) => popularityScore(b) - popularityScore(a)
  )

  const latest = sortedByDate.slice(0, 2)
  const popular = sortedByPopularity.slice(0, 2)

  const selectedIds = new Set([...latest, ...popular].map(p => p.id))

  const others = mockProducts
    .filter(p => !selectedIds.has(p.id))
    .slice(0, 2)

  const finalProducts = [...latest, ...popular, ...others]

  const popularIds = new Set(popular.map(p => p.id))

  return (
    <section className="bg-[var(--cream)] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-amber-600">
              Shop
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Trending Picks
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-amber-700 transition-all hover:gap-2 hover:text-amber-900"
          >
            View all
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {finalProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              isPopular={popularIds.has(p.id)}
              isNewAuto={isRecentlyAdded(p.createdAt)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
