'use client'
export default function AboutStory() {
  return (
    <section id="about" className="about-grid" style={{ background: 'var(--deep)' }}>
      <div style={{ padding: 'clamp(3rem,6vw,5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>Our Story</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Designed for the modern Nigerian woman
        </h2>
        <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(253,248,242,.65)', fontWeight: 300, marginBottom: '2rem' }}>
          Perry Collectibles was born from a passion for making premium fashion accessible to every woman. Located in the heart of Sango Ota, we&apos;ve been serving our community with the finest accessories, footwear, wigs, and beauty products since 2021.
        </p>
        <div className="about-stats" style={{ display: 'flex', gap: '3rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[['3K+', 'Happy Customers'], ['500+', 'Products'], ['4★', 'Avg. Rating']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(253,248,242,.5)', marginTop: '.3rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-right-panel" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, var(--mid), var(--terracotta))' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,169,110,.08) 30px, rgba(201,169,110,.08) 31px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '3rem', right: '3rem', left: '3rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(253,248,242,.15)', lineHeight: 1.15, textAlign: 'right',
        }}>Style.<br />Beauty.<br />You.</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', width: '80%' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.5 }}>
            &ldquo;Every woman deserves to feel luxurious &mdash; without compromise.&rdquo;
          </p>
          <cite style={{ display: 'block', marginTop: '1rem', fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontStyle: 'normal' }}>
            &mdash; Perry Collectibles
          </cite>
        </div>
      </div>
    </section>
  )
}
