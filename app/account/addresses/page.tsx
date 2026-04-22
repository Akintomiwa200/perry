'use client';
import { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';

const MOCK_ADDRESSES = [
  { id: '1', label: 'Home', firstName: 'Jane', lastName: 'Doe', street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', isDefault: true },
  { id: '2', label: 'Work', firstName: 'Jane', lastName: 'Doe', street: '456 Market St', city: 'San Francisco', state: 'CA', zip: '94105', isDefault: false },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Saved Addresses</h1>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-5 rounded-xl relative"
            style={{
              background: 'var(--color-surface-raised)',
              border: `2px solid ${addr.isDefault ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{addr.label}</span>
                {addr.isDefault && <span className="badge badge-primary" style={{ fontSize: '9px', padding: '2px 7px' }}>Default</span>}
              </div>
              <div className="flex gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded-md" style={{ color: 'var(--color-text-muted)' }} aria-label="Edit address">
                  <Pencil size={13} />
                </button>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-md"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label="Delete address"
                  onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>{addr.firstName} {addr.lastName}</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{addr.street}</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{addr.city}, {addr.state} {addr.zip}</p>
            {!addr.isDefault && (
              <button
                className="mt-3 text-xs font-medium"
                style={{ color: 'var(--color-primary)' }}
                onClick={() => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === addr.id })))}
              >
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
