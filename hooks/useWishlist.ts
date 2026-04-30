import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { Product } from '@/types/product.types';

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<WishlistItem[]>('/wishlist');
      setItems(data);
    } catch {
      setError('Failed to load wishlist.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const add = async (productId: string) => {
    try {
      const { data } = await api.post<WishlistItem>('/wishlist', { productId });
      setItems((prev) => [...prev, data]);
    } catch {
      setError('Failed to add to wishlist.');
    }
  };

  const remove = async (productId: string) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch {
      setError('Failed to remove from wishlist.');
    }
  };

  const isInWishlist = (productId: string) =>
    items.some((item) => item.productId === productId);

  return { items, isLoading, error, add, remove, isInWishlist };
}
