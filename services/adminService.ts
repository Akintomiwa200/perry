import api from '@/lib/api';
import { AdminStats, AdminCustomer } from '@/types/admin.types';
import { Order } from '@/types/order.types';
import { Review } from '@/types/review.types';

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const { data } = await api.get<AdminStats>('/admin/stats');
    return data;
  },

  async getOrders(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ orders: Order[]; total: number; totalPages: number }> {
    const { data } = await api.get<{ orders: Order[]; total: number; totalPages: number }>(
      '/admin/orders',
      { params },
    );
    return data;
  },

  async getCustomers(params?: {
    search?: string;
    page?: number;
  }): Promise<{ customers: AdminCustomer[]; total: number }> {
    const { data } = await api.get<{ customers: AdminCustomer[]; total: number }>(
      '/customers',
      { params },
    );
    return data;
  },

  async getCustomerById(id: string): Promise<AdminCustomer> {
    const { data } = await api.get<AdminCustomer>(`/customers/${id}`);
    return data;
  },

  async getReviews(params?: { approved?: boolean }): Promise<Review[]> {
    const { data } = await api.get<Review[]>('/reviews', { params });
    return data;
  },

  async moderateReview(reviewId: string, approved: boolean): Promise<void> {
    await api.patch('/reviews', { reviewId, approved });
  },

  async getInventory(params?: { lowStock?: boolean }): Promise<unknown[]> {
    const { data } = await api.get<unknown[]>('/inventory', { params });
    return data;
  },

  async recordAdjustment(adjustmentData: unknown): Promise<void> {
    await api.post('/inventory', adjustmentData);
  },

  async getAdjustments(): Promise<unknown[]> {
    const { data } = await api.get<unknown[]>('/inventory/adjustments');
    return data;
  },
};
