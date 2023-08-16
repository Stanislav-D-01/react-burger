import {
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
  TOGGLE_MODAL_INGR,
  TOGGLE_MODAL_ORDER,
} from "../actions/modal";

import { TModalActions } from "../actions/modal";
import { TIngredients } from "../types/types";

type TModalState = {
  ingredient: TIngredients | undefined;
  isModalIngr: boolean;
  isModalOrder: boolean;
};

const initialState: TModalState = {
  ingredient: undefined,
  isModalIngr: false,
  isModalOrder: false,
};

export const modalReducer = (
  state = initialState,
  action: TModalActions
): TModalState => {
  switch (action.type) {
    case SET_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: action.value };
    }
    case DEL_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: undefined };
    }
    case TOGGLE_MODAL_INGR: {
      return { ...state, isModalIngr: !state.isModalIngr };
    }
    case TOGGLE_MODAL_ORDER: {
      return { ...state, isModalOrder: !state.isModalOrder };
    }

    default: {
      return state;
    }
  }
};
