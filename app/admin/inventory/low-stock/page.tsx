import { AlertTriangle, ShoppingCart, RefreshCw } from "lucide-react";

interface LowStockItem {
  product: string;
  sku: string;
  currentStock: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: string;
}

const LOW_STOCK_ITEMS: LowStockItem[] = [
  {
    product: "Crystal Choker Necklace",
    sku: "JWL-CHK-004",
    currentStock: 7,
    reorderLevel: 15,
    supplier: "Lagos Gem Distributors",
    lastRestocked: "May 28, 2025",
  },
  {
    product: "Pearl Drop Earrings",
    sku: "JWL-ERG-012",
    currentStock: 4,
    reorderLevel: 10,
    supplier: "Lagos Gem Distributors",
    lastRestocked: "May 20, 2025",
  },
  {
    product: "Ankara Bucket Hat — Blue",
    sku: "HAT-ANK-003",
    currentStock: 0,
    reorderLevel: 20,
    supplier: "Eko Fabrics Ltd",
    lastRestocked: "Apr 30, 2025",
  },
  {
    product: "Gold Bangle Set (3-piece)",
    sku: "JWL-BNG-008",
    currentStock: 0,
    reorderLevel: 12,
    supplier: "Abuja Artisan Crafts",
    lastRestocked: "May 5, 2025",
  },
  {
    product: "Beaded Wrist Cuff — Terracotta",
    sku: "JWL-CUF-015",
    currentStock: 3,
    reorderLevel: 8,
    supplier: "Abuja Artisan Crafts",
    lastRestocked: "Jun 1, 2025",
  },
  {
    product: "Suede Mini Bag — Blush",
    sku: "BAG-SDE-033",
    currentStock: 2,
    reorderLevel: 10,
    supplier: "Apapa Leather Hub",
    lastRestocked: "May 15, 2025",
  },
];

function StockIndicator({
  current,
  reorder,
}: {
  current: number;
  reorder: number;
}) {
  const isOut = current === 0;
  const pct = isOut ? 0 : Math.min((current / (reorder * 2)) * 100, 100);
  const color = isOut ? "var(--color-danger)" : "var(--color-warning)";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {current}
        </span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          / {reorder} min
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ width: "80px", background: "var(--color-secondary)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function LowStockPage() {
  const outOfStockCount = LOW_STOCK_ITEMS.filter(
    (i) => i.currentStock === 0,
  ).length;
  const criticalCount = LOW_STOCK_ITEMS.filter(
    (i) => i.currentStock > 0 && i.currentStock < i.reorderLevel,
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
            Low Stock Alerts
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Products below their minimum reorder threshold
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <ShoppingCart size={14} />
          Bulk Reorder
        </button>
      </div>

      {/* Alert Banner */}
      <div
        className="flex items-start gap-4 rounded-xl p-4"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <div
          className="rounded-lg p-2 shrink-0"
          style={{ background: "#FEE2E2", marginTop: "1px" }}
        >
          <AlertTriangle size={16} style={{ color: "var(--color-danger)" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#991B1B" }}>
            Stock Action Required
          </p>
          <p className="text-sm mt-0.5" style={{ color: "#B91C1C" }}>
            {outOfStockCount} product{outOfStockCount !== 1 ? "s are" : " is"}{" "}
            completely out of stock, and {criticalCount} product
            {criticalCount !== 1 ? "s are" : " is"} critically low. Contact
            suppliers to initiate restocking immediately.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Alerts",
            value: LOW_STOCK_ITEMS.length,
            color: "var(--color-warning)",
            bg: "#FEF3C7",
          },
          {
            label: "Out of Stock",
            value: outOfStockCount,
            color: "var(--color-danger)",
            bg: "#FEE2E2",
          },
          {
            label: "Critically Low",
            value: criticalCount,
            color: "#D97706",
            bg: "#FEF3C7",
          },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p
              className="text-xs uppercase tracking-wide font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {label}
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color }}>
              {value}
            </p>
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
        <table className="w-full text-left border-collapse min-w-[780px]">
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
                "Stock / Min.",
                "Supplier",
                "Last Restocked",
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
            {LOW_STOCK_ITEMS.map((item, idx) => {
              const isOut = item.currentStock === 0;
              return (
                <tr
                  key={item.sku}
                  style={{
                    background: isOut
                      ? "#FFF5F5"
                      : "var(--color-surface-raised)",
                    borderBottom:
                      idx < LOW_STOCK_ITEMS.length - 1
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {isOut && (
                        <AlertTriangle
                          size={13}
                          style={{
                            color: "var(--color-danger)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text)" }}
                      >
                        {item.product}
                      </span>
                    </div>
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
                    <StockIndicator
                      current={item.currentStock}
                      reorder={item.reorderLevel}
                    />
                  </td>
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.supplier}
                  </td>
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.lastRestocked}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                      style={{
                        background: isOut ? "#FEE2E2" : "#FEF3C7",
                        color: isOut
                          ? "var(--color-danger)"
                          : "var(--color-warning)",
                      }}
                    >
                      <RefreshCw size={11} />
                      {isOut ? "Urgent Reorder" : "Reorder"}
                    </button>
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
