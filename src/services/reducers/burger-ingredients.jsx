import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCSESS,
  GET_INGREDIENTS_ERROR,
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCSESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
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
