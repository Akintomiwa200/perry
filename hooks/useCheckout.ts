import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart, setShipping } from '@/store/cartSlice';
import { CheckoutSession, ShippingOption } from '@/types/payment.types';
import { Address } from '@/types/user.types';
import { SHIPPING_OPTIONS } from '@/lib/constants';

export type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export function useCheckout() {
  const dispatch = useDispatch();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [session, setSession] = useState<CheckoutSession>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setShippingAddress = (address: Address) => {
    setSession((prev) => ({ ...prev, shippingAddress: address }));
    setStep('payment');
  };

  const selectShippingOption = (option: ShippingOption) => {
    setSession((prev) => ({ ...prev, shippingOption: option }));
    dispatch(setShipping(option.price));
  };

  const placeOrder = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      // In production: call orderService.createOrder(session)
      await new Promise((r) => setTimeout(r, 1500)); // Simulate API call
      dispatch(clearCart());
      setStep('confirmation');
      return { success: true, orderId: `ORD-${Date.now()}` };
    } catch {
      setError('Payment failed. Please try again.');
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    step,
    setStep,
    session,
    shippingOptions: SHIPPING_OPTIONS,
    setShippingAddress,
    selectShippingOption,
    placeOrder,
    isProcessing,
    error,
  };
}
