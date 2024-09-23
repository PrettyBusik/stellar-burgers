import { combineReducers } from 'redux';

import ingredientReducer from './slices/ingredients';
import cartReducer from './slices/cartBurger';
import newOrderReducer from './slices/newOrder';
import ordersListReducer from './slices/orderList';
import feedsReducer from './slices/feeds';
import userReducer from './slices/user';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  orderList: ordersListReducer,
  feeds: feedsReducer
});

export default rootReducer;
