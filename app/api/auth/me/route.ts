import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

export const GET = withAuth(async (request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const user = await queryOne<{
      id: number;
      email: string;
      name: string;
      role: string;
      created_at: string;
      updated_at: string;
    }>(
      'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = $1',
      [session.id],
    );

    if (!user) return err('User not found', 404);

    return ok({ user });
  } catch (e) {
    console.error('[GET /api/auth/me]', e);
    return err('Internal server error', 500);
  }
});
