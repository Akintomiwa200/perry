'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { mockProducts } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState(mockProducts.slice(0, 2));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        Wishlist <span className="text-base font-normal" style={{ color: 'var(--color-text-muted)' }}>({wishlist.length})</span>
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-3">
          <Heart size={44} style={{ color: 'var(--color-border)' }} />
          <p className="font-medium" style={{ color: 'var(--color-text)' }}>Your wishlist is empty</p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Save items you love while you browse.</p>
          <Link href="/shop" className="btn btn-primary mt-2">Browse Collectibles</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div className="w-16 h-20 relative overflow-hidden" style={{ borderRadius: 'var(--radius-md)', background: 'var(--color-secondary)' }}>
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🎁</div>
                  )}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`}>
                  <p className="text-sm font-semibold line-clamp-2" style={{ color: 'var(--color-text)' }}>{product.name}</p>
                </Link>
                <p className="text-base font-bold mt-1" style={{ color: 'var(--color-text)' }}>{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => dispatch(addToCart({ product }))}
                  className="btn btn-primary btn-sm"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={14} />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
                <button
                  onClick={() => setWishlist((prev) => prev.filter((p) => p.id !== product.id))}
                  className="btn btn-ghost btn-icon btn-sm"
                  aria-label="Remove from wishlist"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
