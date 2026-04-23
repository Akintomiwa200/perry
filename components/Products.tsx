'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { mockProducts } from '@/lib/db'
import { Product } from '@/types/product.types'
import { formatPrice, calculateDiscount } from '@/lib/utils'

function ProductCard({
  product,
  isPopular,
  isNewAuto,
}: {
  product: Product
  isPopular?: boolean
  isNewAuto?: boolean
}) {
  const { add, isInCart } = useCart()

  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] transition-shadow hover:shadow-lg">
      {/* IMAGE CONTAINER */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block"
        style={{ aspectRatio: '3/4' }}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-secondary)]">
            🎁
          </div>
        )}

        {/* BADGES */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {/* AUTO NEW */}
          {(product.isNew || isNewAuto) && (
            <span className="badge badge-primary">New</span>
          )}

          {/* AUTO POPULAR */}
          {isPopular && (
            <span className="rounded bg-black px-2 py-1 text-xs font-medium text-white">
              Popular
            </span>
          )}

          {/* SALE */}
          {product.isSale && product.compareAtPrice && (
            <span className="badge badge-danger">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-300 hover:scale-105 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart size={14} className="text-gray-700" />
        </button>
      </Link>

      {/* HOVER OVERLAY - positioned absolutely over the entire card */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black/70 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="font-semibold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-300 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => add(product)}
            disabled={product.stock === 0}
            className="mt-3 w-full rounded-md bg-white py-2 text-xs font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock === 0
              ? 'Sold Out'
              : isInCart(product.id)
                ? 'Added to Cart'
                : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const now = new Date()

  // NEW = within last 30 days
  const isRecentlyAdded = (date: string) => {
    const created = new Date(date)
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= 30
  }

  // POPULAR = high engagement
  const popularityScore = (p: Product) => p.reviewCount * 0.7 + p.rating * 20

  // SORT
  const sortedByDate = [...mockProducts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const sortedByPopularity = [...mockProducts].sort(
    (a, b) => popularityScore(b) - popularityScore(a)
  )

  // SELECT
  const latest = sortedByDate.slice(0, 2)
  const popular = sortedByPopularity.slice(0, 2)

  const selectedIds = new Set([...latest, ...popular].map((p) => p.id))

  const others = mockProducts
    .filter((p) => !selectedIds.has(p.id))
    .slice(0, 2)

  const finalProducts = [...latest, ...popular, ...others]

  const popularIds = new Set(popular.map((p) => p.id))

  return (
    <section id="products" className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="section-header">
        <div>
          <div className="section-label">Shop</div>
          <h2 className="section-title">Trending Picks</h2>
        </div>

        <Link
          href="/shop"
          className="text-xs uppercase tracking-widest text-[var(--terracotta)] transition hover:opacity-70"
        >
          View all →
        </Link>
      </div>

      {/* PRODUCT GRID - Responsive: 1 on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {finalProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isPopular={popularIds.has(p.id)}
            isNewAuto={isRecentlyAdded(p.createdAt)}
          />
        ))}
      </div>
    </section>
  )
}