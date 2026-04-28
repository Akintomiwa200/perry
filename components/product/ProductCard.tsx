'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, ArrowLeft, Star, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product.types';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isPopular?: boolean;
  isNewAuto?: boolean;
}

/* ── pastel background palette per category ── */
const bgPalette: Record<string, string> = {
  accessories: '#F3E8FF',
  footwear: '#DBEAFE',
  'wigs-hair': '#FDE8E8',
  beauty: '#FCE7F3',
  handbags: '#FEF3C7',
  clothing: '#E0F2FE',
};

const sizesMap: Record<string, string[]> = {
  footwear: ['36', '37', '38', '39', '40', '41', '42'],
  clothing: ['XS', 'S', 'M', 'L', 'XL'],
};

const defaultColors = [
  { name: 'Black', hex: '#1a1a2e' },
  { name: 'Cream', hex: '#f5f0e8' },
];

export default function ProductCard({ product, isPopular, isNewAuto }: ProductCardProps) {
  const { add, isInCart } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const soldOut = product.stock === 0;
  const inCart = isInCart(product.id);
  const catKey = product.category.toLowerCase().replace(/[\s&]+/g, '-');
  const cardBg = bgPalette[catKey] || '#E8E4F4';
  const sizes = sizesMap[catKey] || null;

  /* lock body scroll on expand */
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  const closeExpanded = useCallback(() => {
    setExpanded(false);
    setSelectedSize(null);
  }, []);

  /* ────────────────────────────────────────────────────────────── */
  /*  CARD VIEW (default)                                          */
  /* ────────────────────────────────────────────────────────────── */
  const cardView = (
    <div
      className="group relative flex flex-col w-full rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#fff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Image ── */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-[4/5] overflow-hidden"
        style={{ background: cardBg }}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl select-none">🎁</span>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {(product.isNew || isNewAuto) && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ background: '#6c5ce7', color: '#fff' }}
            >
              New
            </span>
          )}
          {isPopular && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ background: '#f59e0b', color: '#fff' }}
            >
              Popular
            </span>
          )}
          {product.isSale && product.compareAtPrice && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ background: '#ef4444', color: '#fff' }}
            >
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
          {soldOut && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ background: '#94a3b8', color: '#fff' }}
            >
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(6px)',
            color: wishlisted ? '#ef4444' : '#9ca3af',
          }}
          aria-label="Toggle wishlist"
        >
          <Heart size={15} fill={wishlisted ? '#ef4444' : 'none'} />
        </button>
      </Link>

      {/* ── Body ── */}
      <div className="flex items-end justify-between gap-2 p-4">
        <div className="flex flex-col gap-1 min-w-0">
          <Link href={`/products/${product.slug}`}>
            <h3
              className="text-[15px] font-bold leading-snug truncate"
              style={{ color: '#1a1a2e', fontFamily: "'Jost', sans-serif" }}
            >
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2">
            <span
              className="text-base font-bold"
              style={{ color: product.isSale ? '#ef4444' : '#1a1a2e' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through" style={{ color: '#9ca3af' }}>
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Plus button */}
        <button
          onClick={() => setExpanded(true)}
          disabled={soldOut}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: soldOut ? '#e2e8f0' : '#1a1a2e',
            color: soldOut ? '#94a3b8' : '#fff',
            cursor: soldOut ? 'not-allowed' : 'pointer',
          }}
          aria-label={`Quick view ${product.name}`}
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );

  /* ────────────────────────────────────────────────────────────── */
  /*  EXPANDED VIEW (modal overlay)                                */
  /* ────────────────────────────────────────────────────────────── */
  const expandedView = expanded && (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeExpanded(); }}
    >
      <div
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px]"
        style={{
          background: '#fff',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Image area ── */}
        <div className="relative w-full aspect-square overflow-hidden" style={{ background: cardBg }}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 400px"
              priority
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-7xl select-none">🎁</span>
          )}

          {/* Top buttons */}
          <button
            onClick={closeExpanded}
            className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)' }}
            aria-label="Close"
          >
            <ArrowLeft size={18} style={{ color: '#1a1a2e' }} />
          </button>

          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(6px)',
              color: wishlisted ? '#ef4444' : '#9ca3af',
            }}
            aria-label="Toggle wishlist"
          >
            <Heart size={16} fill={wishlisted ? '#ef4444' : 'none'} />
          </button>
        </div>

        {/* ── Details panel ── */}
        <div className="p-5 pb-6 flex flex-col gap-4">

          {/* Name + price row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2
                className="text-xl font-bold leading-tight"
                style={{ color: '#1a1a2e', fontFamily: "'Jost', sans-serif" }}
              >
                {product.name}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' ')}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span
                className="text-xl font-bold"
                style={{ color: product.isSale ? '#ef4444' : '#1a1a2e' }}
              >
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <p className="text-xs line-through" style={{ color: '#9ca3af' }}>
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'}
                strokeWidth={1.5}
              />
            ))}
            <span className="text-xs ml-1" style={{ color: '#6b7280' }}>
              ( {product.reviewCount} reviews )
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              {product.description}
            </p>
          )}

          {/* Sizes (if applicable) */}
          {sizes && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold transition-all duration-200"
                    style={{
                      border: selectedSize === s ? '2px solid #ef4444' : '1.5px solid #d1d5db',
                      background: selectedSize === s ? '#fef2f2' : '#fff',
                      color: selectedSize === s ? '#ef4444' : '#374151',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          <div className="flex items-center gap-2.5">
            {defaultColors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(i)}
                className="w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center"
                style={{
                  background: c.hex,
                  border: selectedColor === i ? '2.5px solid #6c5ce7' : '2px solid #e5e7eb',
                  boxShadow: selectedColor === i ? '0 0 0 2px #fff, 0 0 0 4px #6c5ce7' : 'none',
                }}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>

          {/* Add to cart */}
          <button
            onClick={() => { add(product); closeExpanded(); }}
            disabled={soldOut}
            className="w-full h-12 rounded-full text-[15px] font-bold tracking-wide transition-all duration-200"
            style={{
              background: soldOut ? '#e2e8f0' : '#1a1a2e',
              color: soldOut ? '#94a3b8' : '#fff',
              cursor: soldOut ? 'not-allowed' : 'pointer',
              marginTop: '4px',
            }}
          >
            {soldOut ? 'Sold Out' : inCart ? 'Already in Cart' : 'Add to cart'}
          </button>
        </div>
      </div>

      {/* animation keyframe */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {cardView}
      {expandedView}
    </>
  );
}