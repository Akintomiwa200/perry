import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (_request: Request) => {
  try {
    const [
      revenueResult,
      ordersResult,
      customersResult,
      productsResult,
      lowStockResult,
      recentOrders,
    ] = await Promise.all([
      queryOne<{ total: string }>(
        `SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status != 'cancelled'`,
        [],
      ),
      queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM orders`,
        [],
      ),
      queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM users WHERE role = 'user'`,
        [],
      ),
      queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM products WHERE status = 'active'`,
        [],
      ),
      queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM products WHERE stock <= 10 AND status = 'active'`,
        [],
      ),
      query(
        `SELECT
           o.id, o.order_number, o.status, o.total, o.created_at,
           u.name AS customer_name, u.email AS customer_email
         FROM orders o
         JOIN users u ON o.user_id = u.id
         ORDER BY o.created_at DESC
         LIMIT 5`,
        [],
      ),
    ]);

    return ok({
      totalRevenue: parseFloat(revenueResult?.total ?? '0'),
      totalOrders: parseInt(ordersResult?.count ?? '0', 10),
      totalCustomers: parseInt(customersResult?.count ?? '0', 10),
      totalProducts: parseInt(productsResult?.count ?? '0', 10),
      recentOrders,
      lowStockCount: parseInt(lowStockResult?.count ?? '0', 10),
    });
  } catch (e) {
    console.error('[GET /api/admin/stats]', e);
    return err('Internal server error', 500);
  }
});
