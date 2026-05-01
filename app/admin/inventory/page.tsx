"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, CheckCircle, AlertTriangle, XCircle, Warehouse } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

function getStatus(stock: number): StockStatus {
  if (stock === 0) return "out-of-stock";
  if (stock <= 10) return "low-stock";
  return "in-stock";
}

const statusVariantMap: Record<StockStatus, "success" | "warning" | "danger"> = {
  "in-stock": "success",
  "low-stock": "warning",
  "out-of-stock": "danger",
};

const statusLabelMap: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/inventory")
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setError("Failed to load inventory"))
      .finally(() => setIsLoading(false));
  }, []);

  const inStock = useMemo(() => products.filter((p) => Number(p.stock ?? 0) > 10).length, [products]);
  const lowStock = useMemo(
    () => products.filter((p) => Number(p.stock ?? 0) > 0 && Number(p.stock ?? 0) <= 10).length,
    [products],
  );
  const outOfStock = useMemo(() => products.filter((p) => Number(p.stock ?? 0) === 0).length, [products]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
            Inventory
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>Stock levels across all warehouses</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2" style={{ fontFamily: "var(--font-primary)" }}>
          <Package size={14} />
          Export Stock Report
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total SKUs", value: products.length, icon: Warehouse, color: "#2563EB", bg: "#DBEAFE" },
          { label: "In Stock", value: inStock, icon: CheckCircle, color: "var(--color-success)", bg: "#DCFCE7" },
          { label: "Low Stock", value: lowStock, icon: AlertTriangle, color: "var(--color-warning)", bg: "#FEF3C7" },
          { label: "Out of Stock", value: outOfStock, icon: XCircle, color: "var(--color-danger)", bg: "#FEE2E2" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <div className="rounded-lg p-2.5 shrink-0" style={{ background: bg }}>
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{label}</p>
              <p className="text-xl font-bold mt-0.5" style={{ color: "var(--color-text)" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Product", "SKU", "Category", "Stock", "Last Updated", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading inventory…</td></tr>
            )}
            {!isLoading && error && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-danger)" }}>{error}</td></tr>
            )}
            {!isLoading && !error && products.map((p: any, idx: number) => {
              const stock = Number(p.stock ?? 0);
              const status = getStatus(stock);
              return (
                <tr key={p.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < products.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                  <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{p.name}</td>
                  <td className="px-5 py-4"><code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}>{p.sku}</code></td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{p.category_name ?? "-"}</td>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: stock === 0 ? "var(--color-danger)" : stock <= 10 ? "var(--color-warning)" : "var(--color-success)" }}>{stock}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : "-"}</td>
                  <td className="px-5 py-4"><StatusBadge label={statusLabelMap[status]} variant={statusVariantMap[status]} /></td>
                </tr>
              );
            })}
            {!isLoading && !error && products.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No inventory records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
