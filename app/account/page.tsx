"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  Heart,
  ArrowRight,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { formatNaira, formatDate, getInitials } from "@/lib/utils";

const ROLE_LABELS: Record<
  string,
  { label: string; bg: string; color: string }
> = {
  user: { label: "Customer", bg: "#DBEAFE", color: "#1D4ED8" },
  admin: { label: "Admin", bg: "#FEF3C7", color: "#D97706" },
  super_admin: { label: "Super Admin", bg: "#F3E8FF", color: "#7C3AED" },
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending: { bg: "var(--color-secondary)", color: "var(--color-text-muted)" },
  processing: { bg: "#FEF3C7", color: "#D97706" },
  shipped: { bg: "#DBEAFE", color: "#1D4ED8" },
  delivered: { bg: "#DCFCE7", color: "#16A34A" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626" },
  refunded: { bg: "#F3E8FF", color: "#7C3AED" },
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { orders, isLoading: ordersLoading } = useOrders();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const roleInfo = ROLE_LABELS[user.role] || ROLE_LABELS.user;
  const accountAge = Math.floor(
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
  );
  const recentOrder = orders[0] ?? null;

  const QUICK_LINKS = [
    {
      href: "/account/profile",
      label: "Profile",
      description: "Update your personal details",
      icon: Settings,
      badge: null,
    },
    {
      href: "/orders",
      label: "My Orders",
      description: "Track and manage your orders",
      icon: Package,
      badge: ordersLoading
        ? "…"
        : `${orders.length} order${orders.length !== 1 ? "s" : ""}`,
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      description: "Manage your saved addresses",
      icon: MapPin,
      badge: null,
    },
    {
      href: "/account/wishlist",
      label: "Wishlist",
      description: "Items you've saved for later",
      icon: Heart,
      badge: null,
    },
  ];

  return (
    <div>
      {/* User banner */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl mb-8"
        style={{
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
          style={{ background: "var(--color-primary)", color: "#fff" }}
        >
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {user.firstName} {user.lastName}
            </h1>
            <span
              className="badge text-xs"
              style={{ background: roleInfo.bg, color: roleInfo.color }}
            >
              {roleInfo.label}
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {user.email}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div
          className="p-4 rounded-xl"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="text-xs font-medium mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Total Orders
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {ordersLoading ? "—" : orders.length}
          </p>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="text-xs font-medium mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Total Spent
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {ordersLoading
              ? "—"
              : formatNaira(orders.reduce((sum, o) => sum + o.total, 0))}
          </p>
        </div>
        <div
          className="p-4 rounded-xl col-span-2 sm:col-span-1"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="text-xs font-medium mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Account Age
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {accountAge}d
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {QUICK_LINKS.map(({ href, label, description, icon: Icon, badge }) => (
          <Link
            key={href}
            href={href}
            className="card flex flex-col gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-secondary)" }}
              >
                <Icon size={18} style={{ color: "var(--color-primary)" }} />
              </div>
              <ArrowRight
                size={16}
                style={{ color: "var(--color-text-muted)" }}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--color-text)" }}
              >
                {label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                {description}
              </p>
            </div>
            {badge && (
              <span className="badge badge-secondary self-start">{badge}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Recent order */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Recent Orders
          </h2>
          <Link
            href="/orders"
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            View all →
          </Link>
        </div>

        {ordersLoading ? (
          <div
            className="p-5 rounded-xl animate-pulse"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              height: 72,
            }}
          />
        ) : recentOrder ? (
          <Link
            href={`/orders/${recentOrder.id}`}
            className="p-5 rounded-xl flex items-center justify-between transition-all hover:shadow-md"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-secondary)" }}
              >
                <Package size={16} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {recentOrder.orderNumber}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {formatDate(recentOrder.createdAt)} ·{" "}
                  {formatNaira(recentOrder.total)}
                </p>
              </div>
            </div>
            <span
              className="badge"
              style={{
                background:
                  STATUS_STYLES[recentOrder.status]?.bg ??
                  "var(--color-secondary)",
                color:
                  STATUS_STYLES[recentOrder.status]?.color ??
                  "var(--color-text-muted)",
              }}
            >
              {recentOrder.status.charAt(0).toUpperCase() +
                recentOrder.status.slice(1)}
            </span>
          </Link>
        ) : (
          <div
            className="p-5 rounded-xl text-center text-sm"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            No orders yet.{" "}
            <Link href="/shop" style={{ color: "var(--color-primary)" }}>
              Start shopping →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
