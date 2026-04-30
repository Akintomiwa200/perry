"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthInput from "@/components/auth/AuthInput";
import ErrorAlert from "@/components/auth/ErrorAlert";

function PasswordStrengthBar({ password }: { password: string }) {
  const len = password.length;

  // Determine strength: 0 = none, 1 = weak (<6), 2 = fair (6-7), 3 = good (>=8)
  const filledCount =
    len === 0 ? 0 : len < 6 ? 1 : len < 8 ? 2 : len < 12 ? 3 : 4;

  const getColor = (segmentIndex: number): string => {
    if (segmentIndex >= filledCount) return "var(--color-border)";
    if (len < 6) return "#DC2626"; // red
    if (len < 8) return "#D97706"; // amber
    return "#16A34A"; // green
  };

  const strengthLabel =
    len === 0
      ? ""
      : len < 6
        ? "Weak"
        : len < 8
          ? "Fair"
          : len < 12
            ? "Good"
            : "Strong";

  const labelColor =
    len === 0 ? "" : len < 6 ? "#DC2626" : len < 8 ? "#D97706" : "#16A34A";

  return (
    <div style={{ marginTop: "-0.25rem" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              background: getColor(i),
              transition: "background 0.25s",
            }}
          />
        ))}
      </div>
      {strengthLabel && (
        <p
          style={{ fontSize: "0.7rem", color: labelColor, textAlign: "right" }}
        >
          {strengthLabel}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) =>
    setFieldErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email is required";
    if (!form.password || form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (result.success) {
      router.push("/?welcome=1");
    }
  };

  return (
    <div>
      {/* Page heading */}
      <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem",
            fontWeight: 400,
            color: "var(--deep)",
            marginBottom: "0.35rem",
          }}
        >
          Create account
        </h2>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Join Perry Collectibles
        </p>
      </div>

      {error && <ErrorAlert message={error} />}

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Two-column name grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <AuthInput
            label="First Name"
            value={form.firstName}
            onChange={(v) => {
              setForm((p) => ({ ...p, firstName: v }));
              clearError("firstName");
            }}
            error={fieldErrors.firstName}
            placeholder="Jane"
            autoComplete="given-name"
          />
          <AuthInput
            label="Last Name"
            value={form.lastName}
            onChange={(v) => {
              setForm((p) => ({ ...p, lastName: v }));
              clearError("lastName");
            }}
            error={fieldErrors.lastName}
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>

        <AuthInput
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => {
            setForm((p) => ({ ...p, email: v }));
            clearError("email");
          }}
          error={fieldErrors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />

        <div>
          <AuthInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => {
              setForm((p) => ({ ...p, password: v }));
              clearError("password");
            }}
            error={fieldErrors.password}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
          />
          <PasswordStrengthBar password={form.password} />
        </div>

        <AuthInput
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={(v) => {
            setForm((p) => ({ ...p, confirm: v }));
            clearError("confirm");
          }}
          error={fieldErrors.confirm}
          placeholder="Re-enter password"
          autoComplete="new-password"
        />

        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          By creating an account you agree to our{" "}
          <Link
            href="/terms"
            className="underline"
            style={{ color: "var(--color-primary)" }}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline"
            style={{ color: "var(--color-primary)" }}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            background: "var(--deep)",
            color: "var(--cream)",
            fontSize: ".78rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "1rem 2rem",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            width: "100%",
            opacity: isLoading ? 0.75 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p
        className="text-center text-sm mt-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
