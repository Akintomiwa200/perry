"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductList from "@/components/product/ProductList";
import type { ProductFilters } from "@/types/product.types";

const SORT_OPTIONS: {
  label: string;
  value: NonNullable<ProductFilters["sortBy"]>;
}[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Popular", value: "popular" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] =
    useState<NonNullable<ProductFilters["sortBy"]>>("newest");

  const filters: ProductFilters = {
    search: search || undefined,
    sortBy,
  };

  const { products, total, isLoading, error } = useProducts(filters);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            All Products
          </h1>
          {!isLoading && (
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {total} {total === 1 ? "product" : "products"} found
            </p>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm px-3 py-2"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              outline: "none",
              minWidth: 180,
            }}
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as NonNullable<ProductFilters["sortBy"]>)
            }
            className="text-sm px-3 py-2"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            background: "var(--color-danger)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
          }}
        >
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl"
              style={{
                background: "var(--color-secondary)",
                height: 320,
                borderRadius: "var(--radius-lg)",
              }}
            />
          ))}
        </div>
      ) : (
        <ProductList
          products={products}
          emptyMessage="No products found. Try adjusting your search or filters."
        />
      )}
    </div>
  );
}
