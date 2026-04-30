import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";
import { Product } from "@/types/product.types";
import { cartService } from "@/services/cartService";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((s: RootState) => s.cart);
  const user = useSelector((s: RootState) => s.auth.user);

  /**
   * When the user is authenticated, keep the local Redux cart in sync with
   * the server cart. This effect runs once per mount after the user is known.
   */
  useEffect(() => {
    if (!user) return;

    cartService.getCart().then((serverItems) => {
      // For each server item, ensure it exists in the local Redux store.
      serverItems.forEach((serverItem) => {
        const alreadyInCart = cart.items.some(
          (i) => i.product.id === serverItem.productId,
        );
        if (!alreadyInCart) {
          dispatch(
            addToCart({
              product: serverItem.product,
              quantity: serverItem.quantity,
            }),
          );
        }
      });
    });
    // Only run on user change — intentionally omitting cart.items to avoid loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const add = (product: Product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
    if (user) {
      cartService.addItem(product.id, quantity).catch(() => {
        // server call failed — local state still updated optimistically
      });
    }
  };

  const remove = (productId: string) => {
    dispatch(removeFromCart(productId));
    if (user) {
      cartService.removeItem(productId).catch(() => {});
    }
  };

  const updateQty = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
    if (user) {
      cartService.updateItem(productId, quantity).catch(() => {});
    }
  };

  const clear = () => {
    dispatch(clearCart());
    if (user) {
      cartService.clearCart().catch(() => {});
    }
  };

  const isInCart = (productId: string) =>
    cart.items.some((i) => i.product.id === productId);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return { ...cart, add, remove, updateQty, clear, isInCart, itemCount };
}
