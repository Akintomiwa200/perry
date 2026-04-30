import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

const pool: Pool =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") global._pgPool = pool;

export default pool;

export async function query<T = any>(
  text: string,
  params?: any[],
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export async function queryOne<T = any>(
  text: string,
  params?: any[],
): Promise<T | null> {
  const result = await pool.query(text, params);
  return result.rows[0] ?? null;
}
