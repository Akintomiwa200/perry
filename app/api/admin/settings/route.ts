import { withAdmin, ok, err } from "@/lib/middleware";
import { query, queryOne } from "@/lib/db";

const DEFAULT_SETTINGS = {
  store: {
    storeName: "Perry Collectibles",
    storeTagline: "Luxury fashion & beauty, delivered.",
    contactEmail: "hello@perrycollectibles.com",
    supportPhone: "+234 800 000 0000",
    storeAddress: "14 Bola Ajibola Street, Ikeja, Lagos, Nigeria",
    regNo: "RC-1234567",
    currency: "NGN",
    timezone: "Africa/Lagos",
  },
  notifications: {
    newOrder: true,
    lowStock: true,
    outOfStock: true,
    newReview: true,
    supportTicket: true,
    campaignReport: false,
  },
  shipping: {
    shippingProvider: "GIG Logistics",
    freeShippingThreshold: 15000,
    standardRate: 1500,
    expressRate: 3500,
    processingTime: "1–2 business days",
    regions: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"],
  },
  payments: {
    paymentDescriptor: "PERRY STORE",
    vatRate: 7.5,
    methods: {
      paystack: true,
      flutterwave: true,
      bankTransfer: true,
      cashOnDelivery: false,
      payOnPickup: false,
    },
  },
};

async function ensureTable() {
  await query(
    `CREATE TABLE IF NOT EXISTS admin_settings (
      admin_id TEXT PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
  );
}

export const GET = withAdmin(async (_req, _ctx, session) => {
  try {
    await ensureTable();
    const row = await queryOne<{ data: any }>(
      "SELECT data FROM admin_settings WHERE admin_id = $1",
      [session.userId],
    );
    return ok({ settings: { ...DEFAULT_SETTINGS, ...(row?.data ?? {}) } });
  } catch (e) {
    console.error("[GET /api/admin/settings]", e);
    return err("Failed to load settings", 500);
  }
});

export const PUT = withAdmin(async (req, _ctx, session) => {
  try {
    await ensureTable();
    const body = await req.json();
    const prev = await queryOne<{ data: any }>(
      "SELECT data FROM admin_settings WHERE admin_id = $1",
      [session.userId],
    );
    const nextData = { ...(prev?.data ?? DEFAULT_SETTINGS), ...(body ?? {}) };
    const saved = await queryOne<{ data: any }>(
      `INSERT INTO admin_settings (admin_id, data, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (admin_id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
       RETURNING data`,
      [session.userId, JSON.stringify(nextData)],
    );
    return ok({ settings: saved?.data ?? nextData });
  } catch (e) {
    console.error("[PUT /api/admin/settings]", e);
    return err("Failed to save settings", 500);
  }
});
