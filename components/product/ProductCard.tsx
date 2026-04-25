'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product.types';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isPopular?: boolean;
  isNewAuto?: boolean;
}

export default function ProductCard({ product, isPopular, isNewAuto }: ProductCardProps) {
  const { add, isInCart } = useCart();

  const inCart = isInCart(product.id);
  const soldOut = product.stock === 0;

  return (
    <div className="group flex flex-col w-full rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1">

      {/* ── Image area ── */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9c3e8] to-[#e8e4f4] flex items-center justify-center">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <span className="text-5xl select-none">🎁</span>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {(product.isNew || isNewAuto) && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#6c5ce7] text-white">
              New
            </span>
          )}
          {isPopular && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-amber-500 text-white">
              Popular
            </span>
          )}
          {product.isSale && product.compareAtPrice && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-red-500 text-white">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
          {soldOut && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-slate-400 text-white">
              Sold Out
            </span>
          )}
          {!soldOut && product.stock <= 3 && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-amber-500 text-white">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-[34px] h-[34px] flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm text-slate-400 transition-colors duration-200 hover:text-red-500 hover:bg-white cursor-pointer"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[15px] font-semibold leading-snug text-[#1e1b2e]">
            {product.name}
          </h3>
        </Link>

        {/* Tags (first 2 from product.tags) */}
        {product.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded border border-gray-300 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-0.5" aria-label={`Rating: ${product.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-xs ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="text-[11px] text-gray-400 ml-1">({product.reviewCount})</span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}

        {/* ── Footer: price + CTA ── */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-1">

          {/* Pricing */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold tracking-[0.08em] uppercase text-gray-400">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-lg font-bold ${product.isSale ? 'text-red-500' : 'text-[#1e1b2e]'}`}>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => add(product)}
            disabled={soldOut}
            aria-label={`Add ${product.name} to cart`}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold
              whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer
              ${soldOut
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#6c5ce7] text-white hover:bg-[#5a4bd1] hover:scale-[1.03] active:scale-100'
              }
            `}
          >
            <ShoppingCart size={14} />
            {soldOut ? 'Sold Out' : inCart ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}