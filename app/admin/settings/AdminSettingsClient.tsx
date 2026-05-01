"use client";

import { useEffect, useState } from "react";
import { useToastStore } from "@/lib/toast-store";

type TabId = "store" | "account" | "notifications" | "shipping" | "payments" | "danger";

export default function AdminSettingsClient() {
  const [activeTab, setActiveTab] = useState<TabId>("store");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [account, setAccount] = useState({ firstName: "", lastName: "", phone: "" });
  const addToast = useToastStore((s) => s.addToast);

  const load = async () => {
    setLoading(true);
    try {
      const [s, me] = await Promise.all([fetch("/api/admin/settings"), fetch("/api/auth/me")]);
      const settingsData = await s.json();
      const meData = await me.json();
      setSettings(settingsData.settings);
      setAccount({
        firstName: meData.user?.firstName ?? "",
        lastName: meData.user?.lastName ?? "",
        phone: meData.user?.phone ?? "",
      });
    } catch {
      addToast("Failed to load settings.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveSettings = async (next: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSettings(data.settings);
      addToast("Settings saved successfully.", "success");
    } catch (e: any) {
      addToast(e?.message ?? "Save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const saveAccount = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save account");
      addToast("Account updated successfully.", "success");
    } catch (e: any) {
      addToast(e?.message ?? "Failed to save account.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <p style={{ color: "var(--color-text-muted)" }}>Loading settings…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3vw, 2.6rem)", color: "var(--deep)" }}>
          Settings
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["store", "account", "notifications", "shipping", "payments", "danger"] as TabId[]).map((t) => (
          <button key={t} className="btn btn-sm" onClick={() => setActiveTab(t)} style={{ background: activeTab === t ? "var(--deep)" : "var(--color-surface-raised)", color: activeTab === t ? "var(--cream)" : "var(--color-text)" }}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === "store" && (
        <section className="card flex flex-col gap-4" style={{ background: "var(--color-surface-raised)" }}>
          <input className="input" value={settings.store.storeName} onChange={(e) => setSettings((p: any) => ({ ...p, store: { ...p.store, storeName: e.target.value } }))} />
          <input className="input" value={settings.store.contactEmail} onChange={(e) => setSettings((p: any) => ({ ...p, store: { ...p.store, contactEmail: e.target.value } }))} />
          <input className="input" value={settings.store.supportPhone} onChange={(e) => setSettings((p: any) => ({ ...p, store: { ...p.store, supportPhone: e.target.value } }))} />
          <button className="btn btn-primary" disabled={saving} onClick={() => saveSettings({ store: settings.store })}>Save Store</button>
        </section>
      )}

      {activeTab === "account" && (
        <section className="card flex flex-col gap-4" style={{ background: "var(--color-surface-raised)" }}>
          <input className="input" placeholder="First Name" value={account.firstName} onChange={(e) => setAccount((p) => ({ ...p, firstName: e.target.value }))} />
          <input className="input" placeholder="Last Name" value={account.lastName} onChange={(e) => setAccount((p) => ({ ...p, lastName: e.target.value }))} />
          <input className="input" placeholder="Phone" value={account.phone} onChange={(e) => setAccount((p) => ({ ...p, phone: e.target.value }))} />
          <button className="btn btn-primary" disabled={saving} onClick={saveAccount}>Save Account</button>
        </section>
      )}

      {activeTab === "notifications" && (
        <section className="card flex flex-col gap-3" style={{ background: "var(--color-surface-raised)" }}>
          {Object.entries(settings.notifications).map(([k, v]) => (
            <label key={k} className="flex items-center justify-between">
              <span>{k}</span>
              <input type="checkbox" checked={Boolean(v)} onChange={(e) => setSettings((p: any) => ({ ...p, notifications: { ...p.notifications, [k]: e.target.checked } }))} />
            </label>
          ))}
          <button className="btn btn-primary" disabled={saving} onClick={() => saveSettings({ notifications: settings.notifications })}>Save Notifications</button>
        </section>
      )}

      {activeTab === "shipping" && (
        <section className="card flex flex-col gap-3" style={{ background: "var(--color-surface-raised)" }}>
          <input className="input" value={settings.shipping.shippingProvider} onChange={(e) => setSettings((p: any) => ({ ...p, shipping: { ...p.shipping, shippingProvider: e.target.value } }))} />
          <input className="input" type="number" value={settings.shipping.standardRate} onChange={(e) => setSettings((p: any) => ({ ...p, shipping: { ...p.shipping, standardRate: Number(e.target.value) } }))} />
          <input className="input" type="number" value={settings.shipping.expressRate} onChange={(e) => setSettings((p: any) => ({ ...p, shipping: { ...p.shipping, expressRate: Number(e.target.value) } }))} />
          <button className="btn btn-primary" disabled={saving} onClick={() => saveSettings({ shipping: settings.shipping })}>Save Shipping</button>
        </section>
      )}

      {activeTab === "payments" && (
        <section className="card flex flex-col gap-3" style={{ background: "var(--color-surface-raised)" }}>
          <input className="input" value={settings.payments.paymentDescriptor} onChange={(e) => setSettings((p: any) => ({ ...p, payments: { ...p.payments, paymentDescriptor: e.target.value } }))} />
          <input className="input" type="number" value={settings.payments.vatRate} onChange={(e) => setSettings((p: any) => ({ ...p, payments: { ...p.payments, vatRate: Number(e.target.value) } }))} />
          <button className="btn btn-primary" disabled={saving} onClick={() => saveSettings({ payments: settings.payments })}>Save Payments</button>
        </section>
      )}

      {activeTab === "danger" && (
        <section className="card flex flex-col gap-3" style={{ background: "var(--color-surface-raised)" }}>
          <p style={{ color: "var(--color-danger)" }}>Danger zone actions are protected and require additional confirmation flow.</p>
        </section>
      )}
    </div>
  );
}
