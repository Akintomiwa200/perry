import api from '@/lib/api';
import { Product, ProductFilters, ProductsResponse } from '@/types/product.types';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const { data } = await api.get('/products', { params: filters });
    return data;
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await api.get('/products/featured');
    return data;
  },

  async getProductsByCategory(category: string, filters?: ProductFilters): Promise<ProductsResponse> {
    const { data } = await api.get(`/products/category/${category}`, { params: filters });
    return data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await api.get('/products/search', { params: { q: query } });
    return data;
  },
};
