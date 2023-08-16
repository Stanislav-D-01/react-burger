import {
  ADD_INGR_IN_CONSTRUCTOR,
  ADD_BUN_IN_CONSTRUCTOR,
  DEL_INGR_CONSTRUCTOR,
  MOVE_INGR_CONSTRUCTOR,
  CALC_TOTAL_PRICE,
  CLEAN_CONSTRUCTOR,
} from "../actions/burger-constructor";
import { TIngredients } from "../types/types";

import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TBurgerConstructorState = {
  ingredientsConstructor: TIngredients[];
  total: number;
};

const initialState: TBurgerConstructorState = {
  ingredientsConstructor: [],
  total: 0,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
  switch (action.type) {
    case CALC_TOTAL_PRICE: {
      return { ...state, total: action.value };
    }
    case ADD_INGR_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.value],
      };
    }
    case ADD_BUN_IN_CONSTRUCTOR: {
      return {
        ...state,
        state: [
          state.ingredientsConstructor.splice(
            0,
            2,
            action.valueTop,
            action.valueBottom
          ),
        ],
      };
    }

    case DEL_INGR_CONSTRUCTOR: {
      return {
        ...state,
        state: [...state.ingredientsConstructor.splice(action.value, 1)],
      };
    }
    case MOVE_INGR_CONSTRUCTOR: {
      const arrayIngr = state.ingredientsConstructor;

      const ingDrop = arrayIngr.find(
        (item, index) => action.indexDrop == index
      );
      const ingrDrag: any = arrayIngr.find(
        (item, index) => action.indexDrag == index
      );
      arrayIngr.splice(action.indexDrag, 1);
      arrayIngr.splice(action.indexDrop, 0, ingrDrag);

      return {
        ...state,
        ingredientsConstructor: arrayIngr,
      };
    }
    case CLEAN_CONSTRUCTOR: {
      return {
        ...state,
        state: [
          ...state.ingredientsConstructor.splice(
            2,
            state.ingredientsConstructor.length
          ),
        ],
      };
    }

    default: {
      return state;
    }
  }
};
