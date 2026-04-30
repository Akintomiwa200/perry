import { Percent, Plus, BarChart2, TrendingDown, Layers } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type AppliesTo = "Product" | "Category";
type DiscountStatus = "active" | "scheduled" | "ended" | "paused";

interface Discount {
  name: string;
  appliesTo: AppliesTo;
  target: string;
  discountPct: number;
  affected: number;
  startDate: string;
  endDate: string;
  status: DiscountStatus;
}

const DISCOUNTS: Discount[] = [
  {
    name: "Mid-Year Handbag Sale",
    appliesTo: "Category",
    target: "Bags",
    discountPct: 25,
    affected: 38,
    startDate: "Jun 1, 2025",
    endDate: "Jun 30, 2025",
    status: "active",
  },
  {
    name: "New Season Jewellery",
    appliesTo: "Category",
    target: "Jewellery",
    discountPct: 15,
    affected: 54,
    startDate: "Jul 1, 2025",
    endDate: "Jul 20, 2025",
    status: "scheduled",
  },
  {
    name: "Suede Sandal Clearance",
    appliesTo: "Product",
    target: "Suede Platform Sandals — Nude",
    discountPct: 40,
    affected: 1,
    startDate: "May 15, 2025",
    endDate: "May 31, 2025",
    status: "ended",
  },
  {
    name: "Beauty Bonanza",
    appliesTo: "Category",
    target: "Beauty",
    discountPct: 20,
    affected: 29,
    startDate: "Jun 10, 2025",
    endDate: "Jun 25, 2025",
    status: "active",
  },
  {
    name: "Accessories Flash",
    appliesTo: "Category",
    target: "Accessories",
    discountPct: 18,
    affected: 42,
    startDate: "Aug 1, 2025",
    endDate: "Aug 7, 2025",
    status: "scheduled",
  },
];

const statusVariant: Record<
  DiscountStatus,
  "success" | "info" | "neutral" | "danger"
> = {
  active: "success",
  scheduled: "info",
  ended: "neutral",
  paused: "danger",
};

const appliesToColors: Record<AppliesTo, { bg: string; color: string }> = {
  Product: { bg: "#FEF3C7", color: "#D97706" },
  Category: { bg: "#DBEAFE", color: "#1D4ED8" },
};

export default function DiscountsPage() {
  const active = DISCOUNTS.filter((d) => d.status === "active").length;
  const avgPct = Math.round(
    DISCOUNTS.reduce((acc, d) => acc + d.discountPct, 0) / DISCOUNTS.length,
  );
  const totalAffected = DISCOUNTS.reduce((acc, d) => acc + d.affected, 0);

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
            Discounts
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Manage product and category-level discount rules
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={14} />
          Create Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Active Discounts",
            value: active,
            icon: Percent,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Avg Discount %",
            value: `${avgPct}%`,
            icon: BarChart2,
            color: "#7C3AED",
            bg: "#EDE9FE",
          },
          {
            label: "Products Affected",
            value: totalAffected,
            icon: Layers,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
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

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Discount Name",
                "Applies To",
                "Discount",
                "Products Affected",
                "Start — End Date",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISCOUNTS.map((d, idx) => {
              const appStyle = appliesToColors[d.appliesTo];
              return (
                <tr
                  key={d.name}
                  style={{
                    background: "var(--color-surface-raised)",
                    borderBottom:
                      idx < DISCOUNTS.length - 1
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  {/* Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "#FEF3C7" }}
                      >
                        <TrendingDown
                          size={14}
                          style={{ color: "var(--color-warning)" }}
                        />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text)" }}
                      >
                        {d.name}
                      </span>
                    </div>
                  </td>
                  {/* Applies To */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold w-fit"
                        style={{
                          background: appStyle.bg,
                          color: appStyle.color,
                        }}
                      >
                        {d.appliesTo}
                      </span>
                      <span
                        className="text-xs mt-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {d.target}
                      </span>
                    </div>
                  </td>
                  {/* Discount % */}
                  <td className="px-5 py-4">
                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--terracotta)" }}
                    >
                      {d.discountPct}%
                    </span>
                  </td>
                  {/* Affected */}
                  <td
                    className="px-5 py-4 text-sm font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {d.affected} item{d.affected !== 1 ? "s" : ""}
                  </td>
                  {/* Date range */}
                  <td className="px-5 py-4">
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {d.startDate}
                    </span>
                    <span
                      className="mx-2 text-xs"
                      style={{ color: "var(--color-border)" }}
                    >
                      —
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {d.endDate}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={
                        d.status.charAt(0).toUpperCase() + d.status.slice(1)
                      }
                      variant={statusVariant[d.status]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
