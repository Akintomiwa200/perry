import { Package, PackageCheck, Truck, Zap, MapPin } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type FulfillmentStatus = "awaiting-pack" | "packed" | "dispatched";
type Priority = "high" | "normal";

interface FulfillmentOrder {
  id: string;
  customer: string;
  items: number;
  itemList: string;
  address: string;
  priority: Priority;
  status: FulfillmentStatus;
  orderedDate: string;
}

const QUEUE: FulfillmentOrder[] = [
  {
    id: "ORD-2843",
    customer: "Folake Adesanya",
    items: 2,
    itemList: "Beaded Clutch × 1, Ankara Bucket Hat × 1",
    address: "14 Awolowo Rd, Ikoyi, Lagos",
    priority: "high",
    status: "awaiting-pack",
    orderedDate: "Jun 14, 2025",
  },
  {
    id: "ORD-2840",
    customer: "Chukwuemeka Obi",
    items: 3,
    itemList: "Leather Belt × 2, Canvas Tote × 1",
    address: "8 Trans-Amadi Rd, Port Harcourt",
    priority: "normal",
    status: "awaiting-pack",
    orderedDate: "Jun 14, 2025",
  },
  {
    id: "ORD-2835",
    customer: "Hajiya Maryam Danladi",
    items: 1,
    itemList: "Crystal Choker Necklace × 1",
    address: "Plot 22 Shehu Shagari Way, Abuja",
    priority: "high",
    status: "packed",
    orderedDate: "Jun 13, 2025",
  },
  {
    id: "ORD-2829",
    customer: "Sade Ogunyemi",
    items: 4,
    itemList: "Lip Gloss Set × 2, Face Serum × 1, Eyeshadow Palette × 1",
    address: "3 Old Bodija Rd, Ibadan",
    priority: "normal",
    status: "packed",
    orderedDate: "Jun 13, 2025",
  },
  {
    id: "ORD-2821",
    customer: "Babatunde Fashola",
    items: 2,
    itemList: "Suede Loafers × 1, Crew Socks × 1",
    address: "6 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    priority: "high",
    status: "dispatched",
    orderedDate: "Jun 12, 2025",
  },
];

const statusVariantMap: Record<
  FulfillmentStatus,
  "warning" | "info" | "success"
> = {
  "awaiting-pack": "warning",
  packed: "info",
  dispatched: "success",
};

const statusLabelMap: Record<FulfillmentStatus, string> = {
  "awaiting-pack": "Awaiting Pack",
  packed: "Packed",
  dispatched: "Dispatched",
};

function PriorityPill({ priority }: { priority: Priority }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
      style={
        priority === "high"
          ? { background: "#FEE2E2", color: "var(--color-danger)" }
          : {
              background: "var(--color-secondary)",
              color: "var(--color-text-muted)",
            }
      }
    >
      {priority === "high" && <Zap size={10} />}
      {priority}
    </span>
  );
}

export default function FulfillmentPage() {
  const awaiting = QUEUE.filter((o) => o.status === "awaiting-pack").length;
  const packed = QUEUE.filter((o) => o.status === "packed").length;
  const dispatched = QUEUE.filter((o) => o.status === "dispatched").length;
  const highPriority = QUEUE.filter((o) => o.priority === "high").length;

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
            Order Fulfillment
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Pack and dispatch orders in the fulfillment queue
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <PackageCheck size={15} />
          Mark Selected as Packed
        </button>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Awaiting Pack",
            value: awaiting,
            icon: Package,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
          },
          {
            label: "Packed",
            value: packed,
            icon: PackageCheck,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Dispatched",
            value: dispatched,
            icon: Truck,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "High Priority",
            value: highPriority,
            icon: Zap,
            color: "var(--color-danger)",
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

      {/* Progress Bar */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            Fulfillment Progress
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {dispatched} of {QUEUE.length} dispatched
          </p>
        </div>
        <div
          className="h-2.5 rounded-full overflow-hidden"
          style={{ background: "var(--color-secondary)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.round((dispatched / QUEUE.length) * 100)}%`,
              background: "var(--color-success)",
            }}
          />
        </div>
        <div className="flex gap-5 mt-3">
          {[
            {
              label: "Awaiting Pack",
              count: awaiting,
              color: "var(--color-warning)",
            },
            { label: "Packed", count: packed, color: "#2563EB" },
            {
              label: "Dispatched",
              count: dispatched,
              color: "var(--color-success)",
            },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {label} ({count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-left border-collapse min-w-[800px]">
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
                "Items",
                "Ship To",
                "Priority",
                "Status",
                "Ordered",
                "Action",
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
            {QUEUE.map((order, idx) => (
              <tr
                key={order.id}
                style={{
                  background: "var(--color-surface-raised)",
                  borderBottom:
                    idx < QUEUE.length - 1
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
                <td
                  className="px-5 py-4 text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {order.customer}
                </td>
                <td className="px-5 py-4">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      color: "var(--color-text-muted)",
                      maxWidth: "200px",
                    }}
                  >
                    {order.itemList}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-start gap-1.5">
                    <MapPin
                      size={12}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--mid)" }}
                    />
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--color-text-muted)",
                        maxWidth: "160px",
                      }}
                    >
                      {order.address}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <PriorityPill priority={order.priority} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={statusLabelMap[order.status]}
                    variant={statusVariantMap[order.status]}
                  />
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {order.orderedDate}
                </td>
                <td className="px-5 py-4">
                  {order.status === "awaiting-pack" && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "#DBEAFE", color: "#2563EB" }}
                    >
                      <PackageCheck size={11} />
                      Mark Packed
                    </button>
                  )}
                  {order.status === "packed" && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: "#DCFCE7",
                        color: "var(--color-success)",
                      }}
                    >
                      <Truck size={11} />
                      Dispatch
                    </button>
                  )}
                  {order.status === "dispatched" && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Dispatched ✓
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
