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

  return (
    <div className="group relative flex flex-col overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-lg)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <span className="text-4xl select-none">🎁</span>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && <span className="badge badge-primary">New</span>}
          {product.isSale && product.compareAtPrice && (
            <span className="badge badge-danger">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
          {product.stock === 0 && <span className="badge" style={{ background: 'var(--color-text-muted)', color: '#fff' }}>Sold Out</span>}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="badge badge-warning">Only {product.stock} left</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'var(--color-surface-raised)', boxShadow: 'var(--shadow-sm)' }}
          aria-label="Add to wishlist"
        >
          <Heart size={14} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium leading-snug line-clamp-2" style={{ color: 'var(--color-text)' }}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex" aria-label={`Rating: ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xs" style={{ color: i < Math.floor(product.rating) ? '#D97706' : 'var(--color-border)' }}>★</span>
            ))}
          </div>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold" style={{ color: product.isSale ? 'var(--color-danger)' : 'var(--color-text)' }}>
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm line-through" style={{ color: 'var(--color-text-muted)' }}>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <button
          onClick={() => add(product)}
          disabled={product.stock === 0}
          className="btn btn-primary btn-sm w-full mt-1"
          style={{ opacity: product.stock === 0 ? 0.5 : 1 }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={14} />
          {product.stock === 0 ? 'Sold Out' : isInCart(product.id) ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
