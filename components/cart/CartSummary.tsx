"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatNaira } from "@/lib/utils";
import { Tag, X } from "lucide-react";

const FREE_SHIPPING_THRESHOLD_NGN = 15000;

export default function CartSummary() {
  const { subtotal, tax, shipping, total, items } = useSelector(
    (s: RootState) => s.cart,
  );
  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_NGN - subtotal,
  );

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async () => {
    setCouponError(null);
    setCouponSuccess(null);

    if (!couponCode.trim()) {
      setCouponError("Enter a coupon code");
      return;
    }

    setApplying(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), orderTotal: subtotal }),
      });

      const json = await res.json();

      if (!res.ok) {
        setCouponError(json.error ?? "Invalid coupon code");
        return;
      }

      let discountAmount = 0;
      if (json.type === "percent") {
        discountAmount = subtotal * (json.value / 100);
      } else if (json.type === "fixed") {
        discountAmount = json.value;
      } else if (json.type === "free_shipping") {
        discountAmount = shipping;
      }

      setDiscount(discountAmount);
      setAppliedCode(couponCode.trim());
      setCouponSuccess("Coupon applied!");
    } catch {
      setCouponError("Failed to validate coupon. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const handleClearCoupon = () => {
    setCouponCode("");
    setCouponError(null);
    setCouponSuccess(null);
    setDiscount(0);
    setAppliedCode(null);
  };

  const grandTotal = Math.max(0, total - discount);

  return (
    <div
      className="p-6 sticky top-24"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h2
        className="text-lg font-bold mb-5"
        style={{ color: "var(--color-text)" }}
      >
        Order Summary
      </h2>

      {/* Free shipping progress */}
      {freeShippingRemaining > 0 && (
        <div
          className="mb-5 p-3 rounded-lg"
          style={{ background: "var(--color-secondary)" }}
        >
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Add <strong>{formatNaira(freeShippingRemaining)}</strong> more for
            free shipping!
          </p>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--color-border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_NGN) * 100)}%`,
                background: "var(--color-primary)",
              }}
            />
          </div>
        </div>
      )}

      {/* Coupon */}
      <div className="mb-5">
        {appliedCode ? (
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
            style={{
              background: "var(--color-secondary)",
              border: "1px solid var(--color-success)",
            }}
          >
            <div className="flex items-center gap-2">
              <Tag size={13} style={{ color: "var(--color-success)" }} />
              <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                {appliedCode}
              </span>
            </div>
            <button
              onClick={handleClearCoupon}
              aria-label="Remove coupon"
              style={{ color: "var(--color-text-muted)" }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                type="text"
                placeholder="Promo code"
                className="input pl-9 text-sm h-10"
                aria-label="Promo code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              />
            </div>
            <button
              className="btn btn-outline btn-sm px-4"
              onClick={handleApplyCoupon}
              disabled={applying}
            >
              {applying ? "Applying…" : "Apply"}
            </button>
          </div>
        )}

        {couponError && (
          <p
            className="mt-1.5 text-xs"
            style={{ color: "var(--color-error, #e53e3e)" }}
          >
            {couponError}
          </p>
        )}
        {couponSuccess && !appliedCode && (
          <p
            className="mt-1.5 text-xs"
            style={{ color: "var(--color-success)" }}
          >
            {couponSuccess}
          </p>
        )}
        {couponSuccess && appliedCode && (
          <p
            className="mt-1.5 text-xs"
            style={{ color: "var(--color-success)" }}
          >
            {couponSuccess}
          </p>
        )}
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-muted)" }}>
            Subtotal ({items.length} items)
          </span>
          <span style={{ color: "var(--color-text)" }}>
            {formatNaira(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-muted)" }}>Shipping</span>
          <span
            style={{
              color:
                shipping === 0 ? "var(--color-success)" : "var(--color-text)",
            }}
          >
            {shipping === 0 ? "Free" : formatNaira(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-muted)" }}>
            Estimated Tax
          </span>
          <span style={{ color: "var(--color-text)" }}>{formatNaira(tax)}</span>
        </div>

        {/* Discount line */}
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-success)" }}>
              Discount{appliedCode ? ` (${appliedCode})` : ""}
            </span>
            <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
              -{formatNaira(discount)}
            </span>
          </div>
        )}
      </div>

      <div
        className="flex justify-between font-bold text-base py-4"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span style={{ color: "var(--color-text)" }}>Total</span>
        <span style={{ color: "var(--color-primary)" }}>
          {formatNaira(grandTotal)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="btn btn-primary btn-lg w-full mt-2 text-center"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/shop"
        className="btn btn-ghost w-full mt-2 text-center text-sm"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
