'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items } = useSelector((s: RootState) => s.cart);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
        Your Cart
        {items.length > 0 && (
          <span className="ml-3 text-base font-normal" style={{ color: 'var(--color-text-muted)' }}>
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <ShoppingBag size={56} style={{ color: 'var(--color-border)' }} />
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Your cart is empty</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Add some collectibles to get started.
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg mt-2">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
