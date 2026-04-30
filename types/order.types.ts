import { Address } from "./user.types";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
  paymentReference?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddressId: string;
  shippingOption: "standard" | "express" | "overnight";
  paymentMethod: string;
}
