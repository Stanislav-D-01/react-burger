import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { combineReducers } from "redux";
import { authorizationReducer } from "./authorization";


export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: burgerIngredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  auth: authorizationReducer
});
