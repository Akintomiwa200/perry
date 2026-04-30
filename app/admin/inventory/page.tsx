import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Warehouse,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

interface InventoryItem {
  product: string;
  sku: string;
  category: string;
  stock: number;
  reorderLevel: number;
  warehouse: string;
  lastUpdated: string;
}

const INVENTORY: InventoryItem[] = [
  {
    product: "Leather Tote Bag — Caramel",
    sku: "BAG-LTH-001",
    category: "Bags",
    stock: 42,
    reorderLevel: 10,
    warehouse: "Lagos (Main)",
    lastUpdated: "Jun 14, 2025",
  },
  {
    product: "Crystal Choker Necklace",
    sku: "JWL-CHK-004",
    category: "Jewellery",
    stock: 7,
    reorderLevel: 15,
    warehouse: "Lagos (Main)",
    lastUpdated: "Jun 13, 2025",
  },
  {
    product: "Ankara Bucket Hat — Blue",
    sku: "HAT-ANK-003",
    category: "Accessories",
    stock: 0,
    reorderLevel: 20,
    warehouse: "Abuja Hub",
    lastUpdated: "Jun 11, 2025",
  },
  {
    product: "Silk Headwrap — Ivory",
    sku: "HAT-SLK-007",
    category: "Accessories",
    stock: 28,
    reorderLevel: 10,
    warehouse: "Lagos (Main)",
    lastUpdated: "Jun 14, 2025",
  },
  {
    product: "Pearl Drop Earrings",
    sku: "JWL-ERG-012",
    category: "Jewellery",
    stock: 4,
    reorderLevel: 10,
    warehouse: "Lagos (Main)",
    lastUpdated: "Jun 10, 2025",
  },
  {
    product: "Suede Platform Sandals — Nude",
    sku: "SHO-SDE-019",
    category: "Footwear",
    stock: 11,
    reorderLevel: 8,
    warehouse: "PH Depot",
    lastUpdated: "Jun 12, 2025",
  },
  {
    product: "Rose Gold Lip Gloss Set",
    sku: "BEA-LPS-022",
    category: "Beauty",
    stock: 65,
    reorderLevel: 20,
    warehouse: "Lagos (Main)",
    lastUpdated: "Jun 14, 2025",
  },
  {
    product: "Gold Bangle Set (3-piece)",
    sku: "JWL-BNG-008",
    category: "Jewellery",
    stock: 0,
    reorderLevel: 12,
    warehouse: "Abuja Hub",
    lastUpdated: "Jun 9, 2025",
  },
];

function getStatus(item: InventoryItem): StockStatus {
  if (item.stock === 0) return "out-of-stock";
  if (item.stock < item.reorderLevel) return "low-stock";
  return "in-stock";
}

const statusVariantMap: Record<StockStatus, "success" | "warning" | "danger"> =
  {
    "in-stock": "success",
    "low-stock": "warning",
    "out-of-stock": "danger",
  };

const statusLabelMap: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

function StockBar({
  stock,
  reorderLevel,
}: {
  stock: number;
  reorderLevel: number;
}) {
  const max = Math.max(reorderLevel * 4, stock, 1);
  const pct = Math.min((stock / max) * 100, 100);
  const color =
    stock === 0
      ? "var(--color-danger)"
      : stock < reorderLevel
        ? "var(--color-warning)"
        : "var(--color-success)";
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ width: "60px", background: "var(--color-secondary)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-sm font-semibold tabular-nums"
        style={{
          color:
            stock === 0
              ? "var(--color-danger)"
              : stock < reorderLevel
                ? "var(--color-warning)"
                : "var(--color-text)",
        }}
      >
        {stock}
      </span>
    </div>
  );
}

export default function InventoryPage() {
  const inStock = INVENTORY.filter((i) => getStatus(i) === "in-stock").length;
  const lowStock = INVENTORY.filter((i) => getStatus(i) === "low-stock").length;
  const outOfStock = INVENTORY.filter(
    (i) => getStatus(i) === "out-of-stock",
  ).length;

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
            Inventory
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Stock levels across all warehouses
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <Package size={14} />
          Export Stock Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total SKUs",
            value: INVENTORY.length,
            icon: Warehouse,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "In Stock",
            value: inStock,
            icon: CheckCircle,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Low Stock",
            value: lowStock,
            icon: AlertTriangle,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
          },
          {
            label: "Out of Stock",
            value: outOfStock,
            icon: XCircle,
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
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Product",
                "SKU",
                "Category",
                "Stock Level",
                "Warehouse",
                "Last Updated",
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
            {INVENTORY.map((item, idx) => {
              const status = getStatus(item);
              return (
                <tr
                  key={item.sku}
                  style={{
                    background: "var(--color-surface-raised)",
                    borderBottom:
                      idx < INVENTORY.length - 1
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  <td
                    className="px-5 py-4 text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.product}
                  </td>
                  <td className="px-5 py-4">
                    <code
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {item.sku}
                    </code>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: "var(--color-secondary)",
                        color: "var(--color-text)",
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StockBar
                      stock={item.stock}
                      reorderLevel={item.reorderLevel}
                    />
                  </td>
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.warehouse}
                  </td>
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.lastUpdated}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={statusLabelMap[status]}
                      variant={statusVariantMap[status]}
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
