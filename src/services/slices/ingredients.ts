import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

// type for initial state
type TIngredientsState = {
  ingredientData: TIngredient | null;
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

// initial state for ingredients
const initialState: TIngredientsState = {
  ingredientData: null,
  ingredients: [],
  loading: false,
  error: null
};

// Action
export const fetchIngredients = createAsyncThunk(
  '/ingredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientData = action.payload;
    }
  },
  selectors: {
    getIngredientsLoading: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { showIngredientDetails } = ingredientsSlice.actions;
export const { getIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;

const ingredientReducer = ingredientsSlice.reducer;

export default ingredientReducer;
