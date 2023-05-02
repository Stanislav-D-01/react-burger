import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: burgerIngredientsReducer,
  modal: modalReducer,
  order: orderReducer,
});
