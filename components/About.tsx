'use client'
export default function About() {
  return (
    <>
      {/* Section 1: Our Story (existing) */}
      <section id="about" className="about-grid" style={{ background: 'var(--deep)' }}>
        <div style={{ padding: 'clamp(3rem,6vw,5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>Our Story</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Designed for the modern Nigerian woman
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(253,248,242,.65)', fontWeight: 300, marginBottom: '2rem' }}>
            Perry Collectibles was born from a passion for making premium fashion accessible to every woman. Located in the heart of Sango Ota, we've been serving our community with the finest accessories, footwear, wigs, and beauty products since 2021.
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
              “Every woman deserves to feel luxurious — without compromise.”
            </p>
            <cite style={{ display: 'block', marginTop: '1rem', fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontStyle: 'normal' }}>
              — Perry Collectibles
            </cite>
          </div>
        </div>
      </section>

      {/* Section 2: Our Mission */}
      <section style={{ padding: 'clamp(5rem,10vw,8rem) clamp(2rem,5vw,4rem)', background: 'var(--cream)', textAlign: 'center' }}>
        <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--deep)', marginBottom: '.6rem', display: 'inline-block' }}>Our Mission</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--deep)', lineHeight: 1.1, marginBottom: '2rem', maxWidth: '40rem', marginInline: 'auto' }}>
          Premium fashion for every woman
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300, maxWidth: '50rem', marginInline: 'auto' }}>
          To empower the modern Nigerian woman with accessible luxury — quality accessories, footwear, wigs, and beauty essentials that celebrate style without compromise.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))', gap: '2rem', marginTop: '4rem', maxWidth: '40rem', marginInline: 'auto' }}>
          {[
            { icon: '✨', label: 'Luxury' },
            { icon: '🇳🇬', label: 'Local' },
            { icon: '🚚', label: 'Accessible' }
          ].map(({ icon, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{icon}</div>
              <div style={{ fontSize: '.85rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--deep)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Our Values */}
      <section style={{ padding: 'clamp(5rem,10vw,8rem) clamp(2rem,5vw,4rem)', background: 'var(--deep)', color: 'var(--cream)' }}>
        <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '3rem', textAlign: 'center' }}>Our Values</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr)', gap: '3rem', maxWidth: '80rem', marginInline: 'auto' }}>
          {[
            { title: 'Quality First', desc: 'Handpicked premium products from trusted sources, ensuring every piece meets our high standards.', icon: '♦️' },
            { title: 'Community', desc: 'Serving Sango Ota and beyond, building lasting relationships with every customer.', icon: '❤️' },
            { title: 'Accessibility', desc: 'Luxury shouldn\\'t break the bank — fair prices, fast delivery across Nigeria.', icon: '🔓' },
            { title: 'Innovation', desc: 'Staying ahead with trending styles in wigs, footwear, and beauty essentials.', icon: '💡' }
          ].map(({ title, desc, icon }) => (
            <div key={title} style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, marginBottom: '1.5rem' }}>{title}</h3>
              <p style={{ fontSize: '.95rem', lineHeight: 1.7, color: 'rgba(253,248,242,.8)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Our Journey */}
      <section style={{ padding: 'clamp(5rem,10vw,8rem) clamp(2rem,5vw,4rem)', background: 'linear-gradient(135deg, var(--terracotta), var(--mid))', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(253,248,242,.05) 20px, rgba(253,248,242,.05) 21px)',
          opacity: 0.5
        }} />
        <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--cream)', marginBottom: '3rem', textAlign: 'center' }}>Our Journey</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', maxWidth: '60rem', marginInline: 'auto', position: 'relative' }}>
          {[
            { year: '2021', event: 'Founded in Sango Ota with passion for accessible luxury.' },
            { year: '2022', event: 'Reached 1K happy customers, expanded product range to 300+ items.' },
            { year: '2023', event: 'Hit 3K+ customers, introduced nationwide delivery.' },
            { year: '2024', event: '500+ products, 4★ rating — growing stronger!' },
            { year: '2025', event: 'Opening physical store + new categories.' }
          ].map(({ year, event }, i) => (
            <div key={year} style={{ 
              display: 'flex', alignItems: 'center', gap: '2rem', width: '100%', 
              flexDirection: i % 2 ? 'row-reverse' : 'row',
              opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease',
              animationDelay: `${i * 0.2}s`
            }} className="journey-item">
              <div style={{ 
                width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--gold)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--deep)'
              }}>
                {year.slice(-2)}
              </div>
              <div style={{ flex: 1, padding: '1.5rem', background: 'rgba(253,248,242,.1)', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '.5rem', color: 'var(--cream)' }}>{year}</h3>
                <p style={{ fontSize: '.95rem', lineHeight: 1.6, color: 'rgba(253,248,242,.9)' }}>{event}</p>
              </div>
            </div>
          ))}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', width: '40%', marginTop: '2rem' }} />
        </div>
      </section>
    </>
  )
}
