import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCSESS,
  SEND_ORDER_ERROR,
  CLEAN_ORDER,
} from "../actions/order";
import { TOrderActions } from "../actions/order";

type TOrderState = {
  order: object;
  orderRequest: boolean;
  orderFailed: boolean;
  ingredients: object;
};

const initialState: TOrderState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  ingredients: {},
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
      return { ...state, order: {} };
    }

    default: {
      return state;
    }
  }
};
