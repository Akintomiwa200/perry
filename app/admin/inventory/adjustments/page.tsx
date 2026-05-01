"use client";

import { useEffect, useMemo, useState } from "react";
import { PlusCircle, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react";

type AdjustmentType = "addition" | "reduction" | "correction";

const typeStyles: Record<AdjustmentType, { bg: string; color: string; label: string }> = {
  addition: { bg: "#DCFCE7", color: "var(--color-success)", label: "Addition" },
  reduction: { bg: "#FEE2E2", color: "var(--color-danger)", label: "Reduction" },
  correction: { bg: "#DBEAFE", color: "#2563EB", label: "Correction" },
};

function TypeBadge({ type }: { type: AdjustmentType }) {
  const { bg, color, label } = typeStyles[type];
  const Icon = type === "addition" ? TrendingUp : type === "reduction" ? TrendingDown : RefreshCcw;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: bg, color }}>
      <Icon size={10} />
      {label}
    </span>
  );
}

export default function AdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/inventory/adjustments")
      .then((r) => r.json())
      .then((data) => setAdjustments(data.adjustments ?? []))
      .catch(() => setError("Failed to load adjustments"))
      .finally(() => setIsLoading(false));
  }, []);

  const additions = useMemo(() => adjustments.filter((a) => a.adjustment_type === "addition").length, [adjustments]);
  const reductions = useMemo(() => adjustments.filter((a) => a.adjustment_type === "reduction").length, [adjustments]);
  const corrections = useMemo(() => adjustments.filter((a) => a.adjustment_type === "correction").length, [adjustments]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
            Inventory Adjustments
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>Audit log of all manual stock changes</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2" style={{ fontFamily: "var(--font-primary)" }}>
          <PlusCircle size={14} />
          Record Adjustment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Additions", value: additions, color: "var(--color-success)", bg: "#DCFCE7", icon: TrendingUp },
          { label: "Reductions", value: reductions, color: "var(--color-danger)", bg: "#FEE2E2", icon: TrendingDown },
          { label: "Corrections", value: corrections, color: "#2563EB", bg: "#DBEAFE", icon: RefreshCcw },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <div className="rounded-lg p-2.5 shrink-0" style={{ background: bg }}>
              <Icon size={16} style={{ color }} />
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
              {["ID", "Product", "SKU", "Type", "Qty", "Reason", "Admin", "Date"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={8} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading adjustments…</td></tr>}
            {!isLoading && error && <tr><td colSpan={8} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-danger)" }}>{error}</td></tr>}
            {!isLoading && !error && adjustments.map((a: any, idx: number) => (
              <tr key={a.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < adjustments.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                <td className="px-5 py-4 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>#{a.id}</td>
                <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{a.product_name}</td>
                <td className="px-5 py-4"><code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}>{a.product_sku}</code></td>
                <td className="px-5 py-4"><TypeBadge type={a.adjustment_type as AdjustmentType} /></td>
                <td className="px-5 py-4 text-sm font-bold" style={{ color: Number(a.quantity) >= 0 ? "var(--color-success)" : "var(--color-danger)" }}>{Number(a.quantity) >= 0 ? `+${a.quantity}` : a.quantity}</td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{a.reason ?? "-"}</td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text)" }}>{a.admin_name ?? a.admin_email}</td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>{a.created_at ? new Date(a.created_at).toLocaleDateString() : "-"}</td>
              </tr>
            ))}
            {!isLoading && !error && adjustments.length === 0 && <tr><td colSpan={8} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No adjustments found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
