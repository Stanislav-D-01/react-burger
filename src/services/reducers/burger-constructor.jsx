import {
  ADD_INGR_IN_CONSTRUCTOR,
  ADD_BUN_IN_CONSTRUCTOR,
  DEL_INGR_CONSTRUCTOR,
  MOVE_INGR_CONSTRUCTOR,
  CALC_TOTAL_PRICE,
} from "../actions/burger-constructor";

const initialState = {
  ingredientsConstructor: [],
  total: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
          state.ingredientsConstructor.splice(0, 2, action.value, action.value),
        ],
      };
    }

    case DEL_INGR_CONSTRUCTOR: {
      return {
        ...state,
        state: [state.ingredientsConstructor.splice(action.value, 1)],
      };
    }
    case MOVE_INGR_CONSTRUCTOR: {
      const arrayIngr = state.ingredientsConstructor;
      console.log(arrayIngr);
      const ingDrop = arrayIngr.find(
        (item, index) => action.indexDrop == index
      );
      const ingrDrag = arrayIngr.find(
        (item, index) => action.indexDrag == index
      );
      arrayIngr.splice(action.indexDrag, 1);
      arrayIngr.splice(action.indexDrop, 0, ingrDrag);

      return {
        ...state,
        ingredientsConstructor: arrayIngr,
      };
    }

    default: {
      return state;
    }
  }
};
