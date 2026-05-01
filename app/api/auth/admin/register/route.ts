import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { queryOne } from '@/lib/db';
import {
  getAdminSession,
  signToken,
  createAdminSession,
} from '@/lib/session';
import { parseBody, registerSchema } from '@/lib/validation';
import { ok, err } from '@/lib/middleware';

const adminRegisterSchema = registerSchema.extend({
  role: z.enum(['admin', 'super_admin']).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseBody(adminRegisterSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const adminCount = await queryOne<{ count: string }>(
      `SELECT COUNT(*) AS count FROM users WHERE role IN ('admin', 'super_admin')`,
      [],
    );
    const hasAdmin = Number(adminCount?.count ?? '0') > 0;

    if (hasAdmin) {
      const session = await getAdminSession();
      if (!session) return err('Unauthorized', 401);
      if (session.role !== 'super_admin') {
        return err('Only super admins can create admin accounts', 403);
      }
    }

    const { email, password, firstName, lastName } = parsed.data;
    const name = `${firstName} ${lastName}`.trim();
    const role = hasAdmin ? parsed.data.role ?? 'admin' : 'super_admin';

    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );
    if (existing) return err('Email already in use', 409);

    const password_hash = await bcrypt.hash(password, 12);

    const user = await queryOne<{
      id: number;
      email: string;
      name: string;
      role: string;
      created_at: string;
    }>(
      `INSERT INTO users (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, role, created_at`,
      [email, password_hash, name, role],
    );

    if (!user) return err('Failed to create admin user', 500);

    const token = await signToken({
      userId: String(user.id),
      email: user.email,
      role: user.role as 'user' | 'admin' | 'super_admin',
    });

    const [first = '', ...rest] = (user.name ?? '').trim().split(/\s+/);
    const mappedUser = {
      id: String(user.id),
      email: user.email,
      firstName: first,
      lastName: rest.join(' '),
      role: user.role,
      isActive: true,
      emailVerified: true,
      createdAt: user.created_at,
    };

    const res = ok({ user: mappedUser, token }, 201);
    createAdminSession(res, {
      userId: String(user.id),
      email: user.email,
      role: user.role as 'user' | 'admin' | 'super_admin',
    });
    return res;
  } catch (e) {
    console.error('[POST /api/auth/admin/register]', e);
    return err('Internal server error', 500);
  }
}
