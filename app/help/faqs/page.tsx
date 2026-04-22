import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'FAQs | Help' };

const faqs = [
  { q: 'How do I place an order?', a: 'Browse our products, add to cart, and checkout. We accept bank transfer, POS, and Flutterwave. DM us on WhatsApp or Instagram to confirm your order.' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer (All banks), POS payment on delivery (Lagos only), Flutterwave online payment.' },
  { q: 'How long does delivery take?', a: 'Lagos: 1-2 days, Other SW states: 2-3 days, Other regions: 3-5 days. Free delivery on orders above ₦50,000.' },
  { q: 'Can I return or exchange an item?', a: 'Yes, within 7 days for unused items with tags attached. Wigs and sale items are final sale. Contact us to initiate a return.' },
  { q: 'Do you do wholesale?', a: 'Yes! We offer wholesale prices for bulk purchasers. DM us on Instagram or WhatsApp for wholesale inquiries.' },
  { q: 'Are your wigs real human hair?', a: 'We offer both human hair and premium synthetic options. Each product description specifies the material.' },
  { q: 'How do I track my order?', a: 'Once shipped, we\'ll send your tracking number via WhatsApp. Track on the courier\'s website.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within Nigeria only.' },
];

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/help" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--terracotta)', textDecoration: 'none', fontSize: '.85rem' }}>
          ← Back to Help Center
        </Link>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--mid)', marginBottom: '2rem' }}>Quick answers to common questions.</p>

          <div style={{ marginBottom: '2rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: '1px solid var(--blush)' }}>
                <summary style={{ padding: '1rem 0', cursor: 'pointer', fontWeight: 500, color: 'var(--deep)', listStyle: 'none' }}>{faq.q}</summary>
                <p style={{ paddingBottom: '1rem', color: 'var(--mid)', lineHeight: 1.7 }}>{faq.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--light-gold)', fontSize: '.9rem', color: 'var(--deep)' }}>
            <strong>Still have questions?</strong> Contact us on WhatsApp or Instagram.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}