import api from '@/lib/api';
import { Cart } from '@/types/cart.types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const { data } = await api.get('/cart');
    return data;
  },

  async syncCart(items: Cart['items']): Promise<Cart> {
    const { data } = await api.post('/cart/sync', { items });
    return data;
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
};
