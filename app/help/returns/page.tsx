export const metadata = { title: 'Returns Policy | Help' }

export default function ReturnsPage() {
  return (
    <div className="help article">
      <h2>Returns & Exchange Policy</h2>
      <p className="lead">We want you to love your purchase. Here&apos;s our return policy.</p>

      <section>
        <h3>Eligibility</h3>
        <p>Items can be returned within 7 days of delivery if:</p>
        <ul>
          <li>Item is unused and in original packaging</li>
          <li>Tags are still attached</li>
          <li>Quality issue or wrong item was sent</li>
        </ul>
      </section>

      <section>
        <h3>Non-Returnable Items</h3>
        <ul>
          <li>Wigs and hair extensions (hygiene)</li>
          <li>Sale items marked &quot;FINAL SALE&quot;</li>
          <li>Items used or damaged by customer</li>
        </ul>
      </section>

      <section>
        <h3>How to Request a Return</h3>
        <ol>
          <li>Contact us via WhatsApp with your order number</li>
          <li>Send photos of the issue (if applicable)</li>
          <li>We&apos;ll provide return instructions</li>
          <li>Ship back via our partnered courier</li>
        </ol>
      </section>

      <section>
        <h3>Refunds</h3>
        <p>Refunds are processed within 5-7 business days after inspection. Original shipping fee is non-refundable.</p>
      </section>

      <div className="note">
        <strong>Note:</strong> For quality issues, we cover return shipping. For size/fit changes, customer bears shipping cost.
      </div>

      <style jsx>{`
        .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--deep); margin-bottom: 0.5rem; }
        .lead { font-size: 1.1rem; color: var(--mid); margin-bottom: 2rem; }
        section { margin-bottom: 2rem; }
        section h3 { font-size: 1.1rem; color: var(--deep); margin-bottom: 0.75rem; }
        ul, ol { list-style: disc; padding-left: 1.5rem; color: var(--mid); line-height: 2; }
        li { margin-bottom: 0.25rem; }
        .note { margin-top: 2rem; padding: 1.5rem; background: var(--light-gold); font-size: 0.9rem; color: var(--deep); }
      `}</style>
    </div>
  )
}