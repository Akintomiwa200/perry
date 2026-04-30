import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (_request: Request) => {
  try {
    const adjustments = await query(
      `SELECT
         ia.id, ia.adjustment_type, ia.quantity, ia.reason,
         ia.stock_before, ia.stock_after, ia.created_at,
         p.id AS product_id, p.name AS product_name, p.slug AS product_slug, p.sku AS product_sku,
         u.id AS admin_id, u.name AS admin_name, u.email AS admin_email
       FROM inventory_adjustments ia
       JOIN products p ON ia.product_id = p.id
       JOIN users u ON ia.admin_id = u.id
       ORDER BY ia.created_at DESC`,
      [],
    );

    return ok({ adjustments });
  } catch (e) {
    console.error('[GET /api/inventory/adjustments]', e);
    return err('Internal server error', 500);
  }
});
