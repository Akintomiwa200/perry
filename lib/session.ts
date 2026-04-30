import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
}

const USER_COOKIE = 'perry_session';
const ADMIN_COOKIE = 'perry_admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? 'dev-secret-change-me';
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get(ADMIN_COOKIE)?.value ?? cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session || (session.role !== 'admin' && session.role !== 'super_admin')) {
    return null;
  }
  return session;
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
};

export async function createUserSession(
  response: NextResponse,
  payload: SessionPayload,
): Promise<NextResponse> {
  const token = await signToken(payload);
  response.cookies.set(USER_COOKIE, token, cookieOptions);
  return response;
}

export async function createAdminSession(
  response: NextResponse,
  payload: SessionPayload,
): Promise<NextResponse> {
  const token = await signToken(payload);
  response.cookies.set(ADMIN_COOKIE, token, cookieOptions);
  return response;
}

export function clearSession(response: NextResponse): NextResponse {
  response.cookies.set(USER_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  return response;
}

export function clearAdminSession(response: NextResponse): NextResponse {
  response.cookies.set(ADMIN_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  return response;
}
