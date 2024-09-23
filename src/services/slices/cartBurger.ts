import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBurgerCartState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerCartState = {
  bun: null,
  ingredients: []
};

const cartBurgerSlice = createSlice({
  name: 'burgerCart',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },

    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const [item] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, item);
      }
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const [item] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, item);
      }
    },

    clearBurgerCart: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerCart
} = cartBurgerSlice.actions;

const cartReducer = cartBurgerSlice.reducer;

export default cartReducer;
