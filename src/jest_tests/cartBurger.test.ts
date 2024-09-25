import cartReducer, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../services/slices/cartBurger';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import ingredients from '../services/slices/ingredients';

describe('cartSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const ingredient: TConstructorIngredient = {
    id: '1',
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

  it('should test adding ingredient', () => {
    const expectedState = {
      ...initialState,
      ingredients: [ingredient]
    };

    expect(cartReducer(initialState, addIngredient(ingredient))).toEqual(
      expectedState
    );
  });

  it('should test removing ingredient', () => {
    const ingredients: TConstructorIngredient[] = [
      {
        id: '1',
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
      },
      {
        id: '2',
        _id: '2',
        name: '2',
        type: '2',
        proteins: 12,
        fat: 52,
        carbohydrates: 202,
        calories: 32,
        price: 2,
        image: 'some-url',
        image_mobile: 'some-url-mobile',
        image_large: 'some-url-large'
      }
    ];

    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredients
    };

    const expectedState = {
      ...initialState,
      ingredients: [
        {
          id: '1',
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
      ]
    };

    expect(cartReducer(stateWithIngredients, removeIngredient(1))).toEqual(
      expectedState
    );
  });

  it('should test moving ingredient up', () => {
    const ingredients: TConstructorIngredient[] = [
      {
        id: '1',
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
      },
      {
        id: '2',
        _id: '2',
        name: '2',
        type: '2',
        proteins: 12,
        fat: 52,
        carbohydrates: 202,
        calories: 32,
        price: 2,
        image: 'some-url',
        image_mobile: 'some-url-mobile',
        image_large: 'some-url-large'
      }
    ];

    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredients
    };

    const expectedState = {
      ...initialState,
      ingredients: [
        {
          id: '2',
          _id: '2',
          name: '2',
          type: '2',
          proteins: 12,
          fat: 52,
          carbohydrates: 202,
          calories: 32,
          price: 2,
          image: 'some-url',
          image_mobile: 'some-url-mobile',
          image_large: 'some-url-large'
        },
        {
          id: '1',
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
      ]
    };

    expect(cartReducer(stateWithIngredients, moveIngredientUp(1))).toEqual(
      expectedState
    );
  });

  it('should test moving ingredient down', () => {
    const ingredients: TConstructorIngredient[] = [
      {
        id: '1',
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
      },
      {
        id: '2',
        _id: '2',
        name: '2',
        type: '2',
        proteins: 12,
        fat: 52,
        carbohydrates: 202,
        calories: 32,
        price: 2,
        image: 'some-url',
        image_mobile: 'some-url-mobile',
        image_large: 'some-url-large'
      }
    ];

    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredients
    };

    const expectedState = {
      ...initialState,
      ingredients: [
        {
          id: '2',
          _id: '2',
          name: '2',
          type: '2',
          proteins: 12,
          fat: 52,
          carbohydrates: 202,
          calories: 32,
          price: 2,
          image: 'some-url',
          image_mobile: 'some-url-mobile',
          image_large: 'some-url-large'
        },
        {
          id: '1',
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
      ]
    };

    expect(cartReducer(stateWithIngredients, moveIngredientDown(0))).toEqual(
      expectedState
    );
  });
});
