"use client";

import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatNaira } from "@/lib/utils";

export default function DiscountsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/products?isSale=true&status=all&limit=100")
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setError("Failed to load discount rules"))
      .finally(() => setIsLoading(false));
  }, []);

  const avgDiscount = useMemo(() => {
    const discounts = products
      .map((p) => {
        const compare = Number(p.compare_at_price ?? 0);
        const price = Number(p.price ?? 0);
        if (!compare || compare <= price) return 0;
        return Math.round(((compare - price) / compare) * 100);
      })
      .filter((v) => v > 0);
    if (discounts.length === 0) return 0;
    return Math.round(discounts.reduce((a, b) => a + b, 0) / discounts.length);
  }, [products]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
          Discounts
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Manage product and category-level discount rules
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Discounted Products", value: products.length },
          { label: "Average Discount", value: `${avgDiscount}%` },
          { label: "Active Rules", value: products.length },
          { label: "Status", value: "Live" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: "var(--color-text)" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Product", "Category", "Original", "Discounted", "Discount %", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading discounts…</td></tr>}
            {!isLoading && error && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-danger)" }}>{error}</td></tr>}
            {!isLoading && !error && products.map((p: any, idx: number) => {
              const compare = Number(p.compare_at_price ?? 0);
              const price = Number(p.price ?? 0);
              const pct = compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
              return (
                <tr key={p.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < products.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                  <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{p.name}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{p.category_name ?? p.category_slug ?? "-"}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{compare ? formatNaira(compare) : "—"}</td>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: "var(--color-text)" }}>{formatNaira(price)}</td>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: "var(--color-success)" }}>{pct}%</td>
                  <td className="px-5 py-4"><StatusBadge label="active" variant="success" /></td>
                </tr>
              );
            })}
            {!isLoading && !error && products.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No discounted products found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
