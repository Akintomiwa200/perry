'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Input from '@/components/ui/Input';
import { Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

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
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 page-enter">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Contact Us</h1>
        <p className="text-base mb-12" style={{ color: 'var(--color-text-muted)' }}>
          Have a question? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: Mail, title: 'Email', value: 'hello@perrycollectibles.com', sub: 'We reply within 24 hours' },
              { icon: MessageSquare, title: 'Live Chat', value: 'Available on site', sub: 'Mon–Fri, 9am–6pm PT' },
              { icon: Clock, title: 'Response Time', value: '< 24 hours', sub: 'Usually much faster' },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-secondary)' }}>
                  <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{title}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text)' }}>{value}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div
                className="p-8 rounded-2xl text-center flex flex-col items-center gap-4"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
              >
                <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Message sent!</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Thanks for reaching out, {form.name}. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Your Name" value={form.name} onChange={set('name')} placeholder="Jane Doe" required />
                  <Input label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" required />
                </div>
                <Input label="Subject" value={form.subject} onChange={set('subject')} placeholder="Order question, product inquiry..." required />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="input h-auto py-3 resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg self-start px-10">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
