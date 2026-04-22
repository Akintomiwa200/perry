'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const helpLinks = [
  { href: '/help/how-to-order', label: 'How to Order', desc: 'Step-by-step guide to placing your order' },
  { href: '/help/delivery', label: 'Delivery Info', desc: 'Shipping times and areas we cover' },
  { href: '/help/returns', label: 'Returns Policy', desc: 'Our return and exchange policy' },
  { href: '/help/size-guide', label: 'Size Guide', desc: 'Find your perfect fit' },
  { href: '/help/faqs', label: 'FAQs', desc: 'Frequently asked questions' },
]

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', paddingTop: '2rem' }}>
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

        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2.5rem', background: 'var(--light-gold)' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Still need help?</h3>
          <p style={{ color: 'var(--mid)', marginBottom: '1rem' }}>Contact us on WhatsApp or Instagram</p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'var(--terracotta)', color: '#fff', padding: '0.8rem 1.5rem', textDecoration: 'none', fontSize: '.8rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>Contact Us</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}