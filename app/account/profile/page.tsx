'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import { getInitials } from '@/lib/utils';
import type { Metadata } from 'next';

export default function ProfilePage() {
  const [form, setForm] = useState({ firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '' });
  const [saved, setSaved] = useState(false);
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSave = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Profile</h1>

      <div className="flex items-center gap-5 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
          aria-label={`Avatar: ${form.firstName} ${form.lastName}`}
        >
          {getInitials(form.firstName || 'J', form.lastName || 'D')}
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{form.firstName} {form.lastName}</p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{form.email}</p>
        </div>
      </div>

      {saved && (
        <div
          className="p-4 rounded-xl mb-5 text-sm"
          style={{ background: '#DCFCE7', color: 'var(--color-success)', borderLeft: '4px solid var(--color-success)' }}
          role="status"
        >
          Profile saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" value={form.firstName} onChange={set('firstName')} />
          <Input label="Last Name" value={form.lastName} onChange={set('lastName')} />
        </div>
        <Input label="Email Address" type="email" value={form.email} onChange={set('email')} />
        <Input label="Phone (optional)" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
        <button type="submit" className="btn btn-primary self-start px-8">Save Changes</button>
      </form>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Change Password</h2>
        <div className="flex flex-col gap-4 max-w-lg">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="Min. 8 characters" />
          <Input label="Confirm New Password" type="password" placeholder="Re-enter new password" />
          <button type="button" className="btn btn-outline self-start px-8">Update Password</button>
        </div>
      </div>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--color-danger)' }}>Danger Zone</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>Permanently delete your account and all data.</p>
        <button type="button" className="btn btn-danger btn-sm">Delete Account</button>
      </div>
    </div>
  );
}
