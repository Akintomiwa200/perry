import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters, ProductsResponse } from '@/types/product.types';
import { mockProducts } from '@/lib/db';

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In production, replace with: const data = await productService.getProducts(filters);
      let data = [...mockProducts];
      if (filters?.category) data = data.filter((p) => p.category === filters.category);
      if (filters?.search) data = data.filter((p) => p.name.toLowerCase().includes(filters.search!.toLowerCase()));
      setProducts(data);
      setTotal(data.length);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [filters?.category, filters?.search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, total, isLoading, error, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const found = mockProducts.find((p) => p.slug === slug) || null;
    setProduct(found);
    if (!found) setError('Product not found');
    setIsLoading(false);
  }, [slug]);

  return { product, isLoading, error };
}
