export interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CheckoutSession {
  shippingAddress?: import("./user.types").Address;
  paymentMethod?: PaymentMethod;
  shippingOption?: ShippingOption;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaystackPaymentData {
  email: string;
  amount: number;
  reference: string;
  currency?: string;
}
