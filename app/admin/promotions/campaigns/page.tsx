"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";

export default function CampaignsPage() {
  const [stats, setStats] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch("/api/admin/stats"), fetch("/api/coupons")])
      .then(async ([a, b]) => {
        const sa = await a.json();
        const sb = await b.json();
        setStats(sa);
        setCoupons(sb.coupons ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
          Campaigns
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Live campaign performance based on current orders and coupons.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Orders", value: stats?.totalOrders ?? 0 },
          { label: "Revenue", value: stats?.totalRevenue ?? 0 },
          { label: "Coupons", value: coupons.length },
          { label: "Recent Orders", value: stats?.recentOrders?.length ?? 0 },
        ].map((x) => (
          <div key={x.label} className="rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}>
            <p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{x.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: "var(--color-text)" }}>{x.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Campaign", "Channel", "Metric", "Value", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading campaigns…</td></tr>}
            {!loading && coupons.map((c: any, idx: number) => (
              <tr key={c.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < coupons.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>{c.code}</td>
                <td className="px-5 py-4 text-sm">coupon</td>
                <td className="px-5 py-4 text-sm">usage</td>
                <td className="px-5 py-4 text-sm">{Number(c.usage_count ?? 0)}</td>
                <td className="px-5 py-4"><StatusBadge label={c.is_active ? "active" : "paused"} variant={c.is_active ? "success" : "neutral"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
