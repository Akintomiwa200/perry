'use client'
const reviews = [
  { text: "Perry Collectibles never disappoints! The quality of their wigs is absolutely top-notch and the customer service is so warm and attentive. My go-to store!", author: 'Adaeze O.', location: 'Lagos, Nigeria', stars: 5 },
  { text: 'Found the most beautiful pair of heels here. Great prices, fast delivery, and everything was packaged so neatly. I will definitely be back for more!', author: 'Fatima B.', location: 'Abuja, Nigeria', stars: 5 },
  { text: "Love the variety they carry — accessories, beauty products, bags, everything in one place. Saved me so much time. Their jewellery collection is stunning!", author: 'Chisom N.', location: 'Ogun State, Nigeria', stars: 4 },
]

export default function Testimonials() {
  return (
    <section className="section-pad" style={{ background: 'linear-gradient(180deg, var(--light-gold) 0%, var(--cream) 100%)' }}>
      <div className="section-header">
        <div>
          <div className="section-label">Reviews</div>
          <h2 className="section-title">What our customers say</h2>
        </div>
      </div>
      <div className="testimonials-grid">
        {reviews.map(r => (
          <div key={r.author} style={{
            background: 'var(--cream)', padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderLeft: '2px solid var(--blush)', position: 'relative',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '5rem', color: 'var(--blush)',
              position: 'absolute', top: '.5rem', left: '1.5rem', lineHeight: 1,
            }}>&ldquo;</div>
            <div style={{ color: 'var(--gold)', fontSize: '.85rem', marginBottom: '.8rem' }}>
              {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
            </div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--mid)', fontStyle: 'italic', marginBottom: '1.5rem', paddingTop: '1.5rem' }}>
              {r.text}
            </p>
            <div style={{ fontWeight: 500, fontSize: '.82rem', color: 'var(--deep)' }}>{r.author}</div>
            <div style={{ fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--terracotta)', marginTop: '.2rem' }}>{r.location}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
