import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Existing helpers ──────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function calculateDiscount(
  price: number,
  compareAtPrice: number,
): number {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

// ── New helpers ───────────────────────────────────────────────────────────────

/**
 * Formats a number as Nigerian Naira (₦) using en-NG locale.
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

/**
 * Generates a product SKU from a category and zero-padded index.
 * e.g. generateSKU('shoes', 1) => 'SHOES-001'
 */
export function generateSKU(category: string, index: number): string {
  return `${category.toUpperCase()}-${String(index).padStart(3, "0")}`;
}

/**
 * Returns pagination metadata.
 */
export function paginate(
  total: number,
  page: number,
  limit: number,
): {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Type-safe object pick — returns a new object containing only the given keys.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Type-safe object omit — returns a new object with the given keys removed.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const keySet = new Set<PropertyKey>(keys);
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keySet.has(k)),
  ) as Omit<T, K>;
}
