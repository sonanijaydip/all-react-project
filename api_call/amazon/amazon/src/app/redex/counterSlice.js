import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.push({ ...product, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      } else {
        return state.filter((item) => item.id !== product.id);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
