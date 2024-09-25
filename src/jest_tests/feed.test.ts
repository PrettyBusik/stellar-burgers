import feedsReducer, { fetchGetFeed, TFeeds } from '../services/slices/feeds';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

jest.mock('../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedSlice', () => {
  const initialState: TFeeds = {
    orders: [],
    total: 0,
    totalToday: 0
  };
  it('should take feeds from api', function () {
    const mockOrders: TOrder[] = [
      {
        _id: '123',
        ingredients: ['1', '2'],
        status: 'completed',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ];
    const mockTotal = 100;
    const mockTotalForToday = 5;

    const action = {
      type: fetchGetFeed.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: mockTotal,
        totalToday: mockTotalForToday
      }
    };

    const expectedState = {
      orders: mockOrders,
      total: mockTotal,
      totalToday: mockTotalForToday
    };

    expect(feedsReducer(initialState, action)).toEqual(expectedState);
  });
});
