import api from "@/lib/api";
import { PaymentIntent, PaystackPaymentData } from "@/types/payment.types";
import { Order } from "@/types/order.types";

export const paymentService = {
  // Stripe
  async createPaymentIntent(
    amount: number,
    currency = "usd",
  ): Promise<PaymentIntent> {
    const { data } = await api.post<PaymentIntent>("/payments/intent", {
      amount,
      currency,
    });
    return data;
  },

  async confirmPayment(
    intentId: string,
    paymentMethodId: string,
  ): Promise<{ status: string }> {
    const { data } = await api.post<{ status: string }>(
      `/payments/${intentId}/confirm`,
      { paymentMethodId },
    );
    return data;
  },

  // Paystack
  async initializePaystack(
    paystackData: PaystackPaymentData,
  ): Promise<{ authorizationUrl: string; reference: string }> {
    const { data } = await api.post<{
      authorizationUrl: string;
      reference: string;
    }>("/payments/paystack/initialize", paystackData);
    return data;
  },

  async verifyPaystack(
    reference: string,
  ): Promise<{ status: string; order: Order }> {
    const { data } = await api.get<{ status: string; order: Order }>(
      `/payments/paystack/verify/${reference}`,
    );
    return data;
  },
};
