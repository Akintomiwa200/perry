import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface PendingOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  waitHours: number;
}

const PENDING_ORDERS: PendingOrder[] = [
  {
    id: "ORD-2841",
    customer: "Adaeze Okonkwo",
    email: "adaeze.o@gmail.com",
    date: "Jun 14, 2025",
    items: 3,
    total: 47500,
    waitHours: 2,
  },
  {
    id: "ORD-2839",
    customer: "Toluwalope Balogun",
    email: "tolubalogun@yahoo.com",
    date: "Jun 14, 2025",
    items: 1,
    total: 18900,
    waitHours: 4,
  },
  {
    id: "ORD-2836",
    customer: "Chidinma Eze",
    email: "chidi.eze@hotmail.com",
    date: "Jun 13, 2025",
    items: 2,
    total: 34200,
    waitHours: 18,
  },
  {
    id: "ORD-2831",
    customer: "Olumide Adeyemi",
    email: "olumide.a@outlook.com",
    date: "Jun 13, 2025",
    items: 4,
    total: 92000,
    waitHours: 26,
  },
  {
    id: "ORD-2827",
    customer: "Ngozi Obiechina",
    email: "ngozi.obj@gmail.com",
    date: "Jun 12, 2025",
    items: 1,
    total: 12750,
    waitHours: 41,
  },
];

function WaitBadge({ hours }: { hours: number }) {
  const variant = hours > 24 ? "danger" : hours > 12 ? "warning" : "info";
  const label =
    hours < 1
      ? "Just now"
      : hours < 24
        ? `${hours}h ago`
        : `${Math.floor(hours / 24)}d ago`;
  return <StatusBadge label={label} variant={variant} />;
}

export default function PendingOrdersPage() {
  const totalValue = PENDING_ORDERS.reduce((s, o) => s + o.total, 0);
  const urgentCount = PENDING_ORDERS.filter((o) => o.waitHours > 24).length;

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
            Pending Orders
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Orders awaiting approval and processing
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
          style={{
            background: "#FEF3C7",
            color: "var(--color-warning)",
            border: "1px solid #FDE68A",
          }}
        >
          <AlertCircle size={14} />
          {urgentCount} order{urgentCount !== 1 ? "s" : ""} waiting over 24
          hours
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Pending Orders",
            value: PENDING_ORDERS.length.toString(),
            icon: Clock,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Total Value",
            value: `₦${totalValue.toLocaleString()}`,
            icon: CheckCircle,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Urgent (>24h)",
            value: urgentCount.toString(),
            icon: XCircle,
            color: "var(--color-danger)",
            bg: "#FEE2E2",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl p-4"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="rounded-lg p-2.5" style={{ background: bg }}>
              <Icon size={18} style={{ color }} />
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
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Order ID",
                "Customer",
                "Date",
                "Items",
                "Total",
                "Waiting",
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
            {PENDING_ORDERS.map((order, idx) => (
              <tr
                key={order.id}
                style={{
                  background: "var(--color-surface-raised)",
                  borderBottom:
                    idx < PENDING_ORDERS.length - 1
                      ? "1px solid var(--color-border)"
                      : undefined,
                }}
              >
                <td className="px-5 py-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {order.id}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {order.customer}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {order.email}
                  </p>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {order.date}
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {order.items} item{order.items > 1 ? "s" : ""}
                </td>
                <td
                  className="px-5 py-4 text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  ₦{order.total.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <WaitBadge hours={order.waitHours} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{
                        background: "#DCFCE7",
                        color: "var(--color-success)",
                      }}
                    >
                      <CheckCircle size={12} />
                      Approve
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{
                        background: "#FEE2E2",
                        color: "var(--color-danger)",
                      }}
                    >
                      <XCircle size={12} />
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p
        className="text-xs text-center pb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        Showing {PENDING_ORDERS.length} pending orders · Bulk actions available
        via order selection
      </p>
    </div>
  );
}
