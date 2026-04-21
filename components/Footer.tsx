'use client'
import Link from 'next/link'

const shopLinks = ['Accessories', 'Footwear', 'Wigs & Hair', 'Beauty', 'Handbags']
const helpLinks = ['How to Order', 'Delivery Info', 'Returns Policy', 'Size Guide', 'FAQs']
const contactLinks = ['Sango Ota, Ogun State', '@perrycollectibles', 'DM to Order', 'WhatsApp Us']

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--deep)', color: 'rgba(253,248,242,.7)', padding: '4rem 5rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{
            display: 'block', marginBottom: '1rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.6rem', fontWeight: 600, letterSpacing: '.04em',
            color: 'var(--cream)', textDecoration: 'none',
          }}>
            Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
          </Link>
          <p style={{ fontSize: '.84rem', lineHeight: 1.8, color: 'rgba(253,248,242,.5)', marginBottom: '1.5rem' }}>
            Your one-stop-shop for ladies fashion accessories, footwear, wigs & beauty products. Located in Sango Ota, Ogun State.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { label: 'f', href: 'https://www.facebook.com/perrycollectibles' },
              { label: 'ig', href: 'https://www.instagram.com/perrycollectibles' },
              { label: '𝕏', href: 'https://x.com/officialPerryC' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                width: 36, height: 36, border: '1px solid rgba(253,248,242,.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(253,248,242,.6)', textDecoration: 'none', fontSize: '.85rem',
                transition: 'border-color .3s, color .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253,248,242,.15)'; e.currentTarget.style.color = 'rgba(253,248,242,.6)' }}
              >{s.label}</a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <FooterCol title="Shop" links={shopLinks} />
        <FooterCol title="Help" links={helpLinks} />
        <FooterCol title="Contact" links={contactLinks} />
      </div>

      <div style={{
        borderTop: '1px solid rgba(253,248,242,.08)', paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '.75rem', color: 'rgba(253,248,242,.35)' }}>© 2025 Perry Collectibles. All rights reserved.</span>
        <a href="https://www.instagram.com/perrycollectibles" target="_blank" rel="noreferrer"
          style={{ fontSize: '.75rem', color: 'var(--terracotta)', textDecoration: 'none' }}>
          @perrycollectibles
        </a>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.4rem' }}>{title}</h4>
      <ul style={{ listStyle: 'none' }}>
        {links.map(l => (
          <li key={l} style={{ marginBottom: '.7rem' }}>
            <a href="#" style={{ fontSize: '.84rem', color: 'rgba(253,248,242,.5)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,242,.5)')}
            >{l}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
