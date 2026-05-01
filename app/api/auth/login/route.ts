import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { signToken, createUserSession } from '@/lib/session';
import { parseBody, loginSchema } from '@/lib/validation';
import { ok, err } from '@/lib/middleware';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseBody(loginSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { email, password } = parsed.data;

    const user = await queryOne<{
      id: number;
      email: string;
      name: string;
      role: string;
      password_hash: string;
      created_at: string;
    }>(
      'SELECT id, email, name, role, password_hash, created_at FROM users WHERE email = $1',
      [email],
    );

    if (!user) return err('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return err('Invalid credentials', 401);

    const { password_hash, ...safeUser } = user;

    const token = await signToken({
      userId: String(safeUser.id),
      email: safeUser.email,
      role: safeUser.role as 'user' | 'admin' | 'super_admin',
    });
    const [first = '', ...rest] = (safeUser.name ?? '').trim().split(/\s+/);
    const mappedUser = {
      id: String(safeUser.id),
      email: safeUser.email,
      firstName: first,
      lastName: rest.join(' '),
      role: safeUser.role,
      isActive: true,
      emailVerified: true,
      createdAt: safeUser.created_at,
    };

    const res = ok({ user: mappedUser, token });
    createUserSession(res, {
      userId: String(safeUser.id),
      email: safeUser.email,
      role: safeUser.role as 'user' | 'admin' | 'super_admin',
    });
    return res;
  } catch (e) {
    console.error('[POST /api/auth/login]', e);
    return err('Internal server error', 500);
  }
}
