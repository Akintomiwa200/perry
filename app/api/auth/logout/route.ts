import { NextResponse } from 'next/server';
import { clearSession, clearAdminSession } from '@/lib/session';
import { ok } from '@/lib/middleware';

export async function POST(_request: Request) {
  const res = ok({ success: true });
  clearSession(res);
  clearAdminSession(res);
  return res;
}
