'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCheckout } from '@/hooks/useCheckout';
import { Check, MapPin, CreditCard, Package } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirmation', label: 'Confirmed', icon: Check },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useSelector((s: RootState) => s.cart);
  const { step, setStep, session, setShippingAddress, placeOrder, isProcessing, error, shippingOptions, selectShippingOption } = useCheckout();
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="text-center py-24">
        <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--color-border)' }} />
        <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No items to checkout</h2>
        <Link href="/shop" className="btn btn-primary mt-4">Shop Now</Link>
      </div>
    );
  }

  const handleShippingSubmit = (formData: Record<string, string>) => {
    const option = shippingOptions.find((o) => o.id === selectedShipping)!;
    selectShippingOption(option);
    setShippingAddress(formData as any);
  };

  const handlePayment = async () => {
    const result = await placeOrder();
    if (result.success) setOrderId(result.orderId!);
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Checkout</h1>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isComplete = i < currentStepIndex;
          const isCurrent = i === currentStepIndex;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
                style={{
                  background: isComplete ? 'var(--color-success)' : isCurrent ? 'var(--color-primary)' : 'var(--color-secondary)',
                  color: isComplete || isCurrent ? '#fff' : 'var(--color-text-muted)',
                  transition: 'all 200ms ease',
                }}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="h-px w-6 sm:w-12" style={{ background: i < currentStepIndex ? 'var(--color-success)' : 'var(--color-border)' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation screen */}
      {step === 'confirmation' && (
        <div className="text-center py-16 flex flex-col items-center gap-4 animate-fade-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-success)' }}
          >
            <Check size={36} color="#fff" />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Order Confirmed!</h2>
          {orderId && (
            <p className="text-sm font-mono px-4 py-2 rounded-md" style={{ background: 'var(--color-secondary)', color: 'var(--color-text)' }}>
              {orderId}
            </p>
          )}
          <p className="text-sm max-w-md" style={{ color: 'var(--color-text-muted)' }}>
            Thanks for your order! You'll receive a confirmation email shortly with tracking information.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="/orders" className="btn btn-outline">View Orders</Link>
            <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      )}

      {step !== 'confirmation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping step */}
            {step === 'shipping' && (
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
              >
                <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--color-text)' }}>Shipping Address</h2>
                <CheckoutForm onSubmit={handleShippingSubmit} />

                {/* Shipping options */}
                <div className="mt-8">
                  <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Shipping Method</h3>
                  <div className="flex flex-col gap-3">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          border: `2px solid ${selectedShipping === opt.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          background: selectedShipping === opt.id ? 'rgba(93,68,50,0.04)' : 'var(--color-surface-raised)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={selectedShipping === opt.id}
                            onChange={() => setSelectedShipping(opt.id)}
                            className="accent-primary"
                          />
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{opt.name}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{opt.estimatedDays}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                          {opt.price === 0 ? 'Free' : `$${opt.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment step */}
            {step === 'payment' && (
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
              >
                <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--color-text)' }}>Payment</h2>

                {error && (
                  <div
                    className="p-4 rounded-xl mb-5 text-sm"
                    style={{ background: '#FEE2E2', color: 'var(--color-danger)', borderLeft: '4px solid var(--color-danger)' }}
                  >
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Card Number</label>
                    <input
                      className="input"
                      placeholder="4242 4242 4242 4242"
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Expiry</label>
                      <input className="input" placeholder="MM / YY" value={cardExp} onChange={(e) => setCardExp(e.target.value)} maxLength={7} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>CVC</label>
                      <input className="input" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} maxLength={4} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('shipping')} className="btn btn-outline flex-1">
                    ← Back
                  </button>
                  <button onClick={handlePayment} disabled={isProcessing} className="btn btn-primary flex-1">
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>🔒</span>
                  <span>Secured with 256-bit SSL encryption</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
}
