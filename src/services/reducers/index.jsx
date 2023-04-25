import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients";
import { ingredientReducer } from "./ingredient-details";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
});
