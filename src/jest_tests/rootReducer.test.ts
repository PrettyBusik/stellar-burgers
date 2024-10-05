import rootReducer from '../services/rootReducer';

describe('rootReducer', () => {
  it('should initialize with the correct default state', () => {
    // Здесь создаем начальное состояние для rootReducer
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Ожидаемое состояние
    const expectedState = {
      // Укажите правильное начальное состояние вашего приложения
      user: {
        isAuthChecked: false,
        userData: {
          email: '',
          name: ''
        },
        error: ''
      },
      ingredients: {
        ingredientData: null,
        ingredients: [],
        loading: false,
        error: null
      },
      cart: {
        bun: null,
        ingredients: []
      },
      newOrder: {
        order: null,
        name: '',
        orderRequest: false
      },
      orderList: {
        orders: []
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };

    expect(initialState).toEqual(expectedState);
  });
});
