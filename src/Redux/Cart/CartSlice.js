import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}, 
    total: 0,
  },
  reducers: {
    // Ajoute une pizza au panier ou augmente sa quantité
    addToCart: (state, action) => {
      const pizza = action.payload;
      // If the pizza is already in the cart
      if (state.items[pizza.id]) { 
        state.items[pizza.id].quantity += 1;
      } else {
        state.items[pizza.id] = { data: pizza, quantity: 1 };
      }
      state.total += pizza.price;
    },
    // Retire une pizza du panier ou diminue sa quantité
    removeFromCart: (state, action) => {
      const pizzaId = action.payload;
      if (state.items[pizzaId]) {
        state.total -= state.items[pizzaId].data.price;
        if (state.items[pizzaId].quantity > 1) {
          state.items[pizzaId].quantity -= 1;
        } else {
          delete state.items[pizzaId];
        }
      }
    },
    // Retire complètement une pizza du panier sans tenir compte de la quantité
    removeWholeItemFromCart: (state, action) => {
      const pizzaId = action.payload;
      if (state.items[pizzaId]) {
        state.total -= (state.items[pizzaId].data.price * state.items[pizzaId].quantity); // Decrease the total price by the pizza's total price
        delete state.items[pizzaId];
      }
    },
    // Réinitialise le panier
    clearCart: (state) => {
      state.items = {};
      state.total = 0;
    },
  },
});


export const { addToCart, removeFromCart, removeWholeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
