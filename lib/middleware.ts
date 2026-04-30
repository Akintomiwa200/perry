import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, type SessionPayload } from './session';

type Handler = (
  req: NextRequest,
  ctx: { params: any },
  session: SessionPayload,
) => Promise<NextResponse> | NextResponse;

/**
 * Wraps a route handler — requires a valid user session (cookie OR Bearer token).
 */
export function withAuth(handler: Handler) {
  return async (req: NextRequest, ctx: { params: any }) => {
    const cookieToken = req.cookies.get('perry_session')?.value;
    const headerToken = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken ?? headerToken;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const session = await verifyToken(token);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return handler(req, ctx, session);
  };
}

/**
 * Wraps a route handler — requires admin or super_admin role.
 */
export function withAdmin(handler: Handler) {
  return async (req: NextRequest, ctx: { params: any }) => {
    const cookieToken =
      req.cookies.get('perry_admin_session')?.value ??
      req.cookies.get('perry_session')?.value;
    const headerToken = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken ?? headerToken;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const session = await verifyToken(token);
    if (!session || (session.role !== 'admin' && session.role !== 'super_admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return handler(req, ctx, session);
  };
}

// ── Standard JSON helpers ─────────────────────────────────────────────────────

export const ok = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

export const err = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });
