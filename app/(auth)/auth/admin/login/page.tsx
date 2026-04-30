"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthInput from "@/components/auth/AuthInput";
import ErrorAlert from "@/components/auth/ErrorAlert";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = (): boolean => {
    const e: { email?: string; password?: string } = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      e.email = "A valid email is required";
    }
    if (!password || password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    const result = await adminLogin({ email, password });
    if (result.success) {
      router.push("/admin");
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
          Admin Portal
        </h2>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Perry Collectibles — Staff Access
        </p>
      </div>

      {error && <ErrorAlert message={error} />}

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <AuthInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            setFieldErrors((prev) => {
              const n = { ...prev };
              delete n.email;
              return n;
            });
          }}
          error={fieldErrors.email}
          placeholder="admin@example.com"
          autoComplete="email"
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            setFieldErrors((prev) => {
              const n = { ...prev };
              delete n.password;
              return n;
            });
          }}
          error={fieldErrors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/forgot-password"
            className="text-xs hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Forgot password?
          </Link>
        </div>

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
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p
        className="text-center text-sm mt-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        Don&apos;t have an admin account?{" "}
        <Link
          href="/auth/admin/register"
          className="font-medium hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
