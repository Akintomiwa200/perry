import { UserCheck } from "lucide-react";

export default function LoyaltyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            color: "var(--deep)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Loyalty Program
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Manage customer loyalty rewards
        </p>
      </div>
      <div
        className="card"
        style={{ background: "var(--color-surface)", padding: "24px" }}
      >
        <p style={{ color: "var(--mid)" }}>
          Loyalty program content coming soon...
        </p>
      </div>
    </div>
  );
}
