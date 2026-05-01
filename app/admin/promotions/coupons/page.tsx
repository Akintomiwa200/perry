"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket, Plus, CheckCircle, Clock } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type CouponType = "percent" | "fixed" | "free_shipping";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    code: "",
    type: "percent" as CouponType,
    value: "",
    minOrder: "",
    usageLimit: "",
    expiresAt: "",
  });

  const loadCoupons = () => {
    setIsLoading(true);
    setError(null);
    fetch("/api/coupons")
      .then((r) => r.json())
      .then((data) => setCoupons(data.coupons ?? []))
      .catch(() => setError("Failed to load coupons"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const active = useMemo(() => coupons.filter((c) => c.is_active).length, [coupons]);
  const expired = useMemo(
    () => coupons.filter((c) => c.expires_at && new Date(c.expires_at).getTime() < Date.now()).length,
    [coupons],
  );
  const totalUsed = useMemo(() => coupons.reduce((sum, c) => sum + Number(c.usage_count ?? 0), 0), [coupons]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const body = {
        code: form.code.trim(),
        type: form.type,
        value: Number(form.value),
        minOrder: form.minOrder ? Number(form.minOrder) : 0,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined,
      };
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create coupon");
      setForm({ code: "", type: "percent", value: "", minOrder: "", usageLimit: "", expiresAt: "" });
      loadCoupons();
    } catch (err: any) {
      setError(err?.message ?? "Failed to create coupon");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ color: "var(--deep)", fontFamily: "'Cormorant Garamond', serif" }}>
            Coupons
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>Create and manage promotional coupon codes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active", value: active, icon: CheckCircle, color: "var(--color-success)", bg: "#DCFCE7" },
          { label: "Expired", value: expired, icon: Clock, color: "var(--color-danger)", bg: "#FEE2E2" },
          { label: "Total Used", value: totalUsed, icon: Ticket, color: "#7C3AED", bg: "#EDE9FE" },
          { label: "Total Coupons", value: coupons.length, icon: Ticket, color: "var(--color-warning)", bg: "#FEF3C7" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <div className="rounded-lg p-2.5 shrink-0" style={{ background: bg }}><Icon size={17} style={{ color }} /></div>
            <div><p className="text-xs uppercase tracking-wide font-medium" style={{ color: "var(--color-text-muted)" }}>{label}</p><p className="text-xl font-bold mt-0.5" style={{ color: "var(--color-text)" }}>{value}</p></div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3 rounded-xl p-4" style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}>
        <input className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} placeholder="Code (e.g PERRY10)" value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} required />
        <select className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as CouponType }))}>
          <option value="percent">Percent</option>
          <option value="fixed">Fixed</option>
          <option value="free_shipping">Free Shipping</option>
        </select>
        <input className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} placeholder="Value" type="number" min="0" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} required />
        <input className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} placeholder="Min Order" type="number" min="0" value={form.minOrder} onChange={(e) => setForm((p) => ({ ...p, minOrder: e.target.value }))} />
        <input className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} placeholder="Usage Limit" type="number" min="1" value={form.usageLimit} onChange={(e) => setForm((p) => ({ ...p, usageLimit: e.target.value }))} />
        <input className="h-10 px-3 rounded-lg border" style={{ borderColor: "var(--color-border)" }} type="datetime-local" value={form.expiresAt} onChange={(e) => setForm((p) => ({ ...p, expiresAt: e.target.value }))} />
        <button type="submit" disabled={creating} className="md:col-span-6 btn btn-primary flex items-center justify-center gap-2">
          <Plus size={14} />
          {creating ? "Creating..." : "Create Coupon"}
        </button>
      </form>

      {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              {["Code", "Type", "Value", "Min Order", "Usage", "Expiry", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>Loading coupons…</td></tr>}
            {!isLoading && !error && coupons.map((c: any, idx: number) => {
              const expiredNow = c.expires_at && new Date(c.expires_at).getTime() < Date.now();
              const status = !c.is_active ? "paused" : expiredNow ? "expired" : "active";
              const statusVariant: any = status === "active" ? "success" : status === "expired" ? "danger" : "neutral";
              return (
                <tr key={c.id} style={{ background: "var(--color-surface-raised)", borderBottom: idx < coupons.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                  <td className="px-5 py-4 text-sm font-semibold"><code>{c.code}</code></td>
                  <td className="px-5 py-4 text-sm">{c.discount_type}</td>
                  <td className="px-5 py-4 text-sm font-semibold">{Number(c.discount_value)}</td>
                  <td className="px-5 py-4 text-sm">{Number(c.min_order)}</td>
                  <td className="px-5 py-4 text-sm">{Number(c.usage_count ?? 0)} / {c.usage_limit ?? "∞"}</td>
                  <td className="px-5 py-4 text-sm">{c.expires_at ? new Date(c.expires_at).toLocaleString() : "—"}</td>
                  <td className="px-5 py-4"><StatusBadge label={status} variant={statusVariant} /></td>
                </tr>
              );
            })}
            {!isLoading && !error && coupons.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No coupons found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
