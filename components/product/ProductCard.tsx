'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product.types';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add, isInCart } = useCart();

  // 🔥 Auto NEW logic (last 30 days)
  const isRecentlyAdded = (() => {
    if (!product.createdAt) return false;
    const created = new Date(product.createdAt);
    const now = new Date();
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  })();

  const showNew = product.isNew || isRecentlyAdded;

  return (
    <div className="group relative flex flex-col overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-xl transition-all duration-200 hover:shadow-md">

      {/* IMAGE */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full overflow-hidden"
      >
        <div className="aspect-[3/4] w-full bg-[var(--color-secondary)]">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-3xl">
              🎁
            </div>
          )}
        </div>

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="badge bg-purple-600 text-white text-xs px-2 py-0.5">
              Popular
            </span>
          )}

          {showNew && (
            <span className="badge badge-primary text-xs px-2 py-0.5">
              New
            </span>
          )}

          {product.isSale && product.compareAtPrice && (
            <span className="badge badge-danger text-xs px-2 py-0.5">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}

          {product.stock === 0 && (
            <span className="badge text-xs px-2 py-0.5 bg-gray-500 text-white">
              Sold Out
            </span>
          )}

          {product.stock > 0 && product.stock <= 3 && (
            <span className="badge badge-warning text-xs px-2 py-0.5">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* WISHLIST */}
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
          aria-label="Add to wishlist"
        >
          <Heart size={14} className="text-gray-500" />
        </button>
      </Link>

      {/* INFO */}
      <div className="flex flex-col gap-2 p-3 sm:p-4">

        {/* NAME */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 text-[var(--color-text)]">
            {product.name}
          </h3>
        </Link>

        {/* RATING */}
        <div className="flex items-center gap-1">
          <div className="flex text-xs">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(product.rating || 0);
              return (
                <span
                  key={i}
                  className={filled ? 'text-amber-500' : 'text-gray-300'}
                >
                  ★
                </span>
              );
            })}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-semibold text-sm sm:text-base ${
              product.isSale ? 'text-red-600' : 'text-[var(--color-text)]'
            }`}
          >
            {formatPrice(product.price)}
          </span>

          {product.compareAtPrice && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => add(product)}
          disabled={product.stock === 0}
          className="btn btn-primary btn-sm w-full mt-2 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          {product.stock === 0
            ? 'Sold Out'
            : isInCart(product.id)
            ? 'Added'
            : 'Add'}
        </button>
      </div>
    </div>
  );
}