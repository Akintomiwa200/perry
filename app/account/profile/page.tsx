'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { getInitials } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? '',
      });
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSave = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      await api.patch('/auth/me', {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? 'Failed to save profile. Please try again.';
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        Profile
      </h1>

      <div className="flex items-center gap-5 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
          aria-label={`Avatar: ${form.firstName} ${form.lastName}`}
        >
          {getInitials(form.firstName || user.firstName, form.lastName || user.lastName)}
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
            {form.firstName || user.firstName} {form.lastName || user.lastName}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {user.email}
          </p>
        </div>
      </div>

      {saved && (
        <div
          className="p-4 rounded-xl mb-5 text-sm"
          style={{
            background: '#DCFCE7',
            color: 'var(--color-success)',
            borderLeft: '4px solid var(--color-success)',
          }}
          role="status"
        >
          Profile saved successfully!
        </div>
      )}

      {saveError && (
        <div
          className="p-4 rounded-xl mb-5 text-sm"
          style={{
            background: '#FEE2E2',
            color: 'var(--color-danger)',
            borderLeft: '4px solid var(--color-danger)',
          }}
          role="alert"
        >
          {saveError}
        </div>
      )}

      <form className="max-w-md space-y-5" onSubmit={handleSave}>
        <Input label="First Name" value={form.firstName} onChange={set('firstName')} />
        <Input label="Last Name" value={form.lastName} onChange={set('lastName')} />
        <Input label="Phone" value={form.phone} onChange={set('phone')} />

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
