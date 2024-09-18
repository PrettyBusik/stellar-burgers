import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

// type for initial state
type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

// initial state for new oder
export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

// Action
export const getNewOrder = createAsyncThunk(
  'order/getNewOrder',
  orderBurgerApi
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getNewOrderModalData: (state) => state.order,
    getNewOrderName: (state) => state.name,
    getNewOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;

export const { getNewOrderModalData, getNewOrderName, getNewOrderRequest } =
  newOrderSlice.selectors;

const newOrderReducer = newOrderSlice.reducer;

export default newOrderReducer;
