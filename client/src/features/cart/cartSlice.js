import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const persist = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.product === item.product);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + item.quantity, existing.stock);
      } else {
        state.items.push(item);
      }
      persist(state.items);
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.items.find((i) => i.product === product);
      if (item) item.quantity = quantity;
      persist(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product !== action.payload);
      persist(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);