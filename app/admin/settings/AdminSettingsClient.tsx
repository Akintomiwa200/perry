'use client';

import { useState } from 'react';
import { Store, Palette, Truck, CreditCard, Save, Coffee } from 'lucide-react';

export default function AdminSettingsClient() {
  const [storeName, setStoreName] = useState('Perry Collectibles');
  const [storeEmail, setStoreEmail] = useState('hello@perrycollectibles.com');
  const [currency, setCurrency] = useState('NGN');
  const [freeShipping, setFreeShipping] = useState(75);
  const [taxRate, setTaxRate] = useState(7.5);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Store Settings
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>
          Personalise your store branding, colours, and business preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Forms */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Store Identity */}
          <section
            className="card flex flex-col gap-5"
            style={{ background: 'var(--color-surface-raised)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary)' }}
              >
                <Store size={16} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--deep)' }}>
                Store Identity
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Store Description
              </label>
              <textarea
                rows={3}
                className="input py-3 resize-none"
                defaultValue="Your premier destination for rare and unique collectibles, fashion accessories, and beauty products."
              />
            </div>
          </section>

          {/* Branding & Colours */}
          <section
            className="card flex flex-col gap-5"
            style={{ background: 'var(--color-surface-raised)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary)' }}
              >
                <Palette size={16} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--deep)' }}>
                Branding & Colours
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Primary', value: '#5D4432', var: '--color-primary' },
                { label: 'Terracotta', value: '#c07858', var: '--terracotta' },
                { label: 'Gold', value: '#c9a96e', var: '--gold' },
                { label: 'Deep', value: '#2a1a12', var: '--deep' },
              ].map((c) => (
                <div key={c.label} className="flex flex-col gap-2">
                  <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    {c.label}
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg border"
                      style={{ background: c.value, borderColor: 'var(--color-border)' }}
                    />
                    <code className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {c.value}
                    </code>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'var(--cream)', border: '1px solid var(--blush)' }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--mid)' }}>
                Live Preview
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <Coffee size={18} color="#fff" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--deep)' }}>
                    {storeName}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--mid)' }}>
                    {storeEmail}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Payments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section
              className="card flex flex-col gap-5"
              style={{ background: 'var(--color-surface-raised)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--color-secondary)' }}
                >
                  <Truck size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h2 className="text-base font-semibold" style={{ color: 'var(--deep)' }}>
                  Shipping
                </h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Free Shipping Threshold (₦)
                </label>
                <input
                  type="number"
                  value={freeShipping}
                  onChange={(e) => setFreeShipping(Number(e.target.value))}
                  className="input"
                />
              </div>
            </section>

            <section
              className="card flex flex-col gap-5"
              style={{ background: 'var(--color-surface-raised)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--color-secondary)' }}
                >
                  <CreditCard size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h2 className="text-base font-semibold" style={{ color: 'var(--deep)' }}>
                  Taxes
                </h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="input"
                >
                  <option value="NGN">NGN — Nigerian Naira</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
              </div>
            </section>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              className="btn btn-primary flex items-center gap-2"
              style={{ background: 'var(--deep)', color: 'var(--cream)' }}
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column — Tips */}
        <div className="flex flex-col gap-6">
          <div
            className="card flex flex-col gap-3"
            style={{ background: 'var(--color-surface-raised)' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: 'var(--deep)' }}>
              Personalisation Tips
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs" style={{ color: 'var(--mid)' }}>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--terracotta)' }}>•</span>
                Use your brand colours consistently across all customer touchpoints
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--terracotta)' }}>•</span>
                Upload a high-resolution logo for crisp display on retina screens
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--terracotta)' }}>•</span>
                Set a realistic free-shipping threshold based on average order value
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--terracotta)' }}>•</span>
                Keep your contact email monitored for customer enquiries
              </li>
            </ul>
          </div>

          <div
            className="card flex flex-col gap-3"
            style={{ background: 'var(--cream)', border: '1px solid var(--blush)' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: 'var(--deep)' }}>
              Current Palette
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Primary', color: '#5D4432' },
                { name: 'Cream', color: '#fdf8f2' },
                { name: 'Terracotta', color: '#c07858' },
                { name: 'Deep', color: '#2a1a12' },
                { name: 'Rose', color: '#d4806a' },
                { name: 'Gold', color: '#c9a96e' },
                { name: 'Blush', color: '#e8c4b0' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-md border"
                    style={{ background: c.color, borderColor: 'var(--color-border)' }}
                    title={c.name}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'var(--mid)' }}>
              These colours define the warmth and personality of your Perry Collectibles storefront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}