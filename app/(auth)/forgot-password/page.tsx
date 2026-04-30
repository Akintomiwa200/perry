"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import AuthInput from "@/components/auth/AuthInput";
import ErrorAlert from "@/components/auth/ErrorAlert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFieldError("Please enter a valid email address");
      return false;
    }
    setFieldError("");
    return true;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setApiError("");
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
    } catch {
      // For security we still show the success state regardless — server may
      // return an error for non-existent emails, but we don't reveal that.
    } finally {
      setIsLoading(false);
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <CheckCircle
          size={48}
          style={{ color: "var(--color-success)", margin: "0 auto 1rem" }}
        />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem",
            fontWeight: 400,
            color: "var(--deep)",
            marginBottom: "0.5rem",
          }}
        >
          Check your inbox
        </h2>
        <p
          style={{
            fontSize: ".9rem",
            color: "var(--mid)",
            marginBottom: "1.5rem",
          }}
        >
          If <strong>{email}</strong> is registered, you&apos;ll receive a reset
          link shortly. It expires in 30 minutes.
        </p>
        <Link
          href="/login"
          style={{
            display: "inline-block",
            background: "var(--deep)",
            color: "var(--cream)",
            fontSize: ".78rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "0.875rem 2rem",
            textDecoration: "none",
          }}
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

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
          Reset password
        </h2>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Enter your email and we&apos;ll send a reset link
        </p>
      </div>

      {apiError && <ErrorAlert message={apiError} />}

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
            setFieldError("");
          }}
          error={fieldError}
          placeholder="jane@example.com"
          autoComplete="email"
        />

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
              Sending…
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <p
        className="text-center text-sm mt-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        Remembered it?{" "}
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
