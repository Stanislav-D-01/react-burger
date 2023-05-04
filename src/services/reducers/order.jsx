import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCSESS,
  SEND_ORDER_ERROR,
  CLEAN_ORDER,
} from "../actions/order";

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
