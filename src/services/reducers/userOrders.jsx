import { WS_USER_ORDER_GET_MESSAGE } from "../actions/userOrder";

const initialState = {
  wsConnected: false,
  orders: [],
};

export const userOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDER_GET_MESSAGE: {
      return {
        ...state,
        orders: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
