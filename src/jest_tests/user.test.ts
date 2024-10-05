import userReducer, {
  initialState,
  registerUser,
  loginUser,
  updateUser,
  getApiUser,
  logoutUser
} from '../services/slices/user';
import { setCookie } from '../utils/cookie';

// Мокаем setCookie и localStorage
jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn()
}));

const setItemMock = jest.spyOn(global.localStorage.__proto__, 'setItem');

describe('userSlice', () => {
  describe('registerUser async thunk', () => {
    it('should handle registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const expectedState = {
        ...initialState,
        error: null
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle registerUser.fulfilled', () => {
      const payload = {
        user: { email: 'test@test.com', name: 'Test User' },
        refreshToken: 'testRefreshToken',
        accessToken: 'testAccessToken'
      };
      const action = { type: registerUser.fulfilled.type, payload };
      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        error: null,
        userData: payload.user
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
      expect(setItemMock).toHaveBeenCalledWith(
        'refreshToken',
        payload.refreshToken
      );
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        payload.accessToken
      );
    });

    it('should handle registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Error' }
      };
      const expectedState = {
        ...initialState,
        error: 'Error'
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('loginUser async thunk', () => {
    it('should handle loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: null
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle loginUser.fulfilled', () => {
      const payload = {
        user: { email: 'test@test.com', name: 'Test User' },
        refreshToken: 'testRefreshToken',
        accessToken: 'testAccessToken'
      };
      const action = { type: loginUser.fulfilled.type, payload };
      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        error: null,
        userData: payload.user
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
      expect(setItemMock).toHaveBeenCalledWith(
        'refreshToken',
        payload.refreshToken
      );
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        payload.accessToken
      );
    });

    it('should handle loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Error' }
      };
      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: 'Error'
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('getApiUser async thunk', () => {
    it('should handle getApiUser.fulfilled', () => {
      const payload = {
        user: { email: 'test@test.com', name: 'Test User' }
      };
      const action = { type: getApiUser.fulfilled.type, payload };
      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        userData: payload.user,
        error: null
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle getApiUser.rejected', () => {
      const action = {
        type: getApiUser.rejected.type,
        error: { message: 'Error' }
      };
      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: 'Error'
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('logoutUser async thunk', () => {
    it('should handle logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      expect(userReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('updateUser async thunk', () => {
    it('should handle updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const expectedState = {
        ...initialState,
        error: null
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle updateUser.fulfilled', () => {
      const payload = {
        user: { email: 'test@test.com', name: 'Test User Updated' }
      };
      const action = { type: updateUser.fulfilled.type, payload };
      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        userData: payload.user,
        error: null
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Error' }
      };
      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: 'Error'
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
