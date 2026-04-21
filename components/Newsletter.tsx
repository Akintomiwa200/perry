'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <div style={{
      background: 'var(--terracotta)', padding: '5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '3rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '18rem', fontWeight: 300, color: 'rgba(255,255,255,.07)',
        lineHeight: 1, pointerEvents: 'none',
      }}>PC</div>

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 300, color: '#fff', marginBottom: '.5rem' }}>
          Stay in the loop
        </h3>
        <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.75)' }}>
          Get first access to new arrivals, exclusive deals, and style tips.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '.8rem', flex: 1, maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
          placeholder="Your email address"
          style={{
            flex: 1, padding: '1rem 1.4rem',
            background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)',
            color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '.88rem', outline: 'none',
          }}
        />
        <button
          onClick={handleSubscribe}
          style={{
            background: 'var(--deep)', color: 'var(--gold)',
            border: 'none', padding: '1rem 1.8rem',
            fontFamily: "'Jost', sans-serif", fontSize: '.75rem',
            letterSpacing: '.16em', textTransform: 'uppercase',
            whiteSpace: 'nowrap', transition: 'background .3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1a0d08')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--deep)')}
        >
          {subscribed ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </div>
    </div>
  )
}
