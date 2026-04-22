'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function OrderSummary() {
  const { items, subtotal, tax, shipping, total } = useSelector((s: RootState) => s.cart);

  return (
    <div
      className="p-6"
      style={{
        background: 'var(--color-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-text)' }}>Order Summary</h3>

      <div className="flex flex-col gap-3 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div
              className="w-12 h-14 relative shrink-0 overflow-hidden"
              style={{ borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-raised)' }}
            >
              {item.product.images?.[0] ? (
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">🎁</div>
              )}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white rounded-full"
                style={{ background: 'var(--color-primary)', fontSize: '9px', fontWeight: 700 }}
              >
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text)' }}>{item.product.name}</p>
            </div>
            <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-text)' }}>
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        {[
          { label: 'Subtotal', value: formatPrice(subtotal) },
          { label: 'Shipping', value: shipping === 0 ? 'Free' : formatPrice(shipping) },
          { label: 'Tax', value: formatPrice(tax) },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            <span style={{ color: 'var(--color-text)' }}>{value}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span style={{ color: 'var(--color-text)' }}>Total</span>
          <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
