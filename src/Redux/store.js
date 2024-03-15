import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './../Redux/Pizza/PizzaSlice';
import cartReducer from './/../Redux/Cart/CartSlice';

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    cart: cartReducer,
  },
  devTools: true,
});



