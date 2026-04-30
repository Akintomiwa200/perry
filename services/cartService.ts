import api from "@/lib/api";
import { ServerCartItem } from "@/types/cart.types";

export const cartService = {
  async getCart(): Promise<ServerCartItem[]> {
    const { data } = await api.get<ServerCartItem[]>("/cart");
    return data;
  },

  async addItem(productId: string, quantity: number): Promise<ServerCartItem> {
    const { data } = await api.post<ServerCartItem>("/cart/items", {
      productId,
      quantity,
    });
    return data;
  },

  async updateItem(
    productId: string,
    quantity: number,
  ): Promise<ServerCartItem> {
    const { data } = await api.patch<ServerCartItem>(
      `/cart/items/${productId}`,
      { quantity },
    );
    return data;
  },

  async removeItem(productId: string): Promise<void> {
    await api.delete(`/cart/items/${productId}`);
  },

  async clearCart(): Promise<void> {
    await api.delete("/cart");
  },
};
