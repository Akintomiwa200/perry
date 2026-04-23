'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
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
      {/* IMAGE CONTAINER - Always visible */}
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

        {/* BADGES - Always visible */}
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
      </Link>

      {/* HOVER OVERLAY - Shows ALL product info on hover with blur effect */}
      <div className="absolute inset-0 flex flex-col justify-center bg-black/85 p-6 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
        <div className="translate-y-4 transform transition-transform duration-500 group-hover:translate-y-0">
          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="mb-3 text-center text-lg font-bold text-white hover:underline line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Price */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-amber-400">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-300 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="mb-4 flex items-center justify-center gap-1">
              <div className="flex text-amber-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-xs text-gray-300">({product.reviewCount})</span>
            </div>
          )}

          {/* Short Description */}
          {product.description && (
            <p className="mb-4 text-center text-xs text-gray-300 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Stock Status */}
          {product.stock > 0 && product.stock < 10 && (
            <p className="mb-3 text-center text-xs text-amber-400">
              Only {product.stock} left in stock
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Add to Cart Button */}
            <button
              onClick={() => add(product)}
              disabled={product.stock === 0}
              className="flex-1 rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              {product.stock === 0
                ? 'Sold Out'
                : isInCart(product.id)
                ? 'Added ✓'
                : 'Add to Cart'}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                // Add wishlist logic here
              }}
              className="rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/30 flex items-center justify-center gap-2"
              aria-label="Add to wishlist"
            >
              <Heart size={16} />
              <span className="hidden sm:inline">Wishlist</span>
            </button>
          </div>

          {/* View Details Link */}
          <Link href={`/products/${product.slug}`}>
            <p className="mt-3 text-center text-xs text-gray-300 hover:text-white transition-colors">
              View Full Details →
            </p>
          </Link>
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

        {/* PRODUCT GRID - Responsive: 1 on mobile, 2 on tablet, 3 on desktop, 4 on large */}
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