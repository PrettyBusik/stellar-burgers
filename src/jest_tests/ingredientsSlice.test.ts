import { expect } from '@jest/globals';
import { TIngredient } from '@utils-types';

import ingredientReducer, {
  showIngredientDetails,
  fetchIngredients
} from '../services/slices/ingredients';

// Мокаем getIngredientsApi для тестирования async thunk
jest.mock('../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  const initialState = {
    ingredientData: null,
    ingredients: [],
    loading: false,
    error: null
  };

  it('should handle showIngredientDetails', () => {
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 300,
      price: 5,
      image: 'some-url',
      image_mobile: 'some-url-mobile',
      image_large: 'some-url-large'
    };

    const expectedState = {
      ...initialState,
      ingredientData: ingredient
    };

    expect(
      ingredientReducer(initialState, showIngredientDetails(ingredient))
    ).toEqual(expectedState);
  });

  describe('fetchIngredients async thunk', () => {
    it('should handle fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const expectedState = {
        ...initialState,
        loading: true,
        error: null
      };

      expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.fulfilled', () => {
      const ingredients: TIngredient[] = [
        {
          _id: '1',
          name: 'Bun',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 300,
          price: 5,
          image: 'some-url',
          image_mobile: 'some-url-mobile',
          image_large: 'some-url-large'
        }
      ];

      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: ingredients
      };
      const expectedState = {
        ...initialState,
        loading: false,
        ingredients: ingredients
      };

      expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        payload: 'Error occurred'
      };
      const expectedState = {
        ...initialState,
        loading: false,
        error: 'Error occurred'
      };

      expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
