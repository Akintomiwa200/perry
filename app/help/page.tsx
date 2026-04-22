'use client'
import Link from 'next/link'

const helpLinks = [
  { href: '/help/how-to-order', label: 'How to Order', desc: 'Step-by-step guide to placing your order' },
  { href: '/help/delivery', label: 'Delivery Info', desc: 'Shipping times and areas we cover' },
  { href: '/help/returns', label: 'Returns Policy', desc: 'Our return and exchange policy' },
  { href: '/help/size-guide', label: 'Size Guide', desc: 'Find your perfect fit' },
  { href: '/help/faqs', label: 'FAQs', desc: 'Frequently asked questions' },
]

export default function HelpPage() {
  return (
    <div className="help-hub">
      <div className="help-grid">
        {helpLinks.map(link => (
          <Link key={link.href} href={link.href} className="help-card">
            <h3>{link.label}</h3>
            <p>{link.desc}</p>
          </Link>
        ))}
      </div>

      <div className="contact-box">
        <h3>Still need help?</h3>
        <p>Contact us on WhatsApp or Instagram</p>
        <Link href="/contact" className="contact-btn">Contact Us</Link>
      </div>

      <style jsx>{`
        .help-hub { padding-top: 2rem; }
        .help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .help-card {
          background: var(--cream); padding: 2rem; border: 1px solid var(--blush);
          text-decoration: none; transition: all 0.3s;
        }
        .help-card:hover { border-color: var(--terracotta); transform: translateY(-2px); }
        .help-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--deep); margin-bottom: 0.5rem; }
        .help-card p { font-size: 0.9rem; color: var(--mid); }
        .contact-box { margin-top: 3rem; text-align: center; padding: 2.5rem; background: var(--light-gold); }
        .contact-box h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--deep); margin-bottom: 0.5rem; }
        .contact-box p { color: var(--mid); margin-bottom: 1rem; }
        .contact-btn { display: inline-block; background: var(--terracotta); color: #fff; padding: 0.8rem 1.5rem; text-decoration: none; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; }
      `}</style>
    </div>
  )
}