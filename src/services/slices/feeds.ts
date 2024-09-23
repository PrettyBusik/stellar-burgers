import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

type TFeeds = {
  orders: TOrder[];
  total: number;
  totalForToday: number;
};

const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalForToday: 0
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
    getTotalTodayFeeds: (state) => state.totalForToday
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalForToday = action.payload.totalToday;
    });
  }
});

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;

const feedsReducer = feedsSlice.reducer;

export default feedsReducer;
