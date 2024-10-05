import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

// type for initial state
type TUserState = {
  isAuthChecked: boolean;
  userData: TUser;
  error: string | null;
};

// initial state for user
export const initialState: TUserState = {
  isAuthChecked: false,
  userData: {
    email: '',
    name: ''
  },
  error: ''
};

//Actions for user
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getApiUser = createAsyncThunk('user/request', getUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    checkUserAuth: (state) => state.isAuthChecked,
    getUserError: (state) => state.error,
    getUser: (state) => state.userData,
    getUserName: (state) => state.userData.name
  },
  extraReducers: (builder) => {
    //  registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error?.message || null;
      });

    // get info about the user
    builder
      .addCase(getApiUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(getApiUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error?.message || null;
      });

    //  login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });

    //   logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      localStorage.clear();
      deleteCookie('accessToken');
      return initialState;
    });

    // update user's info
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
  }
});
export const { getUserError, getUser, getUserName, checkUserAuth } =
  userSlice.selectors;

const userReducer = userSlice.reducer;
export default userReducer;
