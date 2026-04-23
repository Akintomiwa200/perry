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
    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]">

      {/* IMAGE */}
      <Link href={`/products/${product.slug}`} className="block relative" style={{ aspectRatio: '3/4' }}>
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-secondary)]">
            🎁
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">

          {/* AUTO NEW */}
          {(product.isNew || isNewAuto) && (
            <span className="badge badge-primary">New</span>
          )}

          {/* AUTO POPULAR */}
          {isPopular && (
            <span className="badge bg-black text-white text-xs px-2 py-1 rounded">
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

        {/* WISHLIST */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <Heart size={14} />
        </button>
      </Link>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
        <div className="translate-y-6 group-hover:translate-y-0 transition flex flex-col gap-2">

          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through text-gray-300">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => add(product)}
            disabled={product.stock === 0}
            className="bg-white text-black text-xs py-2 rounded mt-2"
          >
            {product.stock === 0
              ? 'Sold Out'
              : isInCart(product.id)
              ? 'Added'
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
  const popularityScore = (p: Product) =>
    p.reviewCount * 0.7 + p.rating * 20

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

  const selectedIds = new Set([...latest, ...popular].map(p => p.id))

  const others = mockProducts
    .filter(p => !selectedIds.has(p.id))
    .slice(0, 2)

  const finalProducts = [...latest, ...popular, ...others]

  const popularIds = new Set(popular.map(p => p.id))

  return (
    <section id="products" className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="section-header">
        <div>
          <div className="section-label">Shop</div>
          <h2 className="section-title">Trending Picks</h2>
        </div>

        <Link href="/shop" className="text-xs uppercase tracking-widest text-[var(--terracotta)]">
          View all →
        </Link>
      </div>

      <div className="product-gridhome">
        {finalProducts.map(p => (
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