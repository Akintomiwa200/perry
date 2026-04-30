import {
  Zap,
  Plus,
  Clock,
  ShoppingBag,
  TrendingUp,
  Package,
  Calendar,
  Timer,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type FlashSaleStatus = "active" | "scheduled" | "ended";

interface FlashSale {
  name: string;
  description: string;
  discountPct: number;
  productCount: number;
  startTime: string;
  endTime: string;
  timeWindow: string;
  salesMade: number;
  revenue: number;
  status: FlashSaleStatus;
  hoursLeft?: string;
}

const FLASH_SALES: FlashSale[] = [
  {
    name: "Weekend Bag Blitz",
    description:
      "Massive savings on our top leather and canvas tote bags — Lagos stock only.",
    discountPct: 35,
    productCount: 12,
    startTime: "Sat Jun 14 — 8:00 AM",
    endTime: "Sun Jun 15 — 11:59 PM",
    timeWindow: "48 hrs",
    salesMade: 87,
    revenue: 652000,
    status: "active",
    hoursLeft: "9h 42m",
  },
  {
    name: "Jewellery Midnight Drop",
    description:
      "One-night-only prices on crystal chokers, gold bangles, and pearl earrings.",
    discountPct: 50,
    productCount: 8,
    startTime: "Fri Jun 20 — 12:00 AM",
    endTime: "Fri Jun 20 — 11:59 PM",
    timeWindow: "24 hrs",
    salesMade: 0,
    revenue: 0,
    status: "scheduled",
    hoursLeft: undefined,
  },
  {
    name: "Beauty Blowout",
    description:
      "Lip gloss sets, highlighters, and skin glow kits — while stocks last.",
    discountPct: 40,
    productCount: 18,
    startTime: "Wed Jun 4 — 9:00 AM",
    endTime: "Wed Jun 4 — 9:00 PM",
    timeWindow: "12 hrs",
    salesMade: 214,
    revenue: 534000,
    status: "ended",
    hoursLeft: undefined,
  },
  {
    name: "Accessories Super Sunday",
    description:
      "Headwraps, scarves, sunglasses, and statement belts all slashed for one day.",
    discountPct: 30,
    productCount: 24,
    startTime: "Sun Jun 22 — 10:00 AM",
    endTime: "Sun Jun 22 — 10:00 PM",
    timeWindow: "12 hrs",
    salesMade: 0,
    revenue: 0,
    status: "scheduled",
    hoursLeft: undefined,
  },
];

const statusVariant: Record<FlashSaleStatus, "success" | "info" | "neutral"> = {
  active: "success",
  scheduled: "info",
  ended: "neutral",
};

const statusAccents: Record<
  FlashSaleStatus,
  { border: string; headerBg: string }
> = {
  active: { border: "var(--color-success)", headerBg: "#F0FDF4" },
  scheduled: { border: "#2563EB", headerBg: "#EFF6FF" },
  ended: { border: "var(--color-border)", headerBg: "var(--color-surface)" },
};

export default function FlashSalesPage() {
  const active = FLASH_SALES.filter((s) => s.status === "active").length;
  const scheduled = FLASH_SALES.filter((s) => s.status === "scheduled").length;
  const totalRevenue = FLASH_SALES.reduce((acc, s) => acc + s.revenue, 0);
  const totalSales = FLASH_SALES.reduce((acc, s) => acc + s.salesMade, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-semibold mb-1"
            style={{
              color: "var(--deep)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Flash Sales
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Create and manage time-limited promotional sales
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={14} />
          Create Flash Sale
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Active Now",
            value: active,
            icon: Zap,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Scheduled",
            value: scheduled,
            icon: Calendar,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Units Sold",
            value: totalSales,
            icon: ShoppingBag,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
          },
          {
            label: "Revenue",
            value: `₦${(totalRevenue / 1000).toFixed(0)}k`,
            icon: TrendingUp,
            color: "var(--terracotta)",
            bg: "#FEE2E2",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl p-4"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="rounded-lg p-2.5 shrink-0"
              style={{ background: bg }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-wide font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {label}
              </p>
              <p
                className="text-xl font-bold mt-0.5"
                style={{ color: "var(--color-text)" }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Flash Sale Cards */}
      <div className="flex flex-col gap-4">
        {FLASH_SALES.map((sale) => {
          const accent = statusAccents[sale.status];
          return (
            <div
              key={sale.name}
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--color-surface-raised)",
                border: `1px solid var(--color-border)`,
                borderLeft: `4px solid ${accent.border}`,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Card top bar for active sales */}
              {sale.status === "active" && (
                <div
                  className="px-5 py-2 flex items-center justify-between"
                  style={{
                    background: accent.headerBg,
                    borderBottom: "1px solid #DCFCE7",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--color-success)" }}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-success)" }}
                    >
                      Live Now
                    </span>
                  </div>
                  {sale.hoursLeft && (
                    <div className="flex items-center gap-1.5">
                      <Timer
                        size={13}
                        style={{ color: "var(--color-success)" }}
                      />
                      <span
                        className="text-xs font-bold"
                        style={{ color: "var(--color-success)" }}
                      >
                        {sale.hoursLeft} remaining
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Big discount badge */}
                    <div
                      className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 text-center"
                      style={{
                        background:
                          sale.status === "ended"
                            ? "var(--color-secondary)"
                            : "#FEF3C7",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <span
                        className="text-xl font-black leading-none"
                        style={{
                          color:
                            sale.status === "ended"
                              ? "var(--color-text-muted)"
                              : "var(--color-warning)",
                        }}
                      >
                        {sale.discountPct}%
                      </span>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide mt-0.5"
                        style={{
                          color:
                            sale.status === "ended"
                              ? "var(--color-text-muted)"
                              : "var(--color-warning)",
                        }}
                      >
                        OFF
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3
                          className="text-base font-bold"
                          style={{ color: "var(--deep)" }}
                        >
                          {sale.name}
                        </h3>
                        <StatusBadge
                          label={
                            sale.status.charAt(0).toUpperCase() +
                            sale.status.slice(1)
                          }
                          variant={statusVariant[sale.status]}
                        />
                      </div>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {sale.description}
                      </p>

                      {/* Time window */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Clock
                            size={12}
                            style={{ color: "var(--color-text-muted)" }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {sale.startTime}
                          </span>
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: "var(--color-border)" }}
                        >
                          →
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Clock
                            size={12}
                            style={{ color: "var(--color-text-muted)" }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {sale.endTime}
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{
                            background: "#FEF3C7",
                            color: "var(--color-warning)",
                          }}
                        >
                          <Timer size={9} />
                          {sale.timeWindow}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: metrics */}
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-2 shrink-0 sm:w-36">
                    <div
                      className="rounded-lg p-2.5 text-center sm:text-left"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div className="flex items-center gap-1 justify-center sm:justify-start mb-0.5">
                        <Package
                          size={11}
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <span
                          className="text-[10px] uppercase tracking-wide font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Products
                        </span>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {sale.productCount}
                      </p>
                    </div>
                    <div
                      className="rounded-lg p-2.5 text-center sm:text-left"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div className="flex items-center gap-1 justify-center sm:justify-start mb-0.5">
                        <ShoppingBag
                          size={11}
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <span
                          className="text-[10px] uppercase tracking-wide font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Sales
                        </span>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {sale.salesMade > 0 ? sale.salesMade : "—"}
                      </p>
                    </div>
                    <div
                      className="rounded-lg p-2.5 text-center sm:text-left"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div className="flex items-center gap-1 justify-center sm:justify-start mb-0.5">
                        <TrendingUp
                          size={11}
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <span
                          className="text-[10px] uppercase tracking-wide font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Revenue
                        </span>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{
                          color:
                            sale.revenue > 0
                              ? "var(--terracotta)"
                              : "var(--color-text-muted)",
                        }}
                      >
                        {sale.revenue > 0
                          ? `₦${(sale.revenue / 1000).toFixed(0)}k`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
