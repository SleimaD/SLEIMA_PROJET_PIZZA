import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  sortedPizzas: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
        state.pizzas = action.payload;
        state.sortedPizzas = action.payload; // Initialiser avec toutes les pizzas
      },
    sortPizzasByPrice: (state, action) => {
        
        let sorted = [...state.sortedPizzas];
        if (action.payload === 'asc') {
          sorted.sort((element, i) => element.price - i.price);
        } else if (action.payload === 'desc') {
          sorted.sort((element, i) => i.price - element.price);
        }
        state.sortedPizzas = sorted;
      },
      sortPizzasByIngredient: (state, action) => {
          // Vérifier que action.payload n'est pas vide avant de filtrer
          if (action.payload) {
              state.sortedPizzas = state.pizzas.filter(pizza =>
                pizza.ingredients.includes(action.payload)
              );
          } else {
              // Si aucun ingrédient n'est sélectionné (ou si l'action est réinitialisée), afficher toutes les pizzas
              state.sortedPizzas = state.pizzas;
          }
      },
      },
});

export const { setPizzas, sortPizzasByPrice, sortPizzasByIngredient } = pizzaSlice.actions;

export default pizzaSlice.reducer;
