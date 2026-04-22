import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { Tag } from 'lucide-react';

export default function CartSummary() {
  const { subtotal, tax, shipping, total, items } = useSelector((s: RootState) => s.cart);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      className="p-6 sticky top-24"
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--color-text)' }}>Order Summary</h2>

      {/* Free shipping progress */}
      {freeShippingRemaining > 0 && (
        <div
          className="mb-5 p-3 rounded-lg"
          style={{ background: 'var(--color-secondary)' }}
        >
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Add <strong>{formatPrice(freeShippingRemaining)}</strong> more for free shipping!
          </p>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--color-border)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                background: 'var(--color-primary)',
              }}
            />
          </div>
        </div>
      )}

      {/* Coupon */}
      <div className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Promo code"
            className="input pl-9 text-sm h-10"
            aria-label="Promo code"
          />
        </div>
        <button className="btn btn-outline btn-sm px-4">Apply</button>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--color-text-muted)' }}>Subtotal ({items.length} items)</span>
          <span style={{ color: 'var(--color-text)' }}>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
          <span style={{ color: shipping === 0 ? 'var(--color-success)' : 'var(--color-text)' }}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--color-text-muted)' }}>Estimated Tax</span>
          <span style={{ color: 'var(--color-text)' }}>{formatPrice(tax)}</span>
        </div>
      </div>

      <div
        className="flex justify-between font-bold text-base py-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <span style={{ color: 'var(--color-text)' }}>Total</span>
        <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
      </div>

      <Link href="/checkout" className="btn btn-primary btn-lg w-full mt-2 text-center">
        Proceed to Checkout
      </Link>

      <Link href="/shop" className="btn btn-ghost w-full mt-2 text-center text-sm">
        Continue Shopping
      </Link>
    </div>
  );
}
