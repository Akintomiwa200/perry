'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Input from '@/components/ui/Input';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
            Contact Us
          </h1>
          <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { title: 'Email', value: 'hello@perrycollectibles.com', sub: 'We reply within 24 hours' },
              { title: 'Instagram', value: '@perrycollectibles', sub: 'DM us anytime' },
              { title: 'WhatsApp', value: '+234 000 000 0000', sub: 'Mon–Fri, 9am–6pm' },
            ].map(({ title, value, sub }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--light-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  ✉️
                </div>
                <div>
                  <p style={{ fontSize: '.9rem', fontWeight: 500, color: 'var(--deep)' }}>{title}</p>
                  <p style={{ fontSize: '.9rem', color: 'var(--deep)' }}>{value}</p>
                  <p style={{ fontSize: '.75rem', color: 'var(--mid)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ padding: '2.5rem', borderRadius: 8, background: 'var(--cream)', border: '1px solid var(--blush)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Message sent!</h2>
                <p style={{ fontSize: '.9rem', color: 'var(--mid)' }}>
                  Thanks for reaching out, {form.name}. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ padding: '2rem', borderRadius: 8, background: 'var(--cream)', border: '1px solid var(--blush)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <Input label="Your Name" value={form.name} onChange={set('name')} placeholder="Jane Doe" />
                  <Input label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" />
                </div>
                <Input label="Subject" value={form.subject} onChange={set('subject')} placeholder="Order question..." />
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '.75rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 4, border: '1px solid var(--blush)', background: '#fff', fontFamily: 'inherit', fontSize: '.9rem' }}
                  />
                </div>
                <button type="submit" style={{
                  background: 'var(--deep)', color: 'var(--cream)',
                  fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
                  padding: '1rem 2rem', border: 'none', cursor: 'pointer',
                }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
