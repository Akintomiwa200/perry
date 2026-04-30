import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface ReturnRequest {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  reason: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const RETURNS: ReturnRequest[] = [
  {
    id: "RET-0091",
    orderId: "ORD-2790",
    customer: "Blessing Okoye",
    product: "Leather Tote Bag — Caramel",
    reason: "Wrong colour received",
    amount: 28500,
    status: "pending",
    date: "Jun 13, 2025",
  },
  {
    id: "RET-0090",
    orderId: "ORD-2781",
    customer: "Emeka Nwosu",
    product: "Pearl Drop Earrings",
    reason: "Item damaged on arrival",
    amount: 9200,
    status: "approved",
    date: "Jun 12, 2025",
  },
  {
    id: "RET-0088",
    orderId: "ORD-2768",
    customer: "Aisha Abdullahi",
    product: "Silk Headwrap — Ivory",
    reason: "Changed mind / no longer needed",
    amount: 5400,
    status: "rejected",
    date: "Jun 10, 2025",
  },
  {
    id: "RET-0087",
    orderId: "ORD-2754",
    customer: "Kemi Adebayo",
    product: "Gold Bangle Set (3-piece)",
    reason: "Size does not fit",
    amount: 14800,
    status: "pending",
    date: "Jun 9, 2025",
  },
  {
    id: "RET-0085",
    orderId: "ORD-2739",
    customer: "Taiwo Oluwafemi",
    product: "Suede Platform Sandals — Nude",
    reason: "Defective zip on strap",
    amount: 32000,
    status: "approved",
    date: "Jun 7, 2025",
  },
];

const statusVariantMap: Record<
  ReturnRequest["status"],
  "warning" | "success" | "danger"
> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const reasonColors: Record<string, string> = {
  "Wrong colour received": "#DBEAFE",
  "Item damaged on arrival": "#FEE2E2",
  "Changed mind / no longer needed": "var(--color-secondary)",
  "Size does not fit": "#FEF3C7",
  "Defective zip on strap": "#FEE2E2",
};

export default function ReturnsPage() {
  const pendingCount = RETURNS.filter((r) => r.status === "pending").length;
  const approvedCount = RETURNS.filter((r) => r.status === "approved").length;
  const rejectedCount = RETURNS.filter((r) => r.status === "rejected").length;
  const totalRefunded = RETURNS.filter((r) => r.status === "approved").reduce(
    (s, r) => s + r.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-semibold mb-1"
          style={{
            color: "var(--deep)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Returns &amp; Refunds
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Manage return requests and process refunds
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Pending Review",
            value: pendingCount,
            icon: Clock,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
          },
          {
            label: "Approved",
            value: approvedCount,
            icon: CheckCircle,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Rejected",
            value: rejectedCount,
            icon: XCircle,
            color: "var(--color-danger)",
            bg: "#FEE2E2",
          },
          {
            label: "Refunded Total",
            value: `₦${totalRefunded.toLocaleString()}`,
            icon: RotateCcw,
            color: "#2563EB",
            bg: "#DBEAFE",
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
                className="text-lg font-bold mt-0.5"
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
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Return ID",
                "Order ID",
                "Customer",
                "Product",
                "Reason",
                "Amount",
                "Status",
                "Date",
                "Actions",
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
            {RETURNS.map((r, idx) => (
              <tr
                key={r.id}
                style={{
                  background: "var(--color-surface-raised)",
                  borderBottom:
                    idx < RETURNS.length - 1
                      ? "1px solid var(--color-border)"
                      : undefined,
                }}
              >
                <td className="px-5 py-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {r.id}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {r.orderId}
                </td>
                <td
                  className="px-5 py-4 text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {r.customer}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-md"
                    style={{
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                    }}
                  >
                    {r.product}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap"
                    style={{
                      background:
                        reasonColors[r.reason] ?? "var(--color-secondary)",
                      color: "var(--color-text)",
                    }}
                  >
                    {r.reason}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  ₦{r.amount.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={r.status}
                    variant={statusVariantMap[r.status]}
                  />
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {r.date}
                </td>
                <td className="px-5 py-4">
                  {r.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        style={{
                          background: "#DCFCE7",
                          color: "var(--color-success)",
                        }}
                      >
                        <CheckCircle size={11} />
                        Approve
                      </button>
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        style={{
                          background: "#FEE2E2",
                          color: "var(--color-danger)",
                        }}
                      >
                        <XCircle size={11} />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
