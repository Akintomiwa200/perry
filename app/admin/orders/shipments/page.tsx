import { Truck, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type ShipmentStatus = "in-transit" | "delivered" | "delayed";
type Courier = "DHL" | "GIG Logistics" | "Kwik Delivery" | "GIGL Express";

interface Shipment {
  id: string;
  orderId: string;
  customer: string;
  courier: Courier;
  trackingNo: string;
  destination: string;
  status: ShipmentStatus;
  eta: string;
  shippedDate: string;
}

const SHIPMENTS: Shipment[] = [
  {
    id: "SHP-5041",
    orderId: "ORD-2821",
    customer: "Babatunde Fashola",
    courier: "DHL",
    trackingNo: "DHL-1234567890",
    destination: "Victoria Island, Lagos",
    status: "in-transit",
    eta: "Jun 16, 2025",
    shippedDate: "Jun 14, 2025",
  },
  {
    id: "SHP-5039",
    orderId: "ORD-2814",
    customer: "Yetunde Oluwatobi",
    courier: "GIG Logistics",
    trackingNo: "GIG-988765432",
    destination: "Ikeja GRA, Lagos",
    status: "delivered",
    eta: "Jun 14, 2025",
    shippedDate: "Jun 12, 2025",
  },
  {
    id: "SHP-5037",
    orderId: "ORD-2808",
    customer: "Rotimi Ajayi",
    courier: "Kwik Delivery",
    trackingNo: "KWK-00334411",
    destination: "Garki Area 11, Abuja",
    status: "delayed",
    eta: "Jun 15, 2025",
    shippedDate: "Jun 11, 2025",
  },
  {
    id: "SHP-5035",
    orderId: "ORD-2800",
    customer: "Ifeoma Chukwu",
    courier: "GIGL Express",
    trackingNo: "GIGL-7718820044",
    destination: "New GRA, Port Harcourt",
    status: "in-transit",
    eta: "Jun 17, 2025",
    shippedDate: "Jun 13, 2025",
  },
  {
    id: "SHP-5032",
    orderId: "ORD-2793",
    customer: "Nnenna Okwu",
    courier: "DHL",
    trackingNo: "DHL-9876543210",
    destination: "Independence Layout, Enugu",
    status: "delivered",
    eta: "Jun 13, 2025",
    shippedDate: "Jun 10, 2025",
  },
  {
    id: "SHP-5030",
    orderId: "ORD-2785",
    customer: "Damilola Osei",
    courier: "GIG Logistics",
    trackingNo: "GIG-112233445",
    destination: "Bodija, Ibadan",
    status: "delayed",
    eta: "Jun 14, 2025",
    shippedDate: "Jun 9, 2025",
  },
];

const statusVariantMap: Record<ShipmentStatus, "info" | "success" | "danger"> =
  {
    "in-transit": "info",
    delivered: "success",
    delayed: "danger",
  };

const statusLabelMap: Record<ShipmentStatus, string> = {
  "in-transit": "In Transit",
  delivered: "Delivered",
  delayed: "Delayed",
};

const courierColors: Record<Courier, { bg: string; color: string }> = {
  DHL: { bg: "#FEF3C7", color: "#D97706" },
  "GIG Logistics": { bg: "#DBEAFE", color: "#2563EB" },
  "Kwik Delivery": { bg: "#F3E8FF", color: "#7C3AED" },
  "GIGL Express": { bg: "#DCFCE7", color: "#16A34A" },
};

function StatusIcon({ status }: { status: ShipmentStatus }) {
  if (status === "delivered")
    return <CheckCircle size={13} style={{ color: "var(--color-success)" }} />;
  if (status === "delayed")
    return <AlertTriangle size={13} style={{ color: "var(--color-danger)" }} />;
  return <Truck size={13} style={{ color: "#2563EB" }} />;
}

export default function ShipmentsPage() {
  const inTransit = SHIPMENTS.filter((s) => s.status === "in-transit").length;
  const delivered = SHIPMENTS.filter((s) => s.status === "delivered").length;
  const delayed = SHIPMENTS.filter((s) => s.status === "delayed").length;

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
          Shipments
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Track active shipments and courier status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "In Transit",
            value: inTransit,
            icon: Truck,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Delivered",
            value: delivered,
            icon: CheckCircle,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Delayed",
            value: delayed,
            icon: AlertTriangle,
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
            <div className="rounded-lg p-3 shrink-0" style={{ background: bg }}>
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
                className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-text)" }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delay Alert */}
      {delayed > 0 && (
        <div
          className="flex items-center gap-3 rounded-xl p-4"
          style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
        >
          <AlertTriangle
            size={16}
            style={{ color: "var(--color-danger)", flexShrink: 0 }}
          />
          <p className="text-sm" style={{ color: "#991B1B" }}>
            <strong>
              {delayed} shipment{delayed > 1 ? "s are" : " is"} currently
              delayed
            </strong>{" "}
            — contact the courier and notify the customer as needed.
          </p>
        </div>
      )}

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Shipment ID",
                "Order ID",
                "Customer",
                "Courier",
                "Tracking No.",
                "Destination",
                "Status",
                "ETA",
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
            {SHIPMENTS.map((s, idx) => (
              <tr
                key={s.id}
                style={{
                  background: "var(--color-surface-raised)",
                  borderBottom:
                    idx < SHIPMENTS.length - 1
                      ? "1px solid var(--color-border)"
                      : undefined,
                }}
              >
                <td className="px-5 py-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {s.id}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {s.orderId}
                </td>
                <td
                  className="px-5 py-4 text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.customer}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: courierColors[s.courier].bg,
                      color: courierColors[s.courier].color,
                    }}
                  >
                    {s.courier}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <code
                    className="text-xs font-mono"
                    style={{ color: "var(--color-text)" }}
                  >
                    {s.trackingNo}
                  </code>
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
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {s.destination}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={s.status} />
                    <StatusBadge
                      label={statusLabelMap[s.status]}
                      variant={statusVariantMap[s.status]}
                    />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={12}
                      style={{
                        color:
                          s.status === "delayed"
                            ? "var(--color-danger)"
                            : "var(--color-text-muted)",
                      }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          s.status === "delayed"
                            ? "var(--color-danger)"
                            : "var(--color-text)",
                      }}
                    >
                      {s.eta}
                    </span>
                  </div>
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
        Showing {SHIPMENTS.length} active shipments · Last synced with couriers
        Jun 14, 2025
      </p>
    </div>
  );
}
