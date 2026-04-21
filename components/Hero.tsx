'use client'
export default function Hero() {
  return (
    <section className="hero-grid" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) 4rem clamp(1.5rem, 5vw, 5rem)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          fontSize: '.72rem', letterSpacing: '.24em', textTransform: 'uppercase',
          color: 'var(--terracotta)', marginBottom: '1.6rem',
          display: 'flex', alignItems: 'center', gap: '.8rem',
        }}>
          <span style={{ display: 'block', width: '2.5rem', height: '1px', background: 'var(--terracotta)', flexShrink: 0 }} />
          Sango Ota, Nigeria — Est. 2021
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          fontWeight: 300, lineHeight: 1.08, letterSpacing: '-.01em',
          color: 'var(--deep)', marginBottom: '1.5rem',
        }}>
          Fashion that<br />
          <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>speaks</em> your<br />
          beauty
        </h1>

        <p style={{
          fontSize: 'clamp(.85rem, 1.5vw, .92rem)', lineHeight: 1.8, color: 'var(--mid)',
          maxWidth: 420, marginBottom: '2.5rem', fontWeight: 300,
        }}>
          Your one-stop destination for premium ladies fashion accessories, footwear, wigs, and beauty products. Curated for the modern African woman.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            style={{
              background: 'var(--terracotta)', color: '#fff',
              fontFamily: "'Jost', sans-serif", fontSize: '.78rem',
              letterSpacing: '.16em', textTransform: 'uppercase',
              padding: '1rem 2rem', border: 'none', transition: 'background .3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--rose)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--terracotta)')}
          >Explore Collection</button>
          <button
            style={{
              background: 'transparent', border: '1px solid var(--blush)',
              color: 'var(--deep)', fontFamily: "'Jost', sans-serif",
              fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
              padding: '1rem 1.8rem', transition: 'border-color .3s, color .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--terracotta)'; e.currentTarget.style.color = 'var(--terracotta)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--blush)'; e.currentTarget.style.color = 'var(--deep)' }}
          >Our Story</button>
        </div>
      </div>

      {/* RIGHT – hidden on mobile via CSS */}
      <div className="hero-right-panel" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--blush) 0%, var(--light-gold) 60%, var(--blush) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(192,120,88,.22) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212,128,106,.18) 0%, transparent 45%)',
        }} />
        <div style={{
          position: 'absolute', right: '-1rem', bottom: '4rem', zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14rem', fontWeight: 300, lineHeight: 1,
          color: 'rgba(192,120,88,.1)', letterSpacing: '-.04em', pointerEvents: 'none',
        }}>P</div>
        <div className="spin-badge" style={{
          position: 'absolute', top: '5rem', right: '3rem', zIndex: 3,
          width: 90, height: 90,
          border: '1px solid rgba(192,120,88,.4)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}>
          <span style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--terracotta)', lineHeight: 1.4 }}>
            New<br />Arrivals<br />2025
          </span>
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <div className="float-a" style={{
            position: 'absolute', width: '54%', top: '12%', left: '8%',
            borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 60px rgba(42,26,18,.18)',
          }}>
            <div style={{
              width: '100%', aspectRatio: '4/5',
              background: 'linear-gradient(145deg,#c9a96e,#d4806a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem',
            }}>👜</div>
          </div>
          <div className="float-b" style={{
            position: 'absolute', width: '38%', bottom: '14%', right: '6%',
            borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 60px rgba(42,26,18,.18)',
          }}>
            <div style={{
              width: '100%', aspectRatio: '3/4',
              background: 'linear-gradient(145deg,#8a5a42,#c07858)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem',
            }}>👠</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: '3rem', left: '3rem', zIndex: 3,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--deep)', opacity: .7,
        }}>The Perry Edit</div>
      </div>
    </section>
  )
}
