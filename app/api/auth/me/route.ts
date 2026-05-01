import { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";
import { withAuth, ok, err } from "@/lib/middleware";

export const GET = withAuth(async (_request: NextRequest, _ctx: any, session) => {
  try {
    const user = await queryOne<{
      id: number;
      email: string;
      name: string;
      role: string;
      created_at: string;
      updated_at: string;
    }>(
      "SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = $1",
      [session.userId],
    );

    if (!user) return err("User not found", 404);

    const [first = "", ...rest] = (user.name ?? "").trim().split(/\s+/);
    return ok({
      user: {
        id: String(user.id),
        email: user.email,
        firstName: first,
        lastName: rest.join(" "),
        role: user.role,
        isActive: true,
        emailVerified: true,
        createdAt: user.created_at,
      },
    });
  } catch (e) {
    console.error("[GET /api/auth/me]", e);
    return err("Internal server error", 500);
  }
});

export const PATCH = withAuth(async (req: NextRequest, _ctx: any, session) => {
  try {
    const body = await req.json();
    const { firstName, lastName, phone } = body as {
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    const user = await queryOne(
      `UPDATE users
       SET first_name = COALESCE($1, first_name),
           last_name  = COALESCE($2, last_name),
           phone      = COALESCE($3, phone),
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, email, first_name, last_name, phone, role, created_at, updated_at`,
      [firstName ?? null, lastName ?? null, phone ?? null, session.userId],
    );

    if (!user) return err("User not found", 404);
    return ok({ user });
  } catch (e) {
    console.error("[PATCH /api/auth/me]", e);
    return err("Internal server error", 500);
  }
});
