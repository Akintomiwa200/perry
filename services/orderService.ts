import api from "@/lib/api";
import { Order, CreateOrderData } from "@/types/order.types";

export const orderService = {
  async getUserOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },

  async getOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },

  async getOrderById(id: string): Promise<Order> {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  },

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const { data } = await api.post<Order>("/orders", orderData);
    return data;
  },

  async cancelOrder(id: string): Promise<Order> {
    const { data } = await api.post<Order>(`/orders/${id}/cancel`);
    return data;
  },
};
