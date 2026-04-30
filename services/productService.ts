import api from "@/lib/api";
import {
  Product,
  ProductFilters,
  ProductsResponse,
} from "@/types/product.types";
import { Review } from "@/types/review.types";

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const { data } = await api.get<ProductsResponse>("/products", {
      params: filters,
    });
    return data;
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${slug}`);
    return data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products/featured");
    return data;
  },

  async getProductsByCategory(
    category: string,
    filters?: ProductFilters,
  ): Promise<ProductsResponse> {
    const { data } = await api.get<ProductsResponse>(
      `/products/category/${category}`,
      {
        params: filters,
      },
    );
    return data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products/search", {
      params: { q: query },
    });
    return data;
  },

  // Admin methods
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const { data } = await api.post<Product>("/products", productData);
    return data;
  },

  async updateProduct(
    slug: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    const { data } = await api.patch<Product>(`/products/${slug}`, productData);
    return data;
  },

  async deleteProduct(slug: string): Promise<void> {
    await api.delete(`/products/${slug}`);
  },

  async getProductReviews(slug: string): Promise<Review[]> {
    const { data } = await api.get<Review[]>(`/products/${slug}/reviews`);
    return data;
  },
};
