import {
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
} from "../actions/ingredient-details";

const initialState = {
  ingredient: {},
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: action.value };
    }
    case DEL_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: {} };
    }
    default: {
      return state;
    }
  }
};
