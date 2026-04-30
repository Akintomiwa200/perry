import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart, setShipping } from "@/store/cartSlice";
import { useAuth } from "@/hooks/useAuth";

// ── Shipping options in NGN ───────────────────────────────────────────────────

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "3–5 business days",
    price: 1500,
    estimatedDays: "3–5 days",
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "1–2 business days",
    price: 3500,
    estimatedDays: "1–2 days",
  },
  {
    id: "overnight",
    name: "Same Day",
    description: "Order before 12pm",
    price: 5000,
    estimatedDays: "Today",
  },
] as const;

export type ShippingOptionId = (typeof SHIPPING_OPTIONS)[number]["id"];

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type CheckoutStep =
  | "address"
  | "shipping"
  | "payment"
  | "processing"
  | "confirmation";

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if ((window as any).PaystackPop) return resolve();
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.body.appendChild(script);
  });
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector((s: RootState) => s.cart);
  const { user } = useAuth();

  const [step, setStep] = useState<CheckoutStep>("address");
  const [shippingAddress, setShippingAddressState] =
    useState<ShippingAddress | null>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOptionId>("standard");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: save address → advance to shipping step
  const setShippingAddress = (address: ShippingAddress) => {
    setShippingAddressState(address);
    setStep("shipping");
  };

  // Step 2: pick shipping method → update Redux cart shipping cost → advance to payment
  const selectShippingOption = (optId: ShippingOptionId) => {
    const opt = SHIPPING_OPTIONS.find((o) => o.id === optId)!;
    setSelectedShipping(optId);
    dispatch(setShipping(opt.price));
    setStep("payment");
  };

  // Step 3: full payment flow
  const placeOrder = async (): Promise<{
    success: boolean;
    orderId?: string;
  }> => {
    if (!shippingAddress || !user) {
      setError("Missing shipping address or user session.");
      return { success: false };
    }

    setIsProcessing(true);
    setError(null);
    setStep("processing");

    try {
      // 1. Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            price: i.price,
          })),
          shippingAddress,
          shippingOption: selectedShipping,
          paymentMethod: "paystack",
        }),
      });

      if (!orderRes.ok) {
        const e = await orderRes.json().catch(() => ({}));
        throw new Error(e.error || "Failed to create order");
      }

      const { order } = await orderRes.json();
      setOrderId(order.id);
      setOrderNumber(order.order_number ?? order.orderNumber);
      const ref =
        order.order_number ?? order.orderNumber ?? `ORD-${Date.now()}`;
      setPaymentRef(ref);

      // 2. Initialize Paystack
      const initRes = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          amount: Math.round(cart.total * 100), // kobo
          reference: ref,
        }),
      });

      if (!initRes.ok) {
        const e = await initRes.json().catch(() => ({}));
        throw new Error(e.error || "Paystack initialization failed");
      }

      const { authorizationUrl, reference: paystackRef } = await initRes.json();

      // 3. Load Paystack inline script and open popup
      await loadPaystackScript();

      await new Promise<void>((resolve, reject) => {
        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: Math.round(cart.total * 100),
          ref: paystackRef ?? ref,
          currency: "NGN",
          onClose: () => reject(new Error("Payment window closed")),
          callback: (_response: { reference: string }) => resolve(),
        });
        handler.openIframe();
      });

      // 4. Verify payment on our backend
      const verifyRes = await fetch(
        `/api/payments/paystack/verify/${encodeURIComponent(paystackRef ?? ref)}`,
      );
      if (!verifyRes.ok) {
        const e = await verifyRes.json().catch(() => ({}));
        throw new Error(e.error || "Payment verification failed");
      }

      // 5. Clear cart and advance to confirmation
      dispatch(clearCart());
      setStep("confirmation");
      return { success: true, orderId: order.id };
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Payment failed. Please try again.";
      setError(msg);
      // Return to payment step so the user can retry
      setStep("payment");
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    step,
    setStep,
    shippingAddress,
    setShippingAddress,
    selectedShipping,
    selectShippingOption,
    shippingOptions: SHIPPING_OPTIONS,
    placeOrder,
    orderId,
    orderNumber,
    paymentRef,
    isProcessing,
    error,
    // Legacy alias kept for any existing callers
    session: { shippingAddress, shippingOption: selectedShipping },
  };
}
