import {
  WS_CONNECTION_SUCCESS_FEED,
  WS_CONNECTION_ERROR_FEED,
  WS_CONNECTION_CLOSED_FEED,
  WS_GET_MESSAGE_FEED,
  WS_CLEAR_STATE_FEED,
  WS_CONNECTION_OPEN_FEED,
} from "../actions/feeds";

import { TFeedsActions } from "../actions/feeds";

type TFeedState = {
  wsConnected?: boolean;
  wsOpen?: boolean;
  orders: any[];
  total: number;
  totalTd: number;
  error: string;
};

const initialState: TFeedState = {
  wsConnected: false,
  wsOpen: false,
  orders: [],
  total: 0,
  totalTd: 0,
  error: "",
};

export const feedsReducer = (state = initialState, action: TFeedsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_FEED: {
      return { ...state, wsConnected: true, error: "" };
    }
    case WS_CONNECTION_OPEN_FEED: {
      return { ...state, wsConnected: false, wsOpen: true, error: "" };
    }
    case WS_CONNECTION_ERROR_FEED: {
      return { ...state, wsConnected: false, error: action.error };
    }
    case WS_CONNECTION_CLOSED_FEED: {
      return {
        ...state,
        wsConnected: false,
        wsOpen: false,
        orders: [],
        total: 0,
        totalTd: 0,
        error: "",
      };
    }
    case WS_GET_MESSAGE_FEED: {
      return {
        ...state,
        orders: action.data.orders,
        total: action.data.total,
        totalTd: action.data.totalToday,
      };
    }
    case WS_CLEAR_STATE_FEED: {
      return {
        wsConnected: false,
        orders: [],
        total: 0,
        totalTd: 0,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
