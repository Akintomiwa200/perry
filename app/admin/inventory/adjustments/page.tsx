import { PlusCircle, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react";

type AdjustmentType = "addition" | "reduction" | "correction";

interface Adjustment {
  id: string;
  product: string;
  sku: string;
  type: AdjustmentType;
  qty: number;
  reason: string;
  admin: string;
  date: string;
}

const ADJUSTMENTS: Adjustment[] = [
  {
    id: "ADJ-0344",
    product: "Rose Gold Lip Gloss Set",
    sku: "BEA-LPS-022",
    type: "addition",
    qty: 50,
    reason: "New stock received from supplier",
    admin: "Adaeze Mgbemena",
    date: "Jun 14, 2025",
  },
  {
    id: "ADJ-0343",
    product: "Pearl Drop Earrings",
    sku: "JWL-ERG-012",
    type: "reduction",
    qty: -6,
    reason: "Items lost/damaged in transit",
    admin: "Chidi Okoye",
    date: "Jun 13, 2025",
  },
  {
    id: "ADJ-0342",
    product: "Silk Headwrap — Ivory",
    sku: "HAT-SLK-007",
    type: "correction",
    qty: 3,
    reason: "Stock count discrepancy — physical audit",
    admin: "Adaeze Mgbemena",
    date: "Jun 12, 2025",
  },
  {
    id: "ADJ-0341",
    product: "Leather Tote Bag — Caramel",
    sku: "BAG-LTH-001",
    type: "addition",
    qty: 20,
    reason: "New stock received from supplier",
    admin: "Emeka Fashola",
    date: "Jun 11, 2025",
  },
  {
    id: "ADJ-0340",
    product: "Ankara Bucket Hat — Blue",
    sku: "HAT-ANK-003",
    type: "reduction",
    qty: -5,
    reason: "Promotional giveaway — Jun campaign",
    admin: "Chidi Okoye",
    date: "Jun 10, 2025",
  },
  {
    id: "ADJ-0339",
    product: "Gold Bangle Set (3-piece)",
    sku: "JWL-BNG-008",
    type: "correction",
    qty: -2,
    reason: "Items returned but unsellable (damaged)",
    admin: "Emeka Fashola",
    date: "Jun 9, 2025",
  },
];

const typeStyles: Record<
  AdjustmentType,
  { bg: string; color: string; label: string }
> = {
  addition: { bg: "#DCFCE7", color: "var(--color-success)", label: "Addition" },
  reduction: {
    bg: "#FEE2E2",
    color: "var(--color-danger)",
    label: "Reduction",
  },
  correction: { bg: "#DBEAFE", color: "#2563EB", label: "Correction" },
};

function TypeBadge({ type }: { type: AdjustmentType }) {
  const { bg, color, label } = typeStyles[type];
  const Icon =
    type === "addition"
      ? TrendingUp
      : type === "reduction"
        ? TrendingDown
        : RefreshCcw;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: bg, color }}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}

function QtyCell({ qty }: { qty: number }) {
  const isPos = qty > 0;
  return (
    <span
      className="inline-flex items-center gap-1 text-sm font-bold tabular-nums"
      style={{ color: isPos ? "var(--color-success)" : "var(--color-danger)" }}
    >
      {isPos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
      {isPos ? `+${qty}` : qty}
    </span>
  );
}

export default function AdjustmentsPage() {
  const additions = ADJUSTMENTS.filter((a) => a.type === "addition").length;
  const reductions = ADJUSTMENTS.filter((a) => a.type === "reduction").length;
  const corrections = ADJUSTMENTS.filter((a) => a.type === "correction").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1
            className="text-3xl font-semibold mb-1"
            style={{
              color: "var(--deep)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Inventory Adjustments
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Audit log of all manual stock changes
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <PlusCircle size={14} />
          Record Adjustment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Additions",
            value: additions,
            color: "var(--color-success)",
            bg: "#DCFCE7",
            icon: TrendingUp,
          },
          {
            label: "Reductions",
            value: reductions,
            color: "var(--color-danger)",
            bg: "#FEE2E2",
            icon: TrendingDown,
          },
          {
            label: "Corrections",
            value: corrections,
            color: "#2563EB",
            bg: "#DBEAFE",
            icon: RefreshCcw,
          },
        ].map(({ label, value, color, bg, icon: Icon }) => (
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
              <Icon size={16} style={{ color }} />
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
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Adj. ID",
                "Product",
                "SKU",
                "Type",
                "Qty Change",
                "Reason",
                "Admin",
                "Date",
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
            {ADJUSTMENTS.map((adj, idx) => (
              <tr
                key={adj.id}
                style={{
                  background: "var(--color-surface-raised)",
                  borderBottom:
                    idx < ADJUSTMENTS.length - 1
                      ? "1px solid var(--color-border)"
                      : undefined,
                }}
              >
                <td className="px-5 py-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {adj.id}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {adj.product}
                </td>
                <td className="px-5 py-4">
                  <code
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{
                      background: "var(--color-surface)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {adj.sku}
                  </code>
                </td>
                <td className="px-5 py-4">
                  <TypeBadge type={adj.type} />
                </td>
                <td className="px-5 py-4">
                  <QtyCell qty={adj.qty} />
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {adj.reason}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: "var(--color-secondary)",
                        color: "var(--mid)",
                      }}
                    >
                      {adj.admin
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {adj.admin}
                    </span>
                  </div>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {adj.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p
        className="text-xs text-center pb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        Showing {ADJUSTMENTS.length} most recent adjustments · All changes are
        audited and logged
      </p>
    </div>
  );
}
