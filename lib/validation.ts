import { z } from "zod";

// ── Auth ──────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

// ── Product ───────────────────────────────────────────────────────────────────

export const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string().url()),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  stock: z.number().int().min(0),
  sku: z.string().min(1),
  featured: z.boolean().default(false),
  isNew: z.boolean().default(true),
  isSale: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

// ── Order ─────────────────────────────────────────────────────────────────────

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1),
      price: z.number().positive(),
    }),
  ),
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  }),
  shippingOption: z.enum(["standard", "express", "overnight"]),
  paymentMethod: z.string().min(1),
  notes: z.string().optional(),
});

// ── Review ────────────────────────────────────────────────────────────────────

export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(1000),
});

// ── Address ───────────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  label: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
  isDefault: z.boolean().default(false),
});

// ── Category ──────────────────────────────────────────────────────────────────

export const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  parentId: z.string().optional(),
});

// ── Coupon ────────────────────────────────────────────────────────────────────

export const createCouponSchema = z.object({
  code: z.string().min(1),
  type: z.enum(["percent", "fixed", "free_shipping"]),
  value: z.number().min(0),
  minOrder: z.number().min(0).default(0),
  usageLimit: z.number().int().min(1).optional(),
  expiresAt: z.string().datetime().optional(),
});

// ── Inventory Adjustment ──────────────────────────────────────────────────────

export const inventoryAdjustmentSchema = z.object({
  productId: z.string(),
  type: z.enum(["addition", "reduction", "correction"]),
  quantity: z.number().int(),
  reason: z.string().min(1),
});

// ── Pagination ────────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ── Order (admin update) ─────────────────────────────────────────────────────

export const updateOrderSchema = z.object({
  status: z
    .enum([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ])
    .optional(),
  tracking_number: z.string().min(1).optional(),
  notes: z.string().optional(),
});

// ── Helper ────────────────────────────────────────────────────────────────────

export function parseBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
):
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      data: null,
      error: result.error.issues[0]?.message ?? "Validation error",
    };
  }
  return { success: true, data: result.data, error: null };
}
