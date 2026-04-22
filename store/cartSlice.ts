import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Cart } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { TAX_RATE } from '@/lib/constants';

const initialState: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

function recalculate(state: Cart) {
  state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  state.tax = +(state.subtotal * TAX_RATE).toFixed(2);
  state.total = +(state.subtotal + state.tax + state.shipping).toFixed(2);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id: `${product.id}-${Date.now()}`, product, quantity, price: product.price });
      }
      recalculate(state);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      recalculate(state);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.productId);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      recalculate(state);
    },
    setShipping(state, action: PayloadAction<number>) {
      state.shipping = action.payload;
      recalculate(state);
    },
    clearCart(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, setShipping, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
