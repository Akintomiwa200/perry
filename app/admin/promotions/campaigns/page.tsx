import {
  Megaphone,
  Plus,
  Mail,
  MessageSquare,
  Bell,
  Users,
  TrendingUp,
  Calendar,
  Send,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type CampaignChannel = "Email" | "SMS" | "Push";
type CampaignStatus = "active" | "scheduled" | "completed" | "paused" | "draft";

interface Campaign {
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  audience: string;
  sent: number;
  reach: number;
  openRate: number;
  revenue: number;
  startDate: string;
  endDate: string;
  description: string;
}

const CAMPAIGNS: Campaign[] = [
  {
    name: "Eid Mubarak Collection Drop",
    channel: "Email",
    status: "completed",
    audience: "All Subscribers",
    sent: 4820,
    reach: 5100,
    openRate: 38.4,
    revenue: 1240000,
    startDate: "Mar 28, 2025",
    endDate: "Apr 5, 2025",
    description:
      "Exclusive Eid looks featuring our new Ankara and silk collections with 20% off sitewide.",
  },
  {
    name: "Summer Glow Beauty Push",
    channel: "Push",
    status: "active",
    audience: "App Users (Lagos)",
    sent: 2310,
    reach: 3400,
    openRate: 52.1,
    revenue: 345000,
    startDate: "Jun 1, 2025",
    endDate: "Jun 30, 2025",
    description:
      "Targeted push notifications for our new summer beauty range — lipsets, glow kits, and more.",
  },
  {
    name: "VIP Customer Appreciation",
    channel: "SMS",
    status: "active",
    audience: "VIP Customers (5+ Orders)",
    sent: 890,
    reach: 890,
    openRate: 71.2,
    revenue: 890000,
    startDate: "Jun 10, 2025",
    endDate: "Jun 20, 2025",
    description:
      "Exclusive 15% discount and early access to new arrivals for our most loyal shoppers.",
  },
  {
    name: "Back-to-School Accessories",
    channel: "Email",
    status: "scheduled",
    audience: "Customers Aged 18–30",
    sent: 0,
    reach: 6200,
    openRate: 0,
    revenue: 0,
    startDate: "Sep 1, 2025",
    endDate: "Sep 14, 2025",
    description:
      "Trendy bags, headwraps, and jewellery perfect for the new academic season.",
  },
];

const statusVariant: Record<
  CampaignStatus,
  "success" | "info" | "neutral" | "warning" | "danger"
> = {
  active: "success",
  scheduled: "info",
  completed: "neutral",
  paused: "warning",
  draft: "neutral",
};

const channelConfig: Record<
  CampaignChannel,
  { icon: typeof Mail; bg: string; color: string; label: string }
> = {
  Email: { icon: Mail, bg: "#DBEAFE", color: "#1D4ED8", label: "Email" },
  SMS: { icon: MessageSquare, bg: "#DCFCE7", color: "#15803D", label: "SMS" },
  Push: { icon: Bell, bg: "#FEF3C7", color: "#D97706", label: "Push" },
};

export default function CampaignsPage() {
  const active = CAMPAIGNS.filter((c) => c.status === "active").length;
  const totalSent = CAMPAIGNS.reduce((acc, c) => acc + c.sent, 0);
  const totalRevenue = CAMPAIGNS.reduce((acc, c) => acc + c.revenue, 0);

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
            Campaigns
          </h1>
          <p className="text-sm" style={{ color: "var(--mid)" }}>
            Plan and track marketing campaigns across channels
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={14} />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Active Campaigns",
            value: active,
            icon: Megaphone,
            color: "var(--color-success)",
            bg: "#DCFCE7",
          },
          {
            label: "Total Messages Sent",
            value: totalSent.toLocaleString(),
            icon: Send,
            color: "#2563EB",
            bg: "#DBEAFE",
          },
          {
            label: "Revenue Generated",
            value: `₦${(totalRevenue / 1000).toFixed(0)}k`,
            icon: TrendingUp,
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

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {CAMPAIGNS.map((campaign) => {
          const ch = channelConfig[campaign.channel];
          const ChIcon = ch.icon;
          return (
            <div
              key={campaign.name}
              className="rounded-xl p-5 flex flex-col gap-4"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: ch.bg }}
                  >
                    <ChIcon size={17} style={{ color: ch.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-base font-semibold leading-snug"
                      style={{ color: "var(--deep)" }}
                    >
                      {campaign.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{ background: ch.bg, color: ch.color }}
                      >
                        <ChIcon size={10} />
                        {ch.label}
                      </span>
                      <StatusBadge
                        label={
                          campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)
                        }
                        variant={statusVariant[campaign.status]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {campaign.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users
                      size={12}
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-wide font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Audience
                    </span>
                  </div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {campaign.audience}
                  </p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Send
                      size={12}
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-wide font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Sent / Reach
                    </span>
                  </div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {campaign.sent.toLocaleString()} /{" "}
                    {campaign.reach.toLocaleString()}
                  </p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp
                      size={12}
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-wide font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Open Rate
                    </span>
                  </div>
                  <p
                    className="text-sm font-bold"
                    style={{
                      color:
                        campaign.openRate > 0
                          ? "var(--color-success)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {campaign.openRate > 0 ? `${campaign.openRate}%` : "—"}
                  </p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp
                      size={12}
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-wide font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Revenue
                    </span>
                  </div>
                  <p
                    className="text-sm font-bold"
                    style={{
                      color:
                        campaign.revenue > 0
                          ? "var(--terracotta)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {campaign.revenue > 0
                      ? `₦${campaign.revenue.toLocaleString()}`
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Footer date range */}
              <div
                className="flex items-center gap-2 pt-3"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <Calendar
                  size={13}
                  style={{ color: "var(--color-text-muted)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {campaign.startDate} — {campaign.endDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
