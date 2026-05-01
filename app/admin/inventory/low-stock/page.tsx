"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ShoppingCart } from "lucide-react";

export default function LowStockPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/inventory?lowStock=true")
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setError("Failed to load low stock items"))
      .finally(() => setIsLoading(false));
  }, []);

  const outOfStockCount = useMemo(
    () => products.filter((p) => Number(p.stock ?? 0) === 0).length,
    [products],
  );
  const criticalCount = useMemo(
    () => products.filter((p) => Number(p.stock ?? 0) > 0 && Number(p.stock ?? 0) <= 10).length,
    [products],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
            Low Stock Alerts
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>Products below their minimum reorder threshold</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2" style={{ fontFamily: "var(--font-primary)" }}>
          <ShoppingCart size={14} />
          Bulk Reorder
        </button>
      </div>

      <div className="flex items-start gap-4 rounded-xl p-4" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
        <div className="rounded-lg p-2 shrink-0" style={{ background: "#FEE2E2", marginTop: "1px" }}>
          <AlertTriangle size={16} style={{ color: "var(--color-danger)" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#991B1B" }}>Stock Action Required</p>
          <p className="text-sm mt-0.5" style={{ color: "#B91C1C" }}>
            {outOfStockCount} out of stock, {criticalCount} critically low.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Product", "SKU", "Category", "Stock", "Last Updated"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading low stock items…</td></tr>}
            {!isLoading && error && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-danger)" }}>{error}</td></tr>}
            {!isLoading && !error && products.map((p: any, idx: number) => (
              <tr key={p.id} style={{ background: Number(p.stock ?? 0) === 0 ? "#FFF5F5" : "var(--color-surface-raised)", borderBottom: idx < products.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{p.name}</td>
                <td className="px-5 py-4"><code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}>{p.sku}</code></td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{p.category_name ?? "-"}</td>
                <td className="px-5 py-4 text-sm font-semibold" style={{ color: Number(p.stock ?? 0) === 0 ? "var(--color-danger)" : "var(--color-warning)" }}>{Number(p.stock ?? 0)}</td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : "-"}</td>
              </tr>
            ))}
            {!isLoading && !error && products.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No low stock items found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
