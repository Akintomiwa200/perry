import { useState, useEffect, useCallback } from 'react';
import { adminService } from '@/services/adminService';
import { AdminStats, AdminCustomer } from '@/types/admin.types';
import { Order } from '@/types/order.types';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    adminService
      .getStats()
      .then((data) => setStats(data))
      .catch(() => setError('Failed to load admin stats.'))
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading, error };
}

interface OrderFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function useAdminOrders(filters?: OrderFilters) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getOrders(filters);
      setOrders(data.orders);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError('Failed to load orders.');
    } finally {
      setIsLoading(false);
    }
  }, [filters?.status, filters?.search, filters?.page, filters?.limit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, total, totalPages, isLoading, error, refetch: fetchOrders };
}

interface CustomerFilters {
  search?: string;
  page?: number;
}

export function useAdminCustomers(filters?: CustomerFilters) {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getCustomers(filters);
      setCustomers(data.customers);
      setTotal(data.total);
    } catch {
      setError('Failed to load customers.');
    } finally {
      setIsLoading(false);
    }
  }, [filters?.search, filters?.page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, total, isLoading, error, refetch: fetchCustomers };
}
