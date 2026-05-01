import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { getSession, signToken, createUserSession } from '@/lib/session';
import { parseBody, registerSchema } from '@/lib/validation';
import { ok, err } from '@/lib/middleware';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseBody(registerSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { email, password, firstName, lastName } = parsed.data;
    const name = `${firstName} ${lastName}`.trim();

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
       VALUES ($1, $2, $3, 'user')
       RETURNING id, email, name, role, created_at`,
      [email, password_hash, name],
    );

    if (!user) return err('Failed to create user', 500);

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
    createUserSession(res, {
      userId: String(user.id),
      email: user.email,
      role: user.role as 'user' | 'admin' | 'super_admin',
    });
    return res;
  } catch (e) {
    console.error('[POST /api/auth/register]', e);
    return err('Internal server error', 500);
  }
}
