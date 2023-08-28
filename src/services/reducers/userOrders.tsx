import {
  WS_USER_ORDER_GET_MESSAGE,
  WS_USER_ORDER_CONNECTION_START,
  WS_USER_ORDER_CONNECTION_OPEN,
  WS_USER_ORDER_CONNECTION_CLOSED,
} from "../actions/userOrder";

import { TUserOrderActions } from "../actions/userOrder";

type TUserOrders = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  number: number;
};

type TUserOrderState = {
  wsConnected: boolean;
  wsOpen: boolean;
  orders: TUserOrders[];
};

const initialState: TUserOrderState = {
  wsConnected: false,
  wsOpen: false,
  orders: [],
};

export const userOrdersReducer = (
  state = initialState,
  action: TUserOrderActions
): TUserOrderState => {
  switch (action.type) {
    case WS_USER_ORDER_GET_MESSAGE: {
      return {
        ...state,
        orders: action.data.orders,
      };
    }
    case WS_USER_ORDER_CONNECTION_START: {
      return {
        ...state,
        wsConnected: true,
        wsOpen: false,
      };
    }
    case WS_USER_ORDER_CONNECTION_OPEN: {
      return {
        ...state,
        wsConnected: false,
        wsOpen: true,
      };
    }
    case WS_USER_ORDER_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        wsOpen: false,
        orders: [],
      };
    }
    default: {
      return state;
    }
  }
};
