import { useState, useEffect, useCallback } from 'react';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/order.types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch {
      setError('Failed to load orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, isLoading, error, refetch: fetchOrders };
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    orderService
      .getOrderById(id)
      .then((data) => setOrder(data))
      .catch(() => setError('Order not found'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { order, isLoading, error };
}
