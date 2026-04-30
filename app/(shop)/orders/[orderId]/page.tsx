"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Order } from "@/types/order.types";
import { orderService } from "@/services/orderService";
import { formatNaira, formatDate } from "@/lib/utils";
import type { Address } from "@/types/user.types";

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"];

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  pending: {
    bg: "var(--color-secondary)",
    color: "var(--color-text-muted)",
    label: "Pending",
  },
  processing: { bg: "#FEF3C7", color: "#D97706", label: "Processing" },
  shipped: { bg: "#DBEAFE", color: "#1D4ED8", label: "Shipped" },
  delivered: { bg: "#DCFCE7", color: "#16A34A", label: "Delivered" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "Cancelled" },
  refunded: { bg: "#F3E8FF", color: "#7C3AED", label: "Refunded" },
};

function parseShippingAddress(raw: Address | string): Address {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Address;
    } catch {
      return {} as Address;
    }
  }
  return raw;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { order, isLoading, error, refetch } = useOrderWithRefetch(orderId);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/orders/${orderId}`);
    }
  }, [isAuthenticated, router, orderId]);

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="animate-pulse flex flex-col gap-5">
          <div
            className="h-4 w-24 rounded"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-8 w-48 rounded"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-24 rounded-xl"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-32 rounded-xl"
            style={{ background: "var(--color-border)" }}
          />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <Link
          href="/orders"
          className="flex items-center gap-2 text-sm mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={14} /> Back to Orders
        </Link>
        <div
          className="p-5 rounded-xl text-sm"
          style={{
            background: "#FEE2E2",
            color: "#DC2626",
            border: "1px solid #FECACA",
          }}
        >
          {error || "Order not found."}
        </div>
      </div>
    );
  }

  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
  const currentStep = STATUS_STEPS.indexOf(order.status);
  const shippingAddress = parseShippingAddress(order.shippingAddress);
  const canCancel = order.status === "pending" || order.status === "processing";

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    setCancelError(null);
    try {
      await orderService.cancelOrder(order.id);
      await refetch();
    } catch {
      setCancelError("Failed to cancel order. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link
        href="/orders"
        className="flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {order.orderNumber}
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Placed {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className="badge"
          style={{
            background: statusStyle.bg,
            color: statusStyle.color,
            fontSize: "12px",
            padding: "5px 12px",
          }}
        >
          {statusStyle.label}
        </span>
      </div>

      {/* Progress tracker */}
      {order.status !== "cancelled" && order.status !== "refunded" && (
        <div
          className="p-5 rounded-xl mb-6"
          style={{
            background: "var(--color-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between relative">
            <div
              className="absolute top-4 left-0 right-0 h-1 rounded-full"
              style={{ background: "var(--color-border)", zIndex: 0 }}
            />
            <div
              className="absolute top-4 left-0 h-1 rounded-full transition-all duration-500"
              style={{
                background: "var(--color-success)",
                width:
                  currentStep >= 0
                    ? `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`
                    : "0%",
                zIndex: 1,
              }}
            />
            {STATUS_STEPS.map((step, i) => (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background:
                      i <= currentStep
                        ? "var(--color-success)"
                        : "var(--color-surface-raised)",
                    border: `2px solid ${i <= currentStep ? "var(--color-success)" : "var(--color-border)"}`,
                    color:
                      i <= currentStep ? "#fff" : "var(--color-text-muted)",
                  }}
                >
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <span
                  className="text-xs font-medium capitalize"
                  style={{
                    color:
                      i <= currentStep
                        ? "var(--color-text)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          {order.trackingNumber && (
            <p
              className="text-xs mt-4 text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              Tracking:{" "}
              <span
                className="font-mono font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {order.trackingNumber}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Cancel Order */}
      {canCancel && (
        <div className="mb-6">
          {cancelError && (
            <p className="text-sm mb-2" style={{ color: "#DC2626" }}>
              {cancelError}
            </p>
          )}
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="btn btn-sm flex items-center gap-2"
            style={{
              background: "#FEE2E2",
              color: "#DC2626",
              border: "1px solid #FECACA",
              opacity: cancelling ? 0.7 : 1,
            }}
          >
            <X size={14} />
            {cancelling ? "Cancelling…" : "Cancel Order"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {/* Shipping address */}
        <div
          className="p-5 rounded-xl"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} style={{ color: "var(--color-primary)" }} />
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Shipping Address
            </h3>
          </div>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {shippingAddress.street}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {shippingAddress.city}
            {shippingAddress.state ? `, ${shippingAddress.state}` : ""}{" "}
            {shippingAddress.zip}
          </p>
          {shippingAddress.country && (
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {shippingAddress.country}
            </p>
          )}
        </div>

        {/* Payment */}
        <div
          className="p-5 rounded-xl"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={14} style={{ color: "var(--color-primary)" }} />
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Payment
            </h3>
          </div>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            {order.paymentMethod}
          </p>
          <p
            className="text-sm mt-1"
            style={{
              color:
                order.paymentStatus === "paid"
                  ? "var(--color-success)"
                  : order.paymentStatus === "failed"
                    ? "#DC2626"
                    : "var(--color-text-muted)",
            }}
          >
            {order.paymentStatus === "paid"
              ? "Payment confirmed"
              : order.paymentStatus === "failed"
                ? "Payment failed"
                : order.paymentStatus === "refunded"
                  ? "Payment refunded"
                  : "Payment pending"}
          </p>
        </div>
      </div>

      {/* Items */}
      <div
        className="rounded-xl overflow-hidden mb-5"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <div
          className="px-5 py-4"
          style={{
            background: "var(--color-secondary)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            Order Items
          </h3>
        </div>
        {order.items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 py-4"
            style={{
              background: "var(--color-surface-raised)",
              borderBottom:
                i < order.items.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
            }}
          >
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {item.productName}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                SKU: {item.productSku} · Qty: {item.quantity}
              </p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {formatNaira(item.total)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div
        className="p-5 rounded-xl"
        style={{
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
        }}
      >
        {[
          { label: "Subtotal", value: formatNaira(order.subtotal) },
          {
            label: "Shipping",
            value:
              (order.shippingCost ?? order.shipping) === 0
                ? "Free"
                : formatNaira(order.shippingCost ?? order.shipping),
          },
          { label: "Tax", value: formatNaira(order.tax) },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm py-1.5">
            <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
            <span style={{ color: "var(--color-text)" }}>{value}</span>
          </div>
        ))}
        <div
          className="flex justify-between font-bold text-base pt-3 mt-2"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span style={{ color: "var(--color-text)" }}>Total</span>
          <span style={{ color: "var(--color-primary)" }}>
            {formatNaira(order.total)}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Wraps useOrder and adds a manual refetch by maintaining a local rev counter
 * that triggers the underlying fetch when it changes.
 */
function useOrderWithRefetch(id: string) {
  const [rev, setRev] = useState(0);
  const [order, setOrder] = useState<
    import("@/types/order.types").Order | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    orderService
      .getOrderById(id)
      .then((data) => setOrder(data))
      .catch(() => setError("Order not found"))
      .finally(() => setIsLoading(false));
  }, [id, rev]);

  const refetch = async () => setRev((n) => n + 1);

  return { order, isLoading, error, refetch };
}
