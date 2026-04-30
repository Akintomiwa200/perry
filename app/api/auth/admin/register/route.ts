import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { parseBody, registerSchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';
import { z } from 'zod';

const adminRegisterSchema = registerSchema.extend({
  role: z.enum(['admin', 'super_admin']),
});

export const POST = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = parseBody(adminRegisterSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { email, password, name, role } = parsed.data;

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

    return ok({ user }, 201);
  } catch (e) {
    console.error('[POST /api/auth/admin/register]', e);
    return err('Internal server error', 500);
  }
});
