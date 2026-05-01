import { withAdmin, ok, err } from "@/lib/middleware";
import { query, queryOne } from "@/lib/db";

async function ensureReadsTable() {
  await query(
    `CREATE TABLE IF NOT EXISTS admin_notification_reads (
      admin_id TEXT NOT NULL,
      notification_id TEXT NOT NULL,
      read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (admin_id, notification_id)
    )`,
  );
}

export const GET = withAdmin(async (_req, _ctx, session) => {
  try {
    await ensureReadsTable();

    const [pendingOrders, lowStock, pendingReviews, readRows] = await Promise.all([
      queryOne<{ count: string }>(
        "SELECT COUNT(*)::text AS count FROM orders WHERE status = 'pending'",
      ),
      queryOne<{ count: string }>(
        "SELECT COUNT(*)::text AS count FROM products WHERE stock <= 10 AND status = 'active'",
      ),
      queryOne<{ count: string }>(
        "SELECT COUNT(*)::text AS count FROM reviews WHERE is_approved = false",
      ),
      query<{ notification_id: string }>(
        "SELECT notification_id FROM admin_notification_reads WHERE admin_id = $1",
        [session.userId],
      ),
    ]);

    const readIds = new Set(readRows.map((r) => r.notification_id));

    const notifications = [
      {
        id: "pending-orders",
        title: "Pending orders",
        desc: `${Number(pendingOrders?.count ?? "0")} orders awaiting processing`,
        time: "live",
        read: readIds.has("pending-orders"),
        href: "/admin/orders/pending",
      },
      {
        id: "low-stock",
        title: "Low stock alert",
        desc: `${Number(lowStock?.count ?? "0")} products are low/out of stock`,
        time: "live",
        read: readIds.has("low-stock"),
        href: "/admin/inventory/low-stock",
      },
      {
        id: "pending-reviews",
        title: "Reviews moderation",
        desc: `${Number(pendingReviews?.count ?? "0")} reviews need approval`,
        time: "live",
        read: readIds.has("pending-reviews"),
        href: "/admin/products/reviews",
      },
    ];

    return ok({ notifications });
  } catch (e) {
    console.error("[GET /api/admin/notifications]", e);
    return err("Failed to load notifications", 500);
  }
});

export const PUT = withAdmin(async (req, _ctx, session) => {
  try {
    await ensureReadsTable();
    const { notificationId, markAs } = await req.json();

    if (!notificationId || typeof markAs !== "boolean") {
      return err("Invalid request body", 400);
    }

    if (markAs) {
      await query(
        `INSERT INTO admin_notification_reads (admin_id, notification_id, read_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (admin_id, notification_id) DO UPDATE SET read_at = NOW()`,
        [session.userId, notificationId],
      );
    } else {
      await query(
        "DELETE FROM admin_notification_reads WHERE admin_id = $1 AND notification_id = $2",
        [session.userId, notificationId],
      );
    }

    return ok({ success: true });
  } catch (e) {
    console.error("[PUT /api/admin/notifications]", e);
    return err("Failed to update notification read state", 500);
  }
});
