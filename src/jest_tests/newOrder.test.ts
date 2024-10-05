import newOrderReducer, {
  clearOrder,
  getNewOrder,
  initialState
} from '../services/slices/newOrder';
import { orderBurgerApi } from '@api';

jest.mock('../utils/burger-api', () => ({
  orderBurgerApi: jest.fn()
}));

describe('newOrderSlice', () => {
  it('should handle clearOrder', () => {
    const previousState = {
      order: {
        _id: '123',
        ingredients: [],
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1
      },
      name: 'Test Order',
      orderRequest: true
    };

    expect(newOrderReducer(previousState, clearOrder())).toEqual(initialState);
  });

  describe('getNewOrder async thunk', () => {
    it('should handle getNewOrder.pending', () => {
      const action = { type: getNewOrder.pending.type };
      const expectedState = {
        ...initialState,
        orderRequest: true
      };

      expect(newOrderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle getNewOrder.fulfilled', () => {
      const payload = {
        order: {
          _id: '123',
          ingredients: [],
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 1
        },
        name: 'Test Order'
      };

      const action = { type: getNewOrder.fulfilled.type, payload };
      const expectedState = {
        ...initialState,
        orderRequest: false,
        order: payload.order,
        name: payload.name
      };

      expect(newOrderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle getNewOrder.rejected', () => {
      const action = { type: getNewOrder.rejected.type };
      const expectedState = {
        ...initialState,
        orderRequest: false
      };

      expect(newOrderReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
