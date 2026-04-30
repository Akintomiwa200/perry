import {
  MapPin,
  Package,
  Users,
  Building2,
  PlusCircle,
  BarChart3,
  CheckCircle,
} from "lucide-react";

interface Warehouse {
  id: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  itemsStored: number;
  manager: string;
  managerTitle: string;
  status: "active" | "at-capacity" | "maintenance";
  phone: string;
  categories: string[];
}

const WAREHOUSES: Warehouse[] = [
  {
    id: "WH-001",
    name: "Lagos Main Warehouse",
    location: "Lagos",
    address: "17 Oba Akran Avenue, Ikeja Industrial Estate, Lagos",
    capacity: 5000,
    itemsStored: 3842,
    manager: "Oluwaseun Adeyemi",
    managerTitle: "Warehouse Operations Manager",
    status: "active",
    phone: "+234 802 345 6789",
    categories: ["Bags", "Jewellery", "Accessories", "Beauty"],
  },
  {
    id: "WH-002",
    name: "Abuja Distribution Hub",
    location: "Abuja",
    address: "Plot 44 Idu Industrial Layout, FCT Abuja",
    capacity: 2000,
    itemsStored: 1987,
    manager: "Amina Garba",
    managerTitle: "Hub Supervisor",
    status: "at-capacity",
    phone: "+234 803 987 6543",
    categories: ["Accessories", "Jewellery"],
  },
  {
    id: "WH-003",
    name: "Port Harcourt Depot",
    location: "Port Harcourt",
    address: "5 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State",
    capacity: 1500,
    itemsStored: 620,
    manager: "Chukwudi Okonkwo",
    managerTitle: "Depot Coordinator",
    status: "active",
    phone: "+234 805 112 2334",
    categories: ["Footwear", "Bags"],
  },
];

const statusConfig = {
  active: {
    label: "Active",
    bg: "#DCFCE7",
    color: "var(--color-success)",
    dot: "#16A34A",
  },
  "at-capacity": {
    label: "At Capacity",
    bg: "#FEF3C7",
    color: "var(--color-warning)",
    dot: "#D97706",
  },
  maintenance: {
    label: "Maintenance",
    bg: "#FEE2E2",
    color: "var(--color-danger)",
    dot: "#DC2626",
  },
};

function CapacityBar({
  stored,
  capacity,
}: {
  stored: number;
  capacity: number;
}) {
  const pct = Math.min((stored / capacity) * 100, 100);
  const color =
    pct >= 90
      ? "var(--color-danger)"
      : pct >= 70
        ? "var(--color-warning)"
        : "var(--color-success)";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          Capacity Used
        </span>
        <span className="text-xs font-bold" style={{ color }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "var(--color-secondary)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
        {stored.toLocaleString()} / {capacity.toLocaleString()} items
      </p>
    </div>
  );
}

export default function WarehousesPage() {
  const totalCapacity = WAREHOUSES.reduce((s, w) => s + w.capacity, 0);
  const totalStored = WAREHOUSES.reduce((s, w) => s + w.itemsStored, 0);

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
            Warehouses
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Manage Perry Collectibles storage locations and capacity
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <PlusCircle size={14} />
          Add Warehouse
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Locations",
            value: WAREHOUSES.length,
            icon: Building2,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Total Capacity",
            value: totalCapacity.toLocaleString(),
            icon: BarChart3,
            color: "var(--mid)",
            bg: "var(--color-secondary)",
          },
          {
            label: "Items Stored",
            value: totalStored.toLocaleString(),
            icon: Package,
            color: "var(--color-success)",
            bg: "#DCFCE7",
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

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WAREHOUSES.map((wh) => {
          const status = statusConfig[wh.status];
          return (
            <div
              key={wh.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Card Header */}
              <div
                className="p-5 flex items-start justify-between gap-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-xl p-2.5 shrink-0"
                    style={{ background: "var(--color-secondary)" }}
                  >
                    <Building2 size={20} style={{ color: "var(--mid)" }} />
                  </div>
                  <div>
                    <h2
                      className="text-base font-semibold leading-tight"
                      style={{ color: "var(--color-text)" }}
                    >
                      {wh.name}
                    </h2>
                    <p
                      className="text-xs mt-0.5 font-medium"
                      style={{ color: "var(--mid)" }}
                    >
                      {wh.id}
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                  style={{ background: status.bg, color: status.color }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: status.dot }}
                  />
                  {status.label}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Location */}
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--mid)" }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {wh.address}
                  </p>
                </div>

                {/* Capacity Bar */}
                <CapacityBar stored={wh.itemsStored} capacity={wh.capacity} />

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-lg p-3"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Max Capacity
                    </p>
                    <p
                      className="text-lg font-bold mt-0.5"
                      style={{ color: "var(--color-text)" }}
                    >
                      {wh.capacity.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-3"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Items Stored
                    </p>
                    <p
                      className="text-lg font-bold mt-0.5"
                      style={{ color: "var(--color-text)" }}
                    >
                      {wh.itemsStored.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wide mb-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Handles
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {wh.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: "var(--color-secondary)",
                          color: "var(--color-text)",
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Manager */}
                <div
                  className="flex items-center gap-3 pt-1 mt-auto"
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "16px",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "var(--color-secondary)",
                      color: "var(--mid)",
                    }}
                  >
                    {wh.manager
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--color-text)" }}
                    >
                      {wh.manager}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {wh.managerTitle}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 shrink-0">
                    <CheckCircle
                      size={12}
                      style={{ color: "var(--color-success)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-success)" }}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{
                  borderTop: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Users
                    size={12}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {wh.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "var(--color-secondary)",
                      color: "var(--color-text)",
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "var(--color-primary)",
                      color: "#fff",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
