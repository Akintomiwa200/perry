"use client";

import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatNaira } from "@/lib/utils";

function inferStatus(p: any): "active" | "scheduled" | "ended" {
  if (p.status !== "active") return "ended";
  if (Number(p.stock ?? 0) <= 0) return "ended";
  if (!p.is_sale) return "scheduled";
  return "active";
}

export default function FlashSalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/products?isSale=true&status=all&limit=50")
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setError("Failed to load flash sales"))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => {
    const s = { active: 0, scheduled: 0, ended: 0 };
    for (const p of products) s[inferStatus(p)] += 1;
    return s;
  }, [products]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
          Flash Sales
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Create and manage time-limited promotional sales
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", value: stats.active },
          { label: "Scheduled", value: stats.scheduled },
          { label: "Ended", value: stats.ended },
        ].map((x) => (
          <div key={x.label} className="rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}>
            <p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{x.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: "var(--color-text)" }}>{x.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Product", "Category", "Original", "Flash Price", "Stock", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading flash sales…</td></tr>}
            {!isLoading && error && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-danger)" }}>{error}</td></tr>}
            {!isLoading && !error && products.map((p: any, idx: number) => {
              const status = inferStatus(p);
              const variant = status === "active" ? "success" : status === "scheduled" ? "info" : "danger";
              return (
                <tr key={p.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < products.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                  <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{p.name}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{p.category_name ?? p.category_slug ?? "-"}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{p.compare_at_price ? formatNaira(Number(p.compare_at_price)) : "—"}</td>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: "var(--color-text)" }}>{formatNaira(Number(p.price ?? 0))}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{Number(p.stock ?? 0)}</td>
                  <td className="px-5 py-4"><StatusBadge label={status} variant={variant as any} /></td>
                </tr>
              );
            })}
            {!isLoading && !error && products.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No flash sale products found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
