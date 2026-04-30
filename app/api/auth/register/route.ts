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

    const { email, password, name } = parsed.data;

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

    const token = await signToken({ id: user.id, email: user.email, role: user.role });

    const res = ok({ user, token }, 201);
    createUserSession(res, { id: user.id, email: user.email, role: user.role });
    return res;
  } catch (e) {
    console.error('[POST /api/auth/register]', e);
    return err('Internal server error', 500);
  }
}
