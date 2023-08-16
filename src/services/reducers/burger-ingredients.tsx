import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCSESS,
  GET_INGREDIENTS_ERROR,
} from "../actions/burger-ingredients";

import { TBurgerIngredientsActions } from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  ingredients: any;
  ingredientsRequest: Boolean;
  ingredientsSuccess: Boolean;
  ingredientsFailed: Boolean;
};

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCSESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsSuccess: true,
        ingredients: action.ingr,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return { ...state, ingredientsRequest: true, ingredientsFailed: true };
    }

    default: {
      return state;
    }
  }
};
