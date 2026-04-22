export const metadata = { title: 'Delivery Info | Help' }

export default function DeliveryPage() {
  return (
    <div className="help article">
      <h2>Delivery Information</h2>
      <p className="lead">We deliver across Nigeria. Here&apos;s everything you need to know about shipping.</p>

      <section>
        <h3>Delivery Areas</h3>
        <p>We deliver to all 36 states in Nigeria through our courier partners.</p>
      </section>

      <section>
        <h3>Delivery Times</h3>
        <ul>
          <li><strong>Lagos:</strong> 1-2 business days</li>
          <li><strong>Ogun State:</strong> 1-2 business days</li>
          <li><strong>Other SW states:</strong> 2-3 business days</li>
          <li><strong>Other regions:</strong> 3-5 business days</li>
        </ul>
      </section>

      <section>
        <h3>Delivery Fees</h3>
        <ul>
          <li><strong>Lagos:</strong> ₦1,500</li>
          <li><strong>Other cities:</strong> ₦2,000 - ₦3,000</li>
          <li><strong>Free delivery:</strong> Orders above ₦50,000</li>
        </ul>
      </section>

      <section>
        <h3>Tracking</h3>
        <p>Once your order ships, you&apos;ll receive a tracking number via WhatsApp. Track your package on the courier&apos;s website.</p>
      </section>

      <div className="note">
        <strong>Note:</strong> Delivery times are estimates. Weather delays may occur.
      </div>

      <style jsx>{`
        .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--deep); margin-bottom: 0.5rem; }
        .lead { font-size: 1.1rem; color: var(--mid); margin-bottom: 2rem; }
        section { margin-bottom: 2rem; }
        section h3 { font-size: 1.1rem; color: var(--deep); margin-bottom: 0.75rem; }
        ul { list-style: disc; padding-left: 1.5rem; color: var(--mid); line-height: 2; }
        li strong { color: var(--deep); }
        .note { margin-top: 2rem; padding: 1.5rem; background: var(--light-gold); font-size: 0.9rem; color: var(--deep); }
      `}</style>
    </div>
  )
}