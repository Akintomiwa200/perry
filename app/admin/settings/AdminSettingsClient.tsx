"use client";

import { useState } from "react";
import {
  Store,
  User,
  Bell,
  Truck,
  CreditCard,
  AlertTriangle,
  Save,
  Plus,
  X,
  Eye,
  EyeOff,
  Shield,
  ChevronDown,
  Camera,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId =
  | "store"
  | "account"
  | "notifications"
  | "shipping"
  | "payments"
  | "danger";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface ToggleItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface ToggleGroup {
  group: string;
  items: ToggleItem[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="text-xs font-medium uppercase tracking-wider"
      style={{ color: "var(--color-text-muted)" }}
    >
      {children}
    </label>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`card flex flex-col gap-5 ${className}`}
      style={{ background: "var(--color-surface-raised)" }}
    >
      {children}
    </section>
  );
}

function CardHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "var(--color-secondary)" }}
      >
        {icon}
      </div>
      <h2 className="text-base font-semibold" style={{ color: "var(--deep)" }}>
        {title}
      </h2>
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        type="button"
        className="btn btn-primary flex items-center gap-2"
        style={{ background: "var(--deep)", color: "var(--cream)" }}
      >
        <Save size={15} />
        {label}
      </button>
    </div>
  );
}

function Divider() {
  return <hr style={{ borderColor: "var(--color-border)" }} />;
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  id: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className="relative shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        width: 44,
        height: 24,
        borderRadius: 9999,
        background: checked ? "var(--color-primary)" : "var(--color-secondary)",
        border: `1px solid ${checked ? "var(--color-primary)" : "var(--color-border)"}`,
        outline: "none",
      }}
    >
      <span
        className="absolute top-[3px] transition-transform duration-200"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: checked ? "var(--cream)" : "var(--color-text-muted)",
          transform: checked ? "translateX(23px)" : "translateX(3px)",
          display: "block",
        }}
      />
    </button>
  );
}

// ─── Password Strength ────────────────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  let strength = 0;
  if (len >= 1) strength = 1;
  if (len >= 6) strength = 2;
  if (len >= 9) strength = 3;
  if (len >= 12) strength = 4;

  const colors = ["#DC2626", "#D97706", "#ca8a04", "#16A34A"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              background:
                bar <= strength
                  ? colors[strength - 1]
                  : "var(--color-secondary)",
            }}
          />
        ))}
      </div>
      {strength > 0 && (
        <span
          className="text-xs font-medium"
          style={{ color: colors[strength - 1] }}
        >
          {labels[strength]}
        </span>
      )}
    </div>
  );
}

// ─── Notification Row ─────────────────────────────────────────────────────────

function NotificationRow({
  item,
  onToggle,
}: {
  item: ToggleItem;
  onToggle: (id: string, val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {item.label}
        </span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {item.description}
        </span>
      </div>
      <Toggle
        id={`toggle-${item.id}`}
        checked={item.enabled}
        onChange={(val) => onToggle(item.id, val)}
      />
    </div>
  );
}

// ─── Danger Row ───────────────────────────────────────────────────────────────

type DangerVariant = "outline-primary" | "outline-danger" | "danger";

function DangerRow({
  title,
  description,
  buttonLabel,
  variant,
  confirmed,
  onConfirmRequest,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  variant: DangerVariant;
  confirmed: boolean;
  onConfirmRequest: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const btnStyle: React.CSSProperties =
    variant === "outline-primary"
      ? {
          background: "transparent",
          color: "var(--color-primary)",
          border: "1px solid var(--color-primary)",
        }
      : variant === "outline-danger"
        ? {
            background: "transparent",
            color: "var(--color-danger)",
            border: "1px solid var(--color-danger)",
          }
        : {
            background: "var(--color-danger)",
            color: "#fff",
            border: "1px solid var(--color-danger)",
          };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </span>
        <span
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {description}
        </span>
      </div>

      {confirmed ? (
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap" }}
          >
            Are you sure? This cannot be undone.
          </span>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-sm btn-danger"
            style={{ background: "var(--color-danger)", color: "#fff" }}
          >
            Yes, proceed
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-sm btn-ghost"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onConfirmRequest}
          className="btn btn-sm shrink-0"
          style={btnStyle}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

// ─── Prefix/Suffix Input ──────────────────────────────────────────────────────

function PrefixInput({
  prefix,
  suffix,
  type = "number",
  value,
  onChange,
  defaultValue,
}: {
  prefix?: string;
  suffix?: string;
  type?: string;
  value?: number | string;
  onChange?: (v: string) => void;
  defaultValue?: number | string;
}) {
  return (
    <div
      className="flex items-center rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      {prefix && (
        <span
          className="px-3 h-11 flex items-center text-sm font-medium shrink-0"
          style={{
            background: "var(--color-secondary)",
            color: "var(--color-text-muted)",
            borderRight: "1px solid var(--color-border)",
          }}
        >
          {prefix}
        </span>
      )}
      <input
        type={type}
        className="flex-1 outline-none text-sm px-3 h-11"
        style={{
          background: "var(--color-surface-raised)",
          color: "var(--color-text)",
          border: "none",
        }}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {suffix && (
        <span
          className="px-3 h-11 flex items-center text-sm font-medium shrink-0"
          style={{
            background: "var(--color-secondary)",
            color: "var(--color-text-muted)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

// ─── Initial toggle data ──────────────────────────────────────────────────────

const INITIAL_NOTIFICATION_GROUPS: ToggleGroup[] = [
  {
    group: "Order Alerts",
    items: [
      {
        id: "new-order",
        label: "New order placed",
        description: "Get notified whenever a customer places an order.",
        enabled: true,
      },
      {
        id: "order-status",
        label: "Order status changed",
        description: "Alerts when an order moves to a new status.",
        enabled: true,
      },
      {
        id: "order-cancelled",
        label: "Order cancelled",
        description: "Notified when a customer cancels their order.",
        enabled: false,
      },
    ],
  },
  {
    group: "Inventory",
    items: [
      {
        id: "low-stock",
        label: "Low stock alert",
        description: "Triggered when a product falls below threshold.",
        enabled: true,
      },
      {
        id: "out-of-stock",
        label: "Out of stock alert",
        description: "Alert when a product has zero remaining units.",
        enabled: true,
      },
      {
        id: "restock",
        label: "Restock completed",
        description: "Confirmation when a restock is recorded.",
        enabled: false,
      },
    ],
  },
  {
    group: "Customer Activity",
    items: [
      {
        id: "new-customer",
        label: "New customer registered",
        description: "Alert for every new account sign-up.",
        enabled: false,
      },
      {
        id: "new-review",
        label: "New review submitted",
        description: "Notified when a customer posts a product review.",
        enabled: true,
      },
      {
        id: "support-ticket",
        label: "Customer support ticket",
        description: "Receive alerts for new support requests.",
        enabled: true,
      },
    ],
  },
  {
    group: "Marketing",
    items: [
      {
        id: "campaign-report",
        label: "Campaign performance report",
        description: "Weekly digest of active marketing campaigns.",
        enabled: false,
      },
      {
        id: "flash-sale",
        label: "Flash sale reminders",
        description: "Reminders before a scheduled flash sale begins.",
        enabled: true,
      },
    ],
  },
];

const INITIAL_PAYMENT_METHODS: ToggleItem[] = [
  {
    id: "paystack",
    label: "Paystack",
    description: "Accept card payments via Paystack gateway.",
    enabled: true,
  },
  {
    id: "flutterwave",
    label: "Flutterwave",
    description: "Multi-currency payments via Flutterwave.",
    enabled: true,
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    description: "Manual bank transfer with confirmation.",
    enabled: true,
  },
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    description: "Customer pays the delivery agent in cash.",
    enabled: false,
  },
  {
    id: "pay-on-pickup",
    label: "Pay on Pickup",
    description: "Customer pays when collecting in-store.",
    enabled: false,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminSettingsClient() {
  // ── Active tab
  const [activeTab, setActiveTab] = useState<TabId>("store");

  // ── Store tab
  const [storeName, setStoreName] = useState("Perry Collectibles");
  const [storeTagline, setStoreTagline] = useState(
    "Luxury fashion & beauty, delivered.",
  );
  const [contactEmail, setContactEmail] = useState(
    "hello@perrycollectibles.com",
  );
  const [supportPhone, setSupportPhone] = useState("+234 800 000 0000");
  const [storeAddress, setStoreAddress] = useState(
    "14 Bola Ajibola Street, Ikeja, Lagos, Nigeria",
  );
  const [regNo, setRegNo] = useState("RC-1234567");
  const [currency, setCurrency] = useState("NGN");
  const [timezone, setTimezone] = useState("Africa/Lagos");

  // ── Account tab
  const [fullName, setFullName] = useState("Marcus George");
  const [adminEmail, setAdminEmail] = useState("marcus@admin.com");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Notifications tab
  const [notifGroups, setNotifGroups] = useState<ToggleGroup[]>(
    INITIAL_NOTIFICATION_GROUPS,
  );

  // ── Shipping tab
  const [shippingProvider, setShippingProvider] = useState("GIG Logistics");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(15000);
  const [standardRate, setStandardRate] = useState(1500);
  const [expressRate, setExpressRate] = useState(3500);
  const [processingTime, setProcessingTime] = useState("1–2 business days");
  const [regions, setRegions] = useState([
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
  ]);

  // ── Payments tab
  const [paymentMethods, setPaymentMethods] = useState<ToggleItem[]>(
    INITIAL_PAYMENT_METHODS,
  );
  const [paymentDescriptor, setPaymentDescriptor] = useState("PERRY STORE");
  const [vatRate, setVatRate] = useState(7.5);

  // ── Danger Zone tab
  const [dangerConfirm, setDangerConfirm] = useState<Record<string, boolean>>(
    {},
  );

  // ─── Helpers

  const handleNotifToggle = (id: string, val: boolean) => {
    setNotifGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((item) =>
          item.id === id ? { ...item, enabled: val } : item,
        ),
      })),
    );
  };

  const handlePaymentToggle = (id: string, val: boolean) => {
    setPaymentMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: val } : m)),
    );
  };

  const removeRegion = (region: string) => {
    setRegions((prev) => prev.filter((r) => r !== region));
  };

  const requestDanger = (key: string) =>
    setDangerConfirm((prev) => ({ ...prev, [key]: true }));

  const cancelDanger = (key: string) =>
    setDangerConfirm((prev) => ({ ...prev, [key]: false }));

  const proceedDanger = (key: string) => {
    // In a real app, perform the action here
    setDangerConfirm((prev) => ({ ...prev, [key]: false }));
  };

  // ─── Tabs config

  const TABS: Tab[] = [
    { id: "store", label: "Store", icon: <Store size={15} /> },
    { id: "account", label: "Account", icon: <User size={15} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
    { id: "shipping", label: "Shipping", icon: <Truck size={15} /> },
    { id: "payments", label: "Payments", icon: <CreditCard size={15} /> },
    { id: "danger", label: "Danger Zone", icon: <AlertTriangle size={15} /> },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading */}
      <div>
        <h1
          className="font-light leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
            color: "var(--deep)",
          }}
        >
          Settings
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          Manage your store, account, and preferences
        </p>
      </div>

      {/* Tabs Pill Bar */}
      <div
        className="flex flex-wrap gap-1.5 p-1.5 rounded-xl"
        style={{
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition"
              style={{
                background: isActive ? "var(--deep)" : "transparent",
                color: isActive ? "var(--cream)" : "var(--color-text-muted)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-surface)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-text-muted)";
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Store ─────────────────────────────────────────────────────── */}
      {activeTab === "store" && (
        <SectionCard>
          <CardHeading
            icon={<Store size={16} style={{ color: "var(--color-primary)" }} />}
            title="Store Information"
          />
          <Divider />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Store Name</FieldLabel>
              <input
                type="text"
                className="input"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Store Tagline</FieldLabel>
              <input
                type="text"
                className="input"
                value={storeTagline}
                onChange={(e) => setStoreTagline(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Contact Email</FieldLabel>
              <input
                type="email"
                className="input"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Support Phone</FieldLabel>
              <input
                type="tel"
                className="input"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Store Address</FieldLabel>
            <textarea
              className="input py-3 resize-none"
              rows={3}
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Business Registration No.</FieldLabel>
              <input
                type="text"
                className="input"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Currency</FieldLabel>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="NGN">NGN — Nigerian Naira</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Timezone</FieldLabel>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Africa/Lagos">
                    Africa/Lagos (WAT, UTC+1)
                  </option>
                  <option value="Europe/London">Europe/London (GMT/BST)</option>
                  <option value="America/New_York">
                    America/New_York (EST/EDT)
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
            </div>
          </div>

          <SaveButton label="Save Store Settings" />
        </SectionCard>
      )}

      {/* ── Tab: Account ───────────────────────────────────────────────────── */}
      {activeTab === "account" && (
        <div className="flex flex-col gap-6">
          <SectionCard>
            <CardHeading
              icon={
                <User size={16} style={{ color: "var(--color-primary)" }} />
              }
              title="Personal Profile"
            />
            <Divider />

            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 py-2">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #a855f7 100%)",
                  letterSpacing: "0.04em",
                }}
              >
                MG
              </div>
              <button
                type="button"
                className="btn btn-sm btn-ghost flex items-center gap-1.5"
                style={{ color: "var(--color-text-muted)", fontSize: 12 }}
              >
                <Camera size={13} />
                Change Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Full Name</FieldLabel>
                <input
                  type="text"
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Email Address</FieldLabel>
                <input
                  type="email"
                  className="input"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Phone Number</FieldLabel>
                <input
                  type="tel"
                  className="input"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Role</FieldLabel>
                <div className="flex items-center h-11">
                  <span
                    className="badge badge-primary flex items-center gap-1.5"
                    style={{
                      background: "var(--color-primary)",
                      color: "#fff",
                    }}
                  >
                    <Shield size={11} />
                    Super Admin
                  </span>
                </div>
              </div>
            </div>

            <SaveButton label="Save Account" />
          </SectionCard>

          {/* Change Password */}
          <SectionCard>
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--deep)" }}
            >
              Change Password
            </h2>
            <Divider />

            <div className="flex flex-col gap-5">
              {/* Current Password */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Current Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    className="input pr-11"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>New Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="input pr-11"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <PasswordStrength password={newPassword} />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Confirm New Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="input pr-11"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="btn btn-primary flex items-center gap-2"
                style={{ background: "var(--deep)", color: "var(--cream)" }}
              >
                <Save size={15} />
                Update Password
              </button>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── Tab: Notifications ─────────────────────────────────────────────── */}
      {activeTab === "notifications" && (
        <SectionCard>
          <CardHeading
            icon={<Bell size={16} style={{ color: "var(--color-primary)" }} />}
            title="Notification Preferences"
          />
          <Divider />

          <div className="flex flex-col gap-6">
            {notifGroups.map((group, gi) => (
              <div key={group.group} className="flex flex-col gap-1">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {group.group}
                </p>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  {group.items.map((item, ii) => (
                    <div
                      key={item.id}
                      className="px-4"
                      style={{
                        borderBottom:
                          ii < group.items.length - 1
                            ? "1px solid var(--color-border)"
                            : "none",
                      }}
                    >
                      <NotificationRow
                        item={item}
                        onToggle={handleNotifToggle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Tab: Shipping ──────────────────────────────────────────────────── */}
      {activeTab === "shipping" && (
        <SectionCard>
          <CardHeading
            icon={<Truck size={16} style={{ color: "var(--color-primary)" }} />}
            title="Shipping Configuration"
          />
          <Divider />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Default Shipping Provider</FieldLabel>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={shippingProvider}
                  onChange={(e) => setShippingProvider(e.target.value)}
                >
                  <option>DHL</option>
                  <option>GIG Logistics</option>
                  <option>Kwik</option>
                  <option>UPS</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Processing Time</FieldLabel>
              <div className="relative">
                <select
                  className="input appearance-none pr-10"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                >
                  <option>Same day</option>
                  <option>1–2 business days</option>
                  <option>3–5 business days</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Free Shipping Threshold</FieldLabel>
              <PrefixInput
                prefix="₦"
                type="number"
                value={freeShippingThreshold}
                onChange={(v) => setFreeShippingThreshold(Number(v))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Standard Shipping Rate</FieldLabel>
              <PrefixInput
                prefix="₦"
                type="number"
                value={standardRate}
                onChange={(v) => setStandardRate(Number(v))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Express Shipping Rate</FieldLabel>
              <PrefixInput
                prefix="₦"
                type="number"
                value={expressRate}
                onChange={(v) => setExpressRate(Number(v))}
              />
            </div>
          </div>

          {/* Supported Regions */}
          <div className="flex flex-col gap-2.5">
            <FieldLabel>Supported Regions</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <span
                  key={region}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--color-secondary)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {region}
                  <button
                    type="button"
                    onClick={() => removeRegion(region)}
                    className="flex items-center justify-center rounded-full transition hover:opacity-70"
                    aria-label={`Remove ${region}`}
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition"
                style={{
                  background: "transparent",
                  color: "var(--color-text-muted)",
                  border: "1px dashed var(--color-border)",
                }}
              >
                <Plus size={12} />
                Add Region
              </button>
            </div>
          </div>

          <SaveButton label="Save Shipping Settings" />
        </SectionCard>
      )}

      {/* ── Tab: Payments ──────────────────────────────────────────────────── */}
      {activeTab === "payments" && (
        <div className="flex flex-col gap-6">
          {/* Payment Methods */}
          <SectionCard>
            <CardHeading
              icon={
                <CreditCard
                  size={16}
                  style={{ color: "var(--color-primary)" }}
                />
              }
              title="Accepted Payment Methods"
            />
            <Divider />

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--color-border)" }}
            >
              {paymentMethods.map((method, i) => (
                <div
                  key={method.id}
                  className="px-4"
                  style={{
                    borderBottom:
                      i < paymentMethods.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  <NotificationRow
                    item={method}
                    onToggle={handlePaymentToggle}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Payment Details */}
          <SectionCard>
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--deep)" }}
            >
              Payment Details
            </h2>
            <Divider />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Payment Descriptor</FieldLabel>
                <input
                  type="text"
                  className="input"
                  value={paymentDescriptor}
                  onChange={(e) => setPaymentDescriptor(e.target.value)}
                  placeholder="Appears on customer bank statements"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel>VAT / Tax Rate</FieldLabel>
                <PrefixInput
                  suffix="%"
                  type="number"
                  value={vatRate}
                  onChange={(v) => setVatRate(Number(v))}
                />
              </div>
            </div>

            {/* Info Note */}
            <div
              className="flex gap-3 rounded-xl p-4 text-sm leading-relaxed"
              style={{
                background: "var(--color-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <span className="text-base shrink-0 mt-0.5">🔐</span>
              <p>
                <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                  Live API keys
                </strong>{" "}
                are managed via environment variables. Contact your developer to
                update payment gateway credentials.
              </p>
            </div>

            <SaveButton label="Save Payment Settings" />
          </SectionCard>
        </div>
      )}

      {/* ── Tab: Danger Zone ───────────────────────────────────────────────── */}
      {activeTab === "danger" && (
        <section
          className="card flex flex-col gap-0"
          style={{
            background: "var(--color-surface-raised)",
            border: "1.5px solid #fca5a5",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 pb-5 mb-2"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "#fee2e2" }}
            >
              <AlertTriangle
                size={16}
                style={{ color: "var(--color-danger)" }}
              />
            </div>
            <div>
              <h2
                className="text-base font-semibold"
                style={{ color: "var(--deep)" }}
              >
                Danger Zone
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                Irreversible and destructive actions live here. Proceed with
                extreme caution.
              </p>
            </div>
          </div>

          {/* Rows */}
          <DangerRow
            title="Export All Data"
            description="Download a full export of products, orders, and customer data as CSV."
            buttonLabel="Export Data"
            variant="outline-primary"
            confirmed={!!dangerConfirm["export"]}
            onConfirmRequest={() => requestDanger("export")}
            onConfirm={() => proceedDanger("export")}
            onCancel={() => cancelDanger("export")}
          />

          <DangerRow
            title="Reset Store Settings"
            description="Revert all store configuration to factory defaults. This cannot be undone."
            buttonLabel="Reset Settings"
            variant="outline-danger"
            confirmed={!!dangerConfirm["reset"]}
            onConfirmRequest={() => requestDanger("reset")}
            onConfirm={() => proceedDanger("reset")}
            onCancel={() => cancelDanger("reset")}
          />

          <DangerRow
            title="Delete All Products"
            description="Permanently remove every product listing from your catalogue."
            buttonLabel="Delete Products"
            variant="danger"
            confirmed={!!dangerConfirm["deleteProducts"]}
            onConfirmRequest={() => requestDanger("deleteProducts")}
            onConfirm={() => proceedDanger("deleteProducts")}
            onCancel={() => cancelDanger("deleteProducts")}
          />

          <DangerRow
            title="Deactivate Store"
            description="Take your storefront offline immediately. Customers will see a maintenance page."
            buttonLabel="Deactivate"
            variant="danger"
            confirmed={!!dangerConfirm["deactivate"]}
            onConfirmRequest={() => requestDanger("deactivate")}
            onConfirm={() => proceedDanger("deactivate")}
            onCancel={() => cancelDanger("deactivate")}
          />

          {/* Remove last border */}
          <style>{`
            .danger-zone-last > :last-child { border-bottom: none !important; }
          `}</style>
        </section>
      )}
    </div>
  );
}
