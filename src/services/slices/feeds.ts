import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

export type TFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchGetFeed = createAsyncThunk('orders/fetchGetFeed', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;

const feedsReducer = feedsSlice.reducer;

export default feedsReducer;
