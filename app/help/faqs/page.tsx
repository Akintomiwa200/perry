export const metadata = { title: 'FAQs | Help' }

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our products, add to cart, and checkout. We accept bank transfer, POS, and Flutterwave. DM us on WhatsApp or Instagram to confirm your order.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer (All banks), POS payment on delivery (Lagos only), Flutterwave online payment.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Lagos: 1-2 days, Other SW states: 2-3 days, Other regions: 3-5 days. Free delivery on orders above ₦50,000.'
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes, within 7 days for unused items with tags attached. Wigs and sale items are final sale. Contact us to initiate a return.'
  },
  {
    q: 'Do you do wholesale?',
    a: 'Yes! We offer wholesale prices for bulk purchasers. DM us on Instagram or WhatsApp for wholesale inquiries.'
  },
  {
    q: 'Are your wigs real human hair?',
    a: 'We offer both human hair and premium synthetic options. Each product description specifies the material.'
  },
  {
    q: 'How do I track my order?',
    a: 'Once shipped, we&apos;ll send your tracking number via WhatsApp. Track on the courier&apos;s website.'
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we ship within Nigeria only.'
  },
]

export default function FAQsPage() {
  return (
    <div className="help article">
      <h2>Frequently Asked Questions</h2>
      <p className="lead">Quick answers to common questions.</p>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="note">
        <strong>Still have questions?</strong> Contact us on WhatsApp or Instagram.
      </div>

      <style jsx>{`
        .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--deep); margin-bottom: 0.5rem; }
        .lead { font-size: 1.1rem; color: var(--mid); margin-bottom: 2rem; }
        .faq-list { margin-bottom: 2rem; }
        .faq-item { border-bottom: 1px solid var(--blush); }
        .faq-item summary { padding: 1rem 0; cursor: pointer; font-weight: 500; color: var(--deep); list-style: none; }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] summary { color: var(--terracotta); }
        .faq-item p { padding-bottom: 1rem; color: var(--mid); line-height: 1.7; }
        .note { margin-top: 2rem; padding: 1.5rem; background: var(--light-gold); font-size: 0.9rem; color: var(--deep); }
      `}</style>
    </div>
  )
}