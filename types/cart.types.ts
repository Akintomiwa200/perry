import { Product } from "./product.types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface ServerCartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}
