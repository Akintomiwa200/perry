'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';

export default function CartPage() {
  const { items } = useSelector((s: RootState) => s.cart);

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--deep)', marginBottom: '2rem' }}>
          Your Cart
          {items.length > 0 && (
            <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--mid)', marginLeft: '0.75rem' }}>
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '3.5rem' }}>🛒</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--deep)' }}>Your cart is empty</h2>
            <p style={{ fontSize: '.9rem', color: 'var(--mid)' }}>
              Add some items to get started.
            </p>
            <Link href="/shop" style={{
              background: 'var(--terracotta)', color: '#fff',
              fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
              padding: '1rem 2rem', border: 'none', textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem',
            }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}