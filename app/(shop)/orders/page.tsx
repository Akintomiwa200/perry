"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { formatNaira, formatDate } from "@/lib/utils";

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  pending: {
    bg: "var(--color-secondary)",
    color: "var(--color-text-muted)",
    label: "Pending",
  },
  processing: {
    bg: "#FEF3C7",
    color: "var(--color-warning)",
    label: "Processing",
  },
  shipped: { bg: "#DBEAFE", color: "#1D4ED8", label: "Shipped" },
  delivered: {
    bg: "#DCFCE7",
    color: "var(--color-success)",
    label: "Delivered",
  },
  cancelled: {
    bg: "#FEE2E2",
    color: "var(--color-danger)",
    label: "Cancelled",
  },
  refunded: { bg: "#F3E8FF", color: "#7C3AED", label: "Refunded" },
};

function OrderSkeleton() {
  return (
    <div
      className="flex items-center justify-between p-5 animate-pulse"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl"
          style={{ background: "var(--color-border)" }}
        />
        <div className="flex flex-col gap-2">
          <div
            className="h-3 w-28 rounded"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-2.5 w-40 rounded"
            style={{ background: "var(--color-border)" }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="h-5 w-20 rounded-full"
          style={{ background: "var(--color-border)" }}
        />
        <div
          className="h-3 w-16 rounded"
          style={{ background: "var(--color-border)" }}
        />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { orders, isLoading, error } = useOrders();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/orders");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--color-text)" }}
      >
        My Orders
      </h1>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      ) : error ? (
        <div
          className="p-5 rounded-xl text-sm"
          style={{
            background: "#FEE2E2",
            color: "var(--color-danger)",
            border: "1px solid #FECACA",
          }}
        >
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <Package size={48} style={{ color: "var(--color-border)" }} />
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            No orders yet
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Start shopping to see your orders here.
          </p>
          <Link href="/shop" className="btn btn-primary mt-2">
            Browse Collectibles
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
            const itemCount = order.items.length;
            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between p-5 transition-all hover:shadow-md"
                style={{
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--color-secondary)" }}
                  >
                    <Package
                      size={18}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {order.orderNumber}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {formatDate(order.createdAt)} · {itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="badge"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    {formatNaira(order.total)}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
