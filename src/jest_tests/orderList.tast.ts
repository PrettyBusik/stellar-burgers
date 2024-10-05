import ordersListReducer, { getOrdersList } from '../services/slices/orderList';
import { getOrdersApi } from '@api';
import { initialState } from '../services/slices/orderList';

jest.mock('../utils/burger-api', () => {
  getOrdersApi: jest.fn();
});

describe('orderListSlice', () => {
  it('should take orders from api', function () {
    const action = { type: getOrdersList.fulfilled.type };
    const payload = [
      {
        _id: '123',
        ingredients: [],
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ];
    const expectedState = {
      ...initialState,
      orders: payload
    };

    expect(ordersListReducer(initialState, action)).toEqual(expectedState);
  });
});
