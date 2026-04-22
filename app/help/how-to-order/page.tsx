export const metadata = { title: 'How to Order | Help' }

export default function HowToOrderPage() {
  return (
    <div className="help article">
      <h2>How to Order</h2>
      <p className="lead">Follow these simple steps to place your order at Perry Collectibles.</p>

      <ol className="steps">
        <li>
          <h3>1. Browse Our Collection</h3>
          <p>Explore our categories or use the search function to find products. Click on any product to view details.</p>
        </li>
        <li>
          <h3>2. Add to Cart</h3>
          <p>Select your size/variant (if applicable) and click &quot;Add to Cart&quot;. You can continue shopping or proceed to checkout.</p>
        </li>
        <li>
          <h3>3. Review Your Cart</h3>
          <p>Check your items, quantities, and totals. Apply any promo codes if you have one.</p>
        </li>
        <li>
          <h3>4. Checkout</h3>
          <p>Enter your delivery details. We deliver across Nigeria via courier services.</p>
        </li>
        <li>
          <h3>5. Confirm & Pay</h3>
          <p>Select payment method (Bank Transfer, POS, or Flutterwave). Once confirmed, you&apos;ll receive an order confirmation.</p>
        </li>
        <li>
          <h3>6. Delivery</h3>
          <p>We&apos;ll process and ship your order within 1-3 business days. Track your package via the tracking number sent.</p>
        </li>
      </ol>

      <div className="note">
        <strong>Note:</strong> Orders are processed after payment confirmation. For questions, DM us on Instagram or WhatsApp.
      </div>

      <style jsx>{`
        .article h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--deep); margin-bottom: 0.5rem; }
        .lead { font-size: 1.1rem; color: var(--mid); margin-bottom: 2rem; }
        .steps { list-style: none; padding: 0; }
        .steps li { padding: 1.5rem 0; border-bottom: 1px solid var(--blush); }
        .steps li:last-child { border-bottom: none; }
        .steps h3 { font-size: 1.1rem; color: var(--deep); margin-bottom: 0.5rem; }
        .steps p { color: var(--mid); line-height: 1.7; }
        .note { margin-top: 2rem; padding: 1.5rem; background: var(--light-gold); font-size: 0.9rem; color: var(--deep); }
      `}</style>
    </div>
  )
}