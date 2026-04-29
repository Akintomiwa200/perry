import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Activity Log — Perry Admin' };

export default function ActivityLogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Activity Log
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>
          Track all recent activities in your store
        </p>
      </div>

      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Activity log content coming soon...</p>
      </div>
    </div>
  );
}
