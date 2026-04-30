import { useState, useEffect, useCallback } from "react";
import { Product, ProductFilters } from "@/types/product.types";
import { productService } from "@/services/productService";

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data.products);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters?.category, filters?.search, filters?.page, filters?.limit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    total,
    totalPages,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);

    productService
      .getProductBySlug(slug)
      .then((p) => setProduct(p))
      .catch(() => setError("Product not found"))
      .finally(() => setIsLoading(false));
  }, [slug]);

  return { product, isLoading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    productService
      .getFeaturedProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to load featured products"))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, isLoading, error };
}
