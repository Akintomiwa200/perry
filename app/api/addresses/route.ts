import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/middleware';
import { parseBody, addressSchema } from '@/lib/validation';

// GET — fetch all addresses for the logged-in user
export const GET = withAuth(async (_req: NextRequest, _ctx: any, session) => {
  try {
    const addresses = await query(
      `SELECT id, label, first_name, last_name, street, city, state, zip, country, is_default, created_at
       FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at ASC`,
      [session.userId],
    );
    return ok({ addresses });
  } catch (e) {
    console.error('[GET /api/addresses]', e);
    return err('Internal server error', 500);
  }
});

// POST — create a new address
export const POST = withAuth(async (req: NextRequest, _ctx: any, session) => {
  try {
    const body = await req.json();
    const parsed = parseBody(addressSchema, body);
    if (!parsed.success) return err(parsed.error!, 400);

    const { label, firstName, lastName, street, city, state, zip, country, isDefault } = parsed.data;

    // If new address is default, unset all others first
    if (isDefault) {
      await query(
        'UPDATE addresses SET is_default = false WHERE user_id = $1',
        [session.userId],
      );
    }

    const address = await queryOne(
      `INSERT INTO addresses (user_id, label, first_name, last_name, street, city, state, zip, country, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, label, first_name, last_name, street, city, state, zip, country, is_default, created_at`,
      [session.userId, label, firstName, lastName, street, city, state, zip || '', country, isDefault ?? false],
    );

    return ok({ address }, 201);
  } catch (e) {
    console.error('[POST /api/addresses]', e);
    return err('Internal server error', 500);
  }
});
