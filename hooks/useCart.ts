import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { Product } from '@/types/product.types';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((s: RootState) => s.cart);

  const add = (product: Product, quantity = 1) => dispatch(addToCart({ product, quantity }));
  const remove = (productId: string) => dispatch(removeFromCart(productId));
  const updateQty = (productId: string, quantity: number) => dispatch(updateQuantity({ productId, quantity }));
  const clear = () => dispatch(clearCart());
  const isInCart = (productId: string) => cart.items.some((i) => i.product.id === productId);
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return { ...cart, add, remove, updateQty, clear, isInCart, itemCount };
}
