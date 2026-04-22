'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { CartItem as CartItemType } from '@/types/cart.types';
import { formatPrice } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  const { product, quantity } = item;

  return (
    <div
      className="flex gap-4 py-5"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="shrink-0">
        <div
          className="w-20 h-24 overflow-hidden relative"
          style={{ borderRadius: 'var(--radius-md)', background: 'var(--color-secondary)' }}
        >
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🎁</div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2" style={{ color: 'var(--color-text)' }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>SKU: {product.sku}</p>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div
            className="flex items-center"
            style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
          >
            <button
              onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))}
              className="w-8 h-8 flex items-center justify-center text-base font-medium"
              style={{ color: 'var(--color-text)' }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="w-8 text-center text-sm font-semibold"
              style={{ borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', lineHeight: '32px' }}
            >
              {quantity}
            </span>
            <button
              onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}
              className="w-8 h-8 flex items-center justify-center text-base font-medium"
              style={{ color: 'var(--color-text)' }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
              {formatPrice(product.price * quantity)}
            </span>
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              aria-label={`Remove ${product.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
