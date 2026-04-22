import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'How to Order | Help' };

export default function HowToOrderPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/help" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--terracotta)', textDecoration: 'none', fontSize: '.85rem' }}>
          ← Back to Help Center
        </Link>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>How to Order</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--mid)', marginBottom: '2rem' }}>Follow these simple steps to place your order at Perry Collectibles.</p>

          <ol style={{ listStyle: 'none', padding: 0 }}>
            {[
              { title: '1. Browse Our Collection', desc: 'Explore our categories or use the search function to find products. Click on any product to view details.' },
              { title: '2. Add to Cart', desc: 'Select your size/variant (if applicable) and click "Add to Cart". You can continue shopping or proceed to checkout.' },
              { title: '3. Review Your Cart', desc: 'Check your items, quantities, and totals. Apply any promo codes if you have one.' },
              { title: '4. Checkout', desc: 'Enter your delivery details. We deliver across Nigeria via courier services.' },
              { title: '5. Confirm & Pay', desc: 'Select payment method (Bank Transfer, POS, or Flutterwave). Once confirmed, you\'ll receive an order confirmation.' },
              { title: '6. Delivery', desc: 'We\'ll process and ship your order within 1-3 business days. Track your package via the tracking number sent.' },
            ].map((step, i) => (
              <li key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--blush)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--mid)', lineHeight: 1.7 }}>{step.desc}</p>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--light-gold)', fontSize: '.9rem', color: 'var(--deep)' }}>
            <strong>Note:</strong> Orders are processed after payment confirmation. For questions, DM us on Instagram or WhatsApp.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}