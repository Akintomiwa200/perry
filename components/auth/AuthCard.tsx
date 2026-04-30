import Link from "next/link";
import { ReactNode } from "react";
import { Coffee } from "lucide-react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md mx-auto animate-fade-in ${className}`}
      style={{
        padding: "2.5rem",
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Perry logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "var(--deep)",
          }}
        >
          <Coffee
            size={22}
            strokeWidth={1.5}
            style={{ color: "var(--terracotta)" }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--deep)",
            }}
          >
            Perry
          </span>
        </Link>
      </div>

      {children}
    </div>
  );
}
