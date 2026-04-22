'use client'
import Link from 'next/link'

type FooterLink = {
  label: string
  href?: string
  external?: boolean
}

const shopLinks: FooterLink[] = [
  { label: 'Accessories', href: '/shop?category=accessories' },
  { label: 'Footwear', href: '/shop?category=footwear' },
  { label: 'Wigs & Hair', href: '/shop?category=wigs' },
  { label: 'Beauty', href: '/shop?category=beauty' },
  { label: 'Handbags', href: '/shop?category=handbags' }
]

const helpLinks: FooterLink[] = [
  { label: 'How to Order', href: '/help/how-to-order' },
  { label: 'Delivery Info', href: '/help/delivery' },
  { label: 'Returns Policy', href: '/help/returns' },
  { label: 'Size Guide', href: '/help/size-guide' },
  { label: 'FAQs', href: '/help/faqs' }
]

const contactLinks: FooterLink[] = [
  { label: 'Sango Ota, Ogun State' },
  { label: '@perrycollectibles', href: 'https://www.instagram.com/perrycollectibles', external: true },
  { label: 'DM to Order' },
  { label: 'WhatsApp Us', href: 'https://wa.me/2340000000000', external: true }
]

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: 'var(--deep)',
        color: 'rgba(253,248,242,.7)',
        padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem) 2rem'
      }}
    >
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{
              display: 'block',
              marginBottom: '1rem',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '.04em',
              color: 'var(--cream)',
              textDecoration: 'none'
            }}
          >
            Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
          </Link>

          <p
            style={{
              fontSize: '.84rem',
              lineHeight: 1.8,
              color: 'rgba(253,248,242,.5)',
              marginBottom: '1.5rem'
            }}
          >
            Your one-stop-shop for ladies fashion accessories, footwear, wigs &
            beauty products. Located in Sango Ota, Ogun State.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { label: 'f', href: 'https://www.facebook.com/perrycollectibles' },
              { label: 'ig', href: 'https://www.instagram.com/perrycollectibles' },
              { label: '𝕏', href: 'https://x.com/officialPerryC' }
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(253,248,242,.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(253,248,242,.6)',
                  textDecoration: 'none',
                  fontSize: '.85rem',
                  transition: 'border-color .3s, color .3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--gold)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(253,248,242,.15)'
                  e.currentTarget.style.color = 'rgba(253,248,242,.6)'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <FooterCol title="Shop" links={shopLinks} />
        <FooterCol title="Help" links={helpLinks} />
        <FooterCol title="Contact" links={contactLinks} />
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop: '1px solid rgba(253,248,242,.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <span
          style={{
            fontSize: '.75rem',
            color: 'rgba(253,248,242,.35)'
          }}
        >
          © 2025 Perry Collectibles. All rights reserved.
        </span>

        <a
          href="https://www.instagram.com/perrycollectibles"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '.75rem',
            color: 'var(--terracotta)',
            textDecoration: 'none'
          }}
        >
          @perrycollectibles
        </a>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links
}: {
  title: string
  links: FooterLink[]
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: '.72rem',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '1.4rem'
        }}
      >
        {title}
      </h4>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map(link => (
          <li key={link.label} style={{ marginBottom: '.7rem' }}>
            {link.href ? (
              link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  {link.label}
                </Link>
              )
            ) : (
              <span style={linkStyle}>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Reusable styles + handlers */
const linkStyle: React.CSSProperties = {
  fontSize: '.84rem',
  color: 'rgba(253,248,242,.5)',
  textDecoration: 'none',
  transition: 'color .2s'
}

const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = 'var(--cream)'
}

const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = 'rgba(253,248,242,.5)'
}