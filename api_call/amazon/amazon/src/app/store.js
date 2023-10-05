
import { configureStore } from '@reduxjs/toolkit';
import cartreduser from './redex/counterSlice';

const store = configureStore({
  reducer: {
    cart: cartreduser,
  },
});

export default store;





