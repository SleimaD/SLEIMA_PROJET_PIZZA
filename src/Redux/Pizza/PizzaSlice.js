import { createSlice } from '@reduxjs/toolkit';


// Define the initial state for the pizza slice
const initialState = {
  pizzas: [],
  sortedPizzas: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    // Reducer to set the pizzas array
    setPizzas: (state, action) => {
        state.pizzas = action.payload;
        state.sortedPizzas = action.payload; // Initialize sortedPizzas with all pizzas
      },
    // Reducer to sort pizzas by price
    sortPizzasByPrice: (state, action) => {
        
        let sorted = [...state.sortedPizzas]; // Create a copy of sortedPizzas to avoid mutating the original array
        if (action.payload === 'asc') {
          sorted.sort((element, i) => element.price - i.price); // Sort by price in ascending order
        } else if (action.payload === 'desc') {
          sorted.sort((element, i) => i.price - element.price); // Sort by price in descending order
        }
        state.sortedPizzas = sorted; // Update sortedPizzas with the sorted array
      },
       // Reducer to sort pizzas by ingredient
      sortPizzasByIngredient: (state, action) => {
          // Check if action.payload is not empty before filtering
          if (action.payload) {
              state.sortedPizzas = state.pizzas.filter(pizza =>
                pizza.ingredients.includes(action.payload) // Check if the pizza includes the specified ingredient
              );
          } else {
          // If no ingredient is selected (or if the action is reset), display all pizzas
              state.sortedPizzas = state.pizzas;
          }
      },
      },
});

export const { setPizzas, sortPizzasByPrice, sortPizzasByIngredient } = pizzaSlice.actions;

export default pizzaSlice.reducer;
