import { Gift, Plus, CreditCard, CheckCircle, RefreshCw } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type GiftCardStatus = "active" | "redeemed" | "expired" | "pending";

interface GiftCard {
  code: string;
  recipient: string;
  initialValue: number;
  balance: number;
  issuedDate: string;
  expiry: string;
  status: GiftCardStatus;
}

const GIFT_CARDS: GiftCard[] = [
  {
    code: "GC-PY-4821",
    recipient: "Amara Okafor",
    initialValue: 10000,
    balance: 7500,
    issuedDate: "May 1, 2025",
    expiry: "May 1, 2026",
    status: "active",
  },
  {
    code: "GC-PY-3309",
    recipient: "Chioma Nwosu",
    initialValue: 25000,
    balance: 0,
    issuedDate: "Feb 14, 2025",
    expiry: "Feb 14, 2026",
    status: "redeemed",
  },
  {
    code: "GC-PY-5517",
    recipient: "Bolanle Ade",
    initialValue: 15000,
    balance: 15000,
    issuedDate: "Jun 5, 2025",
    expiry: "Jun 5, 2026",
    status: "active",
  },
  {
    code: "GC-PY-2248",
    recipient: "Ngozi Eze",
    initialValue: 5000,
    balance: 0,
    issuedDate: "Mar 20, 2025",
    expiry: "Mar 20, 2026",
    status: "redeemed",
  },
  {
    code: "GC-PY-7764",
    recipient: "Funmi Bakare",
    initialValue: 20000,
    balance: 12000,
    issuedDate: "Apr 10, 2025",
    expiry: "Apr 10, 2026",
    status: "active",
  },
  {
    code: "GC-PY-1102",
    recipient: "Adeola Martins",
    initialValue: 8000,
    balance: 8000,
    issuedDate: "Dec 25, 2024",
    expiry: "Dec 25, 2025",
    status: "expired",
  },
];

const statusVariant: Record<
  GiftCardStatus,
  "success" | "neutral" | "danger" | "warning"
> = {
  active: "success",
  redeemed: "neutral",
  expired: "danger",
  pending: "warning",
};

export default function GiftCardsPage() {
  const totalIssued = GIFT_CARDS.length;
  const active = GIFT_CARDS.filter((g) => g.status === "active").length;
  const redeemed = GIFT_CARDS.filter((g) => g.status === "redeemed").length;
  const totalValue = GIFT_CARDS.reduce((acc, g) => acc + g.initialValue, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-semibold mb-1"
            style={{
              color: "var(--deep)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Gift Cards
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Issue and track Perry Collectibles gift cards
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={14} />
          Issue Gift Card
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Issued",
            value: totalIssued,
            icon: CreditCard,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Active",
            value: active,
            icon: CheckCircle,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Redeemed",
            value: redeemed,
            icon: RefreshCw,
            color: "var(--color-text-muted)",
            bg: "var(--color-secondary)",
          },
          {
            label: "Total Value",
            value: `₦${totalValue.toLocaleString()}`,
            icon: Gift,
            color: "var(--terracotta)",
            bg: "#FEE2E2",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl p-4"
            style={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="rounded-lg p-2.5 shrink-0"
              style={{ background: bg }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-wide font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {label}
              </p>
              <p
                className="text-xl font-bold mt-0.5"
                style={{ color: "var(--color-text)" }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {[
                "Gift Card Code",
                "Recipient",
                "Initial Value",
                "Balance Remaining",
                "Issued Date",
                "Expiry",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GIFT_CARDS.map((card, idx) => {
              const usedPct = Math.round(
                ((card.initialValue - card.balance) / card.initialValue) * 100,
              );
              return (
                <tr
                  key={card.code}
                  style={{
                    background: "var(--color-surface-raised)",
                    borderBottom:
                      idx < GIFT_CARDS.length - 1
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  {/* Code */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Gift size={13} style={{ color: "var(--gold)" }} />
                      <code
                        className="text-sm font-mono font-semibold tracking-wider px-2 py-0.5 rounded"
                        style={{
                          background: "var(--color-secondary)",
                          color: "var(--deep)",
                        }}
                      >
                        {card.code}
                      </code>
                    </div>
                  </td>
                  {/* Recipient */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {card.recipient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text)" }}
                      >
                        {card.recipient}
                      </span>
                    </div>
                  </td>
                  {/* Initial Value */}
                  <td
                    className="px-5 py-4 text-sm font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    ₦{card.initialValue.toLocaleString()}
                  </td>
                  {/* Balance */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            card.balance === 0
                              ? "var(--color-text-muted)"
                              : "var(--color-success)",
                        }}
                      >
                        ₦{card.balance.toLocaleString()}
                      </span>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{
                          width: "80px",
                          background: "var(--color-secondary)",
                        }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${usedPct}%`,
                            background:
                              usedPct === 100
                                ? "var(--color-text-muted)"
                                : "var(--gold)",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  {/* Issued Date */}
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {card.issuedDate}
                  </td>
                  {/* Expiry */}
                  <td
                    className="px-5 py-4 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {card.expiry}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={
                        card.status.charAt(0).toUpperCase() +
                        card.status.slice(1)
                      }
                      variant={statusVariant[card.status]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
