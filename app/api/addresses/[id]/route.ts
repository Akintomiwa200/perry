import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/middleware';
import { parseBody, addressSchema } from '@/lib/validation';

// PATCH — update address
export const PATCH = withAuth(async (req: NextRequest, ctx: { params: Promise<{ id: string }> }, session) => {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const parsed = parseBody(addressSchema.partial(), body);
    if (!parsed.success) return err(parsed.error!, 400);

    // Verify ownership
    const existing = await queryOne<{ id: string }>(
      'SELECT id FROM addresses WHERE id = $1 AND user_id = $2',
      [id, session.userId],
    );
    if (!existing) return err('Address not found', 404);

    const { label, firstName, lastName, street, city, state, zip, country, isDefault } = parsed.data;

    if (isDefault) {
      await query('UPDATE addresses SET is_default = false WHERE user_id = $1', [session.userId]);
    }

    const address = await queryOne(
      `UPDATE addresses
       SET label = COALESCE($1, label),
           first_name = COALESCE($2, first_name),
           last_name = COALESCE($3, last_name),
           street = COALESCE($4, street),
           city = COALESCE($5, city),
           state = COALESCE($6, state),
           zip = COALESCE($7, zip),
           country = COALESCE($8, country),
           is_default = COALESCE($9, is_default),
           updated_at = NOW()
       WHERE id = $10 AND user_id = $11
       RETURNING id, label, first_name, last_name, street, city, state, zip, country, is_default`,
      [label, firstName, lastName, street, city, state, zip, country, isDefault, id, session.userId],
    );

    return ok({ address });
  } catch (e) {
    console.error('[PATCH /api/addresses/:id]', e);
    return err('Internal server error', 500);
  }
});

// DELETE — remove address
export const DELETE = withAuth(async (_req: NextRequest, ctx: { params: Promise<{ id: string }> }, session) => {
  try {
    const { id } = await ctx.params;

    const deleted = await queryOne<{ id: string }>(
      'DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, session.userId],
    );
    if (!deleted) return err('Address not found', 404);

    return ok({ success: true });
  } catch (e) {
    console.error('[DELETE /api/addresses/:id]', e);
    return err('Internal server error', 500);
  }
});
