'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
            Help Center
          </h1>
          <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>How can we help you today?</p>
        </div>

        {isHub ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {helpLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                background: 'var(--cream)', padding: '2rem', border: '1px solid var(--blush)',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>{link.label}</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--mid)' }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ background: 'var(--cream)', padding: '2.5rem', border: '1px solid var(--blush)' }}>
            {children}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}