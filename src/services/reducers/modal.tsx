import {
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
  TOGGLE_MODAL_INGR,
  TOGGLE_MODAL_ORDER,
} from "../actions/modal";

import { TModalActions } from "../actions/modal";

type TModalState = {
  ingredient: object;
  isModalIngr: boolean;
  isModalOrder: boolean;
};

const initialState: TModalState = {
  ingredient: {},
  isModalIngr: false,
  isModalOrder: false,
};

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case SET_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: action.value };
    }
    case DEL_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: "" };
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
