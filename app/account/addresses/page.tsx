"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

interface AddressRow {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
}

const NG_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Kastina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

interface FormData {
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const EMPTY_FORM: FormData = {
  label: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  isDefault: false,
};

export default function AddressesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<FormData>(EMPTY_FORM);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/account/addresses");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        const { data } = await api.get("/addresses");
        setAddresses(data.addresses ?? data ?? []);
      } catch {
        // 404 or other error — show empty state, don't crash
        setAddresses([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.post("/addresses", {
        label: form.label,
        firstName: form.firstName,
        lastName: form.lastName,
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: "Nigeria",
        isDefault: form.isDefault,
      });
      const newAddr: AddressRow = data.address ?? data;
      setAddresses((prev) => [newAddr, ...prev]);
      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch {
      // keep form open on error
    } finally {
      setSaving(false);
    }
  };

  const handleEditSave = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.patch(`/addresses/${id}`, {
        label: editForm.label,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        street: editForm.street,
        city: editForm.city,
        state: editForm.state,
        zip: editForm.zip,
        country: "Nigeria",
        isDefault: editForm.isDefault,
      });
      const updated: AddressRow = data.address ?? data;
      setAddresses((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setEditingId(null);
    } catch {
      // keep form open on error
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch {
      // silently fail
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await api.patch(`/addresses/${id}`, { isDefault: true });
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, is_default: a.id === id })),
      );
    } catch {
      // silently fail
    }
  };

  const startEdit = (addr: AddressRow) => {
    setEditingId(addr.id);
    setEditForm({
      label: addr.label,
      firstName: addr.first_name,
      lastName: addr.last_name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      isDefault: addr.is_default,
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className="h-8 w-48 rounded animate-pulse"
            style={{ background: "var(--color-border)" }}
          />
          <div
            className="h-8 w-28 rounded animate-pulse"
            style={{ background: "var(--color-border)" }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="p-5 rounded-xl animate-pulse"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                height: "140px",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          Saved Addresses
        </h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setShowForm((v) => !v);
            setForm(EMPTY_FORM);
          }}
        >
          <Plus size={14} /> {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-5 rounded-xl flex flex-col gap-3"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-base font-semibold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            New Address
          </h2>

          <input
            className="input"
            placeholder="Label (e.g. Home, Office)"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstName: e.target.value }))
              }
              required
            />
            <input
              className="input"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm((f) => ({ ...f, lastName: e.target.value }))
              }
              required
            />
          </div>
          <input
            className="input"
            placeholder="Street Address"
            value={form.street}
            onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              required
            />
            <select
              className="input"
              value={form.state}
              onChange={(e) =>
                setForm((f) => ({ ...f, state: e.target.value }))
              }
              required
            >
              <option value="">Select State</option>
              {NG_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <input
            className="input"
            placeholder="ZIP / Postal Code (optional)"
            value={form.zip}
            onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
          />
          <label
            className="flex items-center gap-2 text-sm cursor-pointer"
            style={{ color: "var(--color-text)" }}
          >
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm((f) => ({ ...f, isDefault: e.target.checked }))
              }
            />
            Set as default address
          </label>

          <div className="flex gap-2 mt-1">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Address"}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-16 flex flex-col items-center gap-3">
          <MapPin size={40} style={{ color: "var(--color-border)" }} />
          <p className="font-medium" style={{ color: "var(--color-text)" }}>
            No saved addresses
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Add an address to speed up checkout.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-5 rounded-xl relative"
            style={{
              background: "var(--color-surface-raised)",
              border: `2px solid ${addr.is_default ? "var(--color-primary)" : "var(--color-border)"}`,
            }}
          >
            {editingId === addr.id ? (
              /* Inline edit form */
              <form
                onSubmit={(e) => handleEditSave(addr.id, e)}
                className="flex flex-col gap-2"
              >
                <input
                  className="input"
                  placeholder="Label"
                  value={editForm.label}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, label: e.target.value }))
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="input"
                    placeholder="First Name"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    required
                  />
                  <input
                    className="input"
                    placeholder="Last Name"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    required
                  />
                </div>
                <input
                  className="input"
                  placeholder="Street"
                  value={editForm.street}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, street: e.target.value }))
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="input"
                    placeholder="City"
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, city: e.target.value }))
                    }
                    required
                  />
                  <select
                    className="input"
                    value={editForm.state}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, state: e.target.value }))
                    }
                    required
                  >
                    <option value="">State</option>
                    {NG_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  className="input"
                  placeholder="ZIP (optional)"
                  value={editForm.zip}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, zip: e.target.value }))
                  }
                />
                <label
                  className="flex items-center gap-2 text-sm cursor-pointer"
                  style={{ color: "var(--color-text)" }}
                >
                  <input
                    type="checkbox"
                    checked={editForm.isDefault}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        isDefault: e.target.checked,
                      }))
                    }
                  />
                  Default address
                </label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={saving}
                  >
                    <Check size={13} /> {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    <X size={13} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Display card */
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={14}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {addr.label}
                    </span>
                    {addr.is_default && (
                      <span
                        className="badge badge-primary"
                        style={{ fontSize: "9px", padding: "2px 7px" }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-md"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label="Edit address"
                      onClick={() => startEdit(addr)}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-md"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label="Delete address"
                      onClick={() => handleDelete(addr.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-sm" style={{ color: "var(--color-text)" }}>
                  {addr.first_name} {addr.last_name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {addr.street}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {addr.city}, {addr.state}
                  {addr.zip ? ` ${addr.zip}` : ""}
                </p>

                {!addr.is_default && (
                  <button
                    className="mt-3 text-xs font-medium"
                    style={{ color: "var(--color-primary)" }}
                    onClick={() => handleSetDefault(addr.id)}
                  >
                    Set as default
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
