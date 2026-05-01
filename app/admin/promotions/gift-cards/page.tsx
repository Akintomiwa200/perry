"use client";

import { useEffect, useState } from "react";

export default function GiftCardsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
          Gift Cards
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Live commerce snapshot while dedicated gift-card issuance API is being finalized.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: stats?.totalRevenue ?? 0 },
          { label: "Total Orders", value: stats?.totalOrders ?? 0 },
          { label: "Customers", value: stats?.totalCustomers ?? 0 },
          { label: "Low Stock", value: stats?.lowStockCount ?? 0 },
        ].map((x) => (
          <div key={x.label} className="rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}>
            <p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{x.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: "var(--color-text)" }}>{loading ? "…" : x.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
