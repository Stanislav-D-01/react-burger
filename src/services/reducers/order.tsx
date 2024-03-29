import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCSESS,
  SEND_ORDER_ERROR,
  CLEAN_ORDER,
} from "../actions/order";
import { TOrderActions } from "../actions/order";
import { TIngredients, TOrder } from "../types/types";

type TOrderState = {
  order: TOrder | undefined;
  orderRequest: boolean;
  orderFailed: boolean;
  ingredients: string[];
};

const initialState: TOrderState = {
  order: undefined,
  orderRequest: false,
  orderFailed: false,
  ingredients: [],
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case SEND_ORDER_SUCCSESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
        ingredients: action.ingredients,
      };
    }
    case SEND_ORDER_ERROR: {
      return { ...state, orderRequest: false, orderFailed: true };
    }
    case CLEAN_ORDER: {
      return { ...state, order: undefined };
    }

    default: {
      return state;
    }
  }
};
