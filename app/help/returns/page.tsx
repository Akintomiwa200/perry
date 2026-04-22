import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Returns Policy | Help' };

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/help" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--terracotta)', textDecoration: 'none', fontSize: '.85rem' }}>
          ← Back to Help Center
        </Link>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Returns & Exchange Policy</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--mid)', marginBottom: '2rem' }}>We want you to love your purchase. Here&apos;s our return policy.</p>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--deep)', marginBottom: '0.75rem' }}>Eligibility</h3>
            <p style={{ color: 'var(--mid)', marginBottom: '0.5rem' }}>Items can be returned within 7 days of delivery if:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--mid)', lineHeight: 2 }}>
              <li>Item is unused and in original packaging</li>
              <li>Tags are still attached</li>
              <li>Quality issue or wrong item was sent</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--deep)', marginBottom: '0.75rem' }}>Non-Returnable Items</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--mid)', lineHeight: 2 }}>
              <li>Wigs and hair extensions (hygiene)</li>
              <li>Sale items marked &quot;FINAL SALE&quot;</li>
              <li>Items used or damaged by customer</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--deep)', marginBottom: '0.75rem' }}>How to Request a Return</h3>
            <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', color: 'var(--mid)', lineHeight: 2 }}>
              <li>Contact us via WhatsApp with your order number</li>
              <li>Send photos of the issue (if applicable)</li>
              <li>We&apos;ll provide return instructions</li>
              <li>Ship back via our partnered courier</li>
            </ol>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--deep)', marginBottom: '0.75rem' }}>Refunds</h3>
            <p style={{ color: 'var(--mid)' }}>Refunds are processed within 5-7 business days after inspection. Original shipping fee is non-refundable.</p>
          </section>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--light-gold)', fontSize: '.9rem', color: 'var(--deep)' }}>
            <strong>Note:</strong> For quality issues, we cover return shipping. For size/fit changes, customer bears shipping cost.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}