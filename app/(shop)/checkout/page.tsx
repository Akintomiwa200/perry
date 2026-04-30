"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useCheckout,
  SHIPPING_OPTIONS,
  ShippingAddress,
} from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { formatNaira } from "@/lib/utils";
import {
  Check,
  MapPin,
  Truck,
  CreditCard,
  Package,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// ── Nigerian states ───────────────────────────────────────────────────────────
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

// ── Step indicator ────────────────────────────────────────────────────────────
const STEPS = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirmed", icon: Check },
] as const;

function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);
  return (
    <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-1">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s.id} className="flex items-center gap-1 shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: done
                  ? "var(--color-success, #16a34a)"
                  : active
                    ? "var(--color-primary)"
                    : "var(--color-secondary)",
                color: done || active ? "#fff" : "var(--color-text-muted)",
                letterSpacing: ".04em",
              }}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight
                size={14}
                style={{
                  color:
                    i < currentIdx
                      ? "var(--color-success, #16a34a)"
                      : "var(--color-border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Address form ──────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<keyof ShippingAddress, string>>;

function AddressForm({ onSubmit }: { onSubmit: (a: ShippingAddress) => void }) {
  const [form, setForm] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const set =
    (field: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "A valid email is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.street.trim()) errs.street = "Street address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state) errs.state = "State is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const labelStyle: React.CSSProperties = {
    fontSize: ".72rem",
    fontWeight: 600,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    marginBottom: "0.35rem",
    display: "block",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: ".6rem .85rem",
    borderRadius: "var(--radius-sm, 6px)",
    border: "1.5px solid var(--color-border)",
    background: "var(--color-surface-raised)",
    color: "var(--color-text)",
    fontSize: ".9rem",
    outline: "none",
    boxSizing: "border-box",
  };
  const errStyle: React.CSSProperties = {
    fontSize: ".75rem",
    color: "var(--color-danger, #dc2626)",
    marginTop: ".25rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label style={labelStyle}>First Name</label>
          <input
            style={{
              ...inputStyle,
              borderColor: errors.firstName
                ? "var(--color-danger, #dc2626)"
                : "var(--color-border)",
            }}
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="Amaka"
          />
          {errors.firstName && <p style={errStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input
            style={{
              ...inputStyle,
              borderColor: errors.lastName
                ? "var(--color-danger, #dc2626)"
                : "var(--color-border)",
            }}
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Okonkwo"
          />
          {errors.lastName && <p style={errStyle}>{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          style={{
            ...inputStyle,
            borderColor: errors.email
              ? "var(--color-danger, #dc2626)"
              : "var(--color-border)",
          }}
          value={form.email}
          onChange={set("email")}
          placeholder="amaka@example.com"
        />
        {errors.email && <p style={errStyle}>{errors.email}</p>}
      </div>

      <div>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          style={{
            ...inputStyle,
            borderColor: errors.phone
              ? "var(--color-danger, #dc2626)"
              : "var(--color-border)",
          }}
          value={form.phone}
          onChange={set("phone")}
          placeholder="+234 800 000 0000"
        />
        {errors.phone && <p style={errStyle}>{errors.phone}</p>}
      </div>

      <div>
        <label style={labelStyle}>Street Address</label>
        <input
          style={{
            ...inputStyle,
            borderColor: errors.street
              ? "var(--color-danger, #dc2626)"
              : "var(--color-border)",
          }}
          value={form.street}
          onChange={set("street")}
          placeholder="12 Adeola Odeku Street, Victoria Island"
        />
        {errors.street && <p style={errStyle}>{errors.street}</p>}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label style={labelStyle}>City / Town</label>
          <input
            style={{
              ...inputStyle,
              borderColor: errors.city
                ? "var(--color-danger, #dc2626)"
                : "var(--color-border)",
            }}
            value={form.city}
            onChange={set("city")}
            placeholder="Lagos"
          />
          {errors.city && <p style={errStyle}>{errors.city}</p>}
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <select
            style={{
              ...inputStyle,
              borderColor: errors.state
                ? "var(--color-danger, #dc2626)"
                : "var(--color-border)",
              appearance: "auto",
            }}
            value={form.state}
            onChange={set("state")}
          >
            <option value="">Select state…</option>
            {NG_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && <p style={errStyle}>{errors.state}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Country</label>
        <input
          style={{
            ...inputStyle,
            background: "var(--color-secondary)",
            color: "var(--color-text-muted)",
            cursor: "not-allowed",
          }}
          value="Nigeria"
          disabled
        />
      </div>

      <button
        onClick={() => {
          if (validate()) onSubmit(form);
        }}
        className="btn btn-primary btn-lg w-full"
        style={{ marginTop: ".5rem" }}
      >
        Continue to Shipping →
      </button>
    </div>
  );
}

// ── Shipping selector ─────────────────────────────────────────────────────────
function ShippingSelector({
  address,
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  address: ShippingAddress;
  selected: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Address summary */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "var(--radius-sm, 6px)",
          background: "var(--color-secondary)",
          border: "1px solid var(--color-border)",
          fontSize: ".85rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.6,
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: ".25rem",
          }}
        >
          {address.firstName} {address.lastName}
        </p>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Shipping options */}
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {SHIPPING_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <label
              key={opt.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md, 10px)",
                border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                background: isSelected
                  ? "rgba(93,68,50,.04)"
                  : "var(--color-surface-raised)",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSelect(opt.id)}
                  style={{
                    accentColor: "var(--color-primary)",
                    width: 16,
                    height: 16,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: ".9rem",
                      color: "var(--color-text)",
                      marginBottom: ".15rem",
                    }}
                  >
                    {opt.name}
                  </p>
                  <p
                    style={{
                      fontSize: ".78rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {opt.description} · {opt.estimatedDays}
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: ".9rem",
                  color: "var(--color-text)",
                  whiteSpace: "nowrap",
                }}
              >
                {formatNaira(opt.price)}
              </span>
            </label>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: ".5rem" }}>
        <button
          onClick={onBack}
          className="btn btn-outline"
          style={{ flex: "0 0 auto" }}
        >
          ← Back
        </button>
        <button
          onClick={onContinue}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}

// ── Payment panel ─────────────────────────────────────────────────────────────
function PaymentPanel({
  cart,
  isProcessing,
  error,
  onPay,
  onBack,
}: {
  cart: {
    items: any[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  isProcessing: boolean;
  error: string | null;
  onPay: () => void;
  onBack: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {cart.items.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
          >
            <div
              style={{
                width: 48,
                height: 56,
                position: "relative",
                flexShrink: 0,
                borderRadius: "var(--radius-sm, 6px)",
                overflow: "hidden",
                background: "var(--color-secondary)",
              }}
            >
              {item.product.images?.[0] ? (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  🎁
                </div>
              )}
              <span
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                {item.quantity}
              </span>
            </div>
            <p
              style={{
                flex: 1,
                fontSize: ".85rem",
                fontWeight: 500,
                color: "var(--color-text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.product.name}
            </p>
            <span
              style={{
                fontSize: ".85rem",
                fontWeight: 600,
                color: "var(--color-text)",
                flexShrink: 0,
              }}
            >
              {formatNaira(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {[
          { label: "Subtotal", value: formatNaira(cart.subtotal) },
          { label: "Shipping", value: formatNaira(cart.shipping) },
          { label: "Tax", value: formatNaira(cart.tax) },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: ".85rem",
            }}
          >
            <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
            <span style={{ color: "var(--color-text)" }}>{value}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: "1rem",
            paddingTop: ".75rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span style={{ color: "var(--color-text)" }}>Total</span>
          <span style={{ color: "var(--color-primary)" }}>
            {formatNaira(cart.total)}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-sm, 6px)",
            background: "#FEE2E2",
            borderLeft: "4px solid var(--color-danger, #dc2626)",
            fontSize: ".85rem",
            color: "var(--color-danger, #dc2626)",
          }}
        >
          {error}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: "flex", gap: "1rem", marginTop: ".25rem" }}>
        <button
          onClick={onBack}
          className="btn btn-outline"
          disabled={isProcessing}
          style={{ flex: "0 0 auto" }}
        >
          ← Back
        </button>
        <button
          onClick={onPay}
          disabled={isProcessing}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".6rem",
            background: isProcessing ? "#aaa" : "#0ba360",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md, 10px)",
            padding: ".9rem 1.5rem",
            fontSize: ".95rem",
            fontWeight: 700,
            cursor: isProcessing ? "not-allowed" : "pointer",
            transition: "background 150ms ease",
          }}
        >
          {isProcessing ? (
            <>
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(255,255,255,.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                  display: "inline-block",
                }}
              />
              Processing…
            </>
          ) : (
            <>🔰 Pay with Paystack</>
          )}
        </button>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: ".75rem",
          color: "var(--color-text-muted)",
          marginTop: "-.5rem",
        }}
      >
        🔒 Secured by Paystack — 256-bit SSL
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Confirmation screen ───────────────────────────────────────────────────────
function ConfirmationScreen({ orderNumber }: { orderNumber: string | null }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        animation: "fadeIn .4s ease",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(34,197,94,.35)",
          animation: "scaleIn .45s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <Check size={38} color="#fff" strokeWidth={3} />
      </div>

      <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>🎊</div>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 300,
          color: "var(--color-text)",
          margin: 0,
        }}
      >
        Order Confirmed!
      </h2>

      {orderNumber && (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: ".85rem",
            fontWeight: 700,
            padding: ".4rem 1rem",
            borderRadius: 999,
            background: "var(--color-secondary)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            letterSpacing: ".06em",
          }}
        >
          {orderNumber}
        </span>
      )}

      <p
        style={{
          fontSize: ".95rem",
          color: "var(--color-text-muted)",
          maxWidth: 420,
          lineHeight: 1.65,
        }}
      >
        Your order is being prepared. You'll receive updates via email as your
        items make their way to you.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: ".5rem",
        }}
      >
        <Link href="/orders" className="btn btn-outline">
          View My Orders
        </Link>
        <Link href="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn   { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes scaleIn  { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSelector((s: RootState) => s.cart);
  const { user, isLoading: authLoading } = useAuth();

  const {
    step,
    setStep,
    shippingAddress,
    setShippingAddress,
    selectedShipping,
    selectShippingOption,
    shippingOptions,
    placeOrder,
    orderId,
    orderNumber,
    isProcessing,
    error,
  } = useCheckout();

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/checkout");
    }
  }, [authLoading, user, router]);

  // Empty-cart guard
  useEffect(() => {
    if (
      cart.items.length === 0 &&
      step !== "confirmation" &&
      step !== "processing"
    ) {
      router.replace("/cart");
    }
  }, [cart.items.length, step, router]);

  if (authLoading || (!user && step !== "confirmation")) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "6rem 2rem",
          color: "var(--color-text-muted)",
          fontSize: ".9rem",
        }}
      >
        Loading…
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    padding: "2rem",
    borderRadius: "var(--radius-lg, 14px)",
    background: "var(--color-surface-raised)",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-sm)",
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", paddingTop: "1rem" }}>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
          fontWeight: 300,
          color: "var(--color-text)",
          marginBottom: "1.75rem",
        }}
      >
        Checkout
      </h1>

      <StepIndicator currentStep={step} />

      {/* Confirmation */}
      {step === "confirmation" && (
        <div style={cardStyle}>
          <ConfirmationScreen orderNumber={orderNumber} />
        </div>
      )}

      {/* Processing overlay */}
      {step === "processing" && (
        <div
          style={{
            ...cardStyle,
            textAlign: "center",
            padding: "4rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "3px solid var(--color-border)",
              borderTopColor: "var(--color-primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "var(--color-text-muted)", fontSize: ".95rem" }}>
            Creating your order…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Address step */}
      {step === "address" && (
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "1.5rem",
            }}
          >
            Delivery Address
          </h2>
          <AddressForm onSubmit={setShippingAddress} />
        </div>
      )}

      {/* Shipping step */}
      {step === "shipping" && shippingAddress && (
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "1.5rem",
            }}
          >
            Shipping Method
          </h2>
          <ShippingSelector
            address={shippingAddress}
            selected={selectedShipping}
            onSelect={(id) => {
              const opt = shippingOptions.find((o) => o.id === id);
              if (opt) {
                // Just update local selection without advancing
                selectShippingOption(id as any);
                // selectShippingOption advances step; back it up so user can confirm
                setStep("shipping");
              }
            }}
            onBack={() => setStep("address")}
            onContinue={() => selectShippingOption(selectedShipping)}
          />
        </div>
      )}

      {/* Payment step */}
      {step === "payment" && (
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "1.5rem",
            }}
          >
            Order Summary &amp; Payment
          </h2>
          <PaymentPanel
            cart={cart}
            isProcessing={isProcessing}
            error={error}
            onPay={placeOrder}
            onBack={() => setStep("shipping")}
          />
        </div>
      )}
    </div>
  );
}
