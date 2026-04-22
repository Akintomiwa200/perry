import api from '@/lib/api';
import { PaymentIntent } from '@/types/payment.types';

export const paymentService = {
  async createPaymentIntent(amount: number, currency = 'usd'): Promise<PaymentIntent> {
    const { data } = await api.post('/payments/intent', { amount, currency });
    return data;
  },

  async confirmPayment(intentId: string, paymentMethodId: string): Promise<{ status: string }> {
    const { data } = await api.post(`/payments/${intentId}/confirm`, { paymentMethodId });
    return data;
  },
};
