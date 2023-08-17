import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { combineReducers } from "redux";
import { authorizationReducer } from "./authorization";
import { feedsReducer } from "./feeds";
import { userOrdersReducer } from "./userOrders";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: burgerIngredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  feeds: feedsReducer,
  auth: authorizationReducer,
  userOrders: userOrdersReducer,
});
