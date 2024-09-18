import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

// type for initial state
type TOrderListState = {
  orders: TOrder[];
};

// initial state
export const initialState: TOrderListState = {
  orders: []
};

// Action
export const getOrdersList = createAsyncThunk(
  'orders/getOrdersList',
  getOrdersApi
);

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

const ordersListReducer = ordersListSlice.reducer;

export default ordersListReducer;
