'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
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
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* IMAGE CONTAINER - Clickable to product page */}
      <Link 
        href={`/products/${product.slug}`} 
        className="relative block overflow-hidden"
        style={{ aspectRatio: '3/4' }}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-4xl">🎁</span>
          </div>
        )}

        {/* BADGES */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {(product.isNew || isNewAuto) && (
            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase text-white shadow-md">
              New
            </span>
          )}
          {isPopular && (
            <span className="rounded-full bg-amber-600 px-2.5 py-1 text-xs font-bold uppercase text-white shadow-md">
              Popular
            </span>
          )}
          {product.isSale && product.compareAtPrice && (
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase text-white shadow-md">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault()
            // Add wishlist logic here
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart size={16} className="text-gray-700 hover:text-red-500" />
        </button>
      </Link>

      {/* PRODUCT INFO (Always visible below image) */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-amber-700">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <button
          onClick={() => add(product)}
          disabled={product.stock === 0}
          className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {product.stock === 0
            ? 'Sold Out'
            : isInCart(product.id)
            ? 'Added to Cart ✓'
            : 'Add to Cart'}
        </button>
      </div>

      {/* HOVER OVERLAY WITH BLUR EFFECT */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black/80 p-5 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
        <div className="translate-y-8 transform transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-white">
            {product.name}
          </h3>
          
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl font-bold text-amber-400">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-300 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Link href={`/products/${product.slug}`}>
            <button className="mb-2 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100">
              View Details
            </button>
          </Link>
          
          <button
            onClick={() => add(product)}
            disabled={product.stock === 0}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock === 0
              ? 'Sold Out'
              : isInCart(product.id)
              ? 'Added to Cart ✓'
              : 'Quick Add'}
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
  const popularityScore = (p: Product) =>
    p.reviewCount * 0.7 + p.rating * 20

  // SORT
  const sortedByDate = [...mockProducts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const sortedByPopularity = [...mockProducts].sort(
    (a, b) => popularityScore(b) - popularityScore(a)
  )

  // SELECT - Get 4 products for the grid
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
        {/* SECTION HEADER */}
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

        {/* PRODUCT GRID - Responsive: 1 on mobile, 2 on tablet, 3-4 on desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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