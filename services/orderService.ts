import api from '@/lib/api';
import { Order } from '@/types/order.types';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const { data } = await api.get('/orders');
    return data;
  },

  async getOrderById(id: string): Promise<Order> {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  async cancelOrder(id: string): Promise<Order> {
    const { data } = await api.patch(`/orders/${id}/cancel`);
    return data;
  },
};
