'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const helpLinks = [
  { href: '/help/how-to-order', label: 'How to Order', desc: 'Step-by-step guide to placing your order' },
  { href: '/help/delivery', label: 'Delivery Info', desc: 'Shipping times and areas we cover' },
  { href: '/help/returns', label: 'Returns Policy', desc: 'Our return and exchange policy' },
  { href: '/help/size-guide', label: 'Size Guide', desc: 'Find your perfect fit' },
  { href: '/help/faqs', label: 'FAQs', desc: 'Frequently asked questions' },
]

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === '/help'

  return (
    <div className="help-page">
      <section className="help-hero">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
          Help Center
        </h1>
        <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>How can we help you today?</p>
      </section>

      {isHub ? (
        <div className="help-grid">
          {helpLinks.map(link => (
            <Link key={link.href} href={link.href} className="help-card">
              <h3>{link.label}</h3>
              <p>{link.desc}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="help-content">
          <Link href="/help" className="back-link">← Back to Help Center</Link>
          {children}
        </div>
      )}

      <style jsx>{`
        .help-page { padding: 8rem 1.5rem 4rem; max-width: 1000px; margin: 0 auto; }
        .help-hero { text-align: center; margin-bottom: 3rem; }
        .help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .help-card {
          background: var(--cream); padding: 2rem; border: 1px solid var(--blush);
          text-decoration: none; transition: all 0.3s;
        }
        .help-card:hover { border-color: var(--terracotta); transform: translateY(-2px); }
        .help-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--deep); margin-bottom: 0.5rem; }
        .help-card p { font-size: 0.9rem; color: var(--mid); }
        .help-content { background: var(--cream); padding: 2.5rem; border: 1px solid var(--blush); }
        .back-link { display: inline-block; margin-bottom: 1.5rem; color: var(--terracotta); text-decoration: none; font-size: 0.85rem; }
      `}</style>
    </div>
  )
}