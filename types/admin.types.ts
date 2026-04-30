export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: import('./order.types').Order[];
  lowStockCount: number;
}

export interface AdminCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  ordersCount: number;
  totalSpent: number;
  joinedAt: string;
}
