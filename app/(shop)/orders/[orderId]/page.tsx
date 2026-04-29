import Link from 'next/link';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered'];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: 'var(--color-secondary)', color: 'var(--color-text-muted)', label: 'Pending' },
  processing: { bg: '#FEF3C7', color: '#D97706', label: 'Processing' },
  shipped:    { bg: '#DBEAFE', color: '#1D4ED8', label: 'Shipped' },
  delivered:  { bg: '#DCFCE7', color: '#16A34A', label: 'Delivered' },
  cancelled:  { bg: '#FEE2E2', color: '#DC2626', label: 'Cancelled' },
};

const MOCK_ORDER = {
  id: 'ORD-001',
  createdAt: '2024-03-15T10:30:00Z',
  status: 'delivered',
  trackingNumber: '1Z999AA1012345678',
  subtotal: 114.98,
  tax: 9.20,
  shipping: 0,
  total: 124.18,
  shippingAddress: {
    firstName: 'Jane', lastName: 'Doe',
    street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US',
  },
  paymentMethod: 'Visa ending in 4242',
  items: [
    { id: '1', name: 'Marvel Legends Iron Man Mark III', sku: 'ML-IM-003', price: 34.99, quantity: 2 },
    { id: '2', name: 'Batman #1 CGC 9.8 Reprint', sku: 'CM-BAT-001', price: 44.99, quantity: 1 },
  ],
};

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = MOCK_ORDER; // In production: fetch by orderId
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/orders" className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{order.id}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Placed {formatDate(order.createdAt)}</p>
        </div>
        <span className="badge" style={{ background: statusStyle.bg, color: statusStyle.color, fontSize: '12px', padding: '5px 12px' }}>
          {statusStyle.label}
        </span>
      </div>

      {/* Progress tracker */}
      {order.status !== 'cancelled' && (
        <div
          className="p-5 rounded-xl mb-6"
          style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center justify-between relative">
            <div
              className="absolute top-4 left-0 right-0 h-1 rounded-full"
              style={{ background: 'var(--color-border)', zIndex: 0 }}
            />
            <div
              className="absolute top-4 left-0 h-1 rounded-full transition-all duration-500"
              style={{
                background: 'var(--color-success)',
                width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
                zIndex: 1,
              }}
            />
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i <= currentStep ? 'var(--color-success)' : 'var(--color-surface-raised)',
                    border: `2px solid ${i <= currentStep ? 'var(--color-success)' : 'var(--color-border)'}`,
                    color: i <= currentStep ? '#fff' : 'var(--color-text-muted)',
                  }}
                >
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span className="text-xs font-medium capitalize" style={{ color: i <= currentStep ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          {order.trackingNumber && (
            <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
              Tracking: <span className="font-mono font-medium" style={{ color: 'var(--color-text)' }}>{order.trackingNumber}</span>
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {/* Shipping address */}
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Shipping Address</h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text)' }}>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{order.shippingAddress.street}</p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
          </p>
        </div>

        {/* Payment */}
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={14} style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Payment</h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text)' }}>{order.paymentMethod}</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-success)' }}>Payment confirmed</p>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl overflow-hidden mb-5" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4" style={{ background: 'var(--color-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Order Items</h3>
        </div>
        {order.items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 py-4"
            style={{
              background: 'var(--color-surface-raised)',
              borderBottom: i < order.items.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{item.name}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                SKU: {item.sku} · Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
        {[
          { label: 'Subtotal', value: formatPrice(order.subtotal) },
          { label: 'Shipping', value: order.shipping === 0 ? 'Free' : formatPrice(order.shipping) },
          { label: 'Tax', value: formatPrice(order.tax) },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm py-1.5">
            <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            <span style={{ color: 'var(--color-text)' }}>{value}</span>
          </div>
        ))}
        <div
          className="flex justify-between font-bold text-base pt-3 mt-2"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <span style={{ color: 'var(--color-text)' }}>Total</span>
          <span style={{ color: 'var(--color-primary)' }}>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
