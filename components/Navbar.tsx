'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [['Shop', '#categories'], ['New In', '#new'], ['About', '#about'], ['Contact', '#contact']]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 2rem',
        background: scrolled || menuOpen ? 'rgba(253,248,242,.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(192,120,88,.15)' : 'none',
        transition: 'background .4s, box-shadow .4s',
      }}>
        <Link href="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem', fontWeight: 600, letterSpacing: '.04em',
          color: 'var(--deep)', textDecoration: 'none',
        }}>
          Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links-desktop" style={{ gap: '2.4rem', listStyle: 'none' }}>
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href} style={{
                fontSize: '.8rem', letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'var(--deep)', textDecoration: 'none', fontWeight: 400,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--terracotta)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--deep)')}
              >{label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="nav-links-desktop"
            style={{
              fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase',
              background: 'var(--deep)', color: 'var(--cream)',
              border: 'none', padding: '.65rem 1.4rem',
              fontFamily: "'Jost', sans-serif", fontWeight: 400, transition: 'background .3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--deep)')}
          >Shop Now</button>

          {/* Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', padding: '.4rem',
              display: 'flex', flexDirection: 'column', gap: '5px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: 'var(--deep)', borderRadius: 2,
                transition: 'transform .3s, opacity .3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} style={{
        position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(253,248,242,.98)', backdropFilter: 'blur(12px)',
        flexDirection: 'column', padding: '1.5rem 2rem 2rem',
        borderBottom: '1px solid var(--blush)',
        gap: '1.2rem',
      }}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '.85rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--deep)', textDecoration: 'none', fontWeight: 400,
              padding: '.5rem 0', borderBottom: '1px solid var(--blush)',
            }}
          >{label}</a>
        ))}
        <button style={{
          marginTop: '.5rem',
          fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
          background: 'var(--terracotta)', color: '#fff',
          border: 'none', padding: '1rem',
          fontFamily: "'Jost', sans-serif",
        }}>Shop Now</button>
      </div>
    </>
  )
}
