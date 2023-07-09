import {
  WS_CONNECTION_SUCCESS_FEED,
  WS_CONNECTION_ERROR_FEED,
  WS_CONNECTION_CLOSED_FEED,
  WS_GET_MESSAGE_FEED,
  WS_CLEAR_STATE_FEED,
  WS_CONNECTION_OPEN_FEED,
} from "../actions/feeds";

const initialState = {
  wsConnected: false,
  wsOpen: false,
  orders: [],
  total: "",
  totalTd: "",
  error: undefined,
};

export const feedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_FEED: {
      return { ...state, wsConnected: true, error: undefined };
    }
    case WS_CONNECTION_OPEN_FEED: {
      return { ...state, wsConnected: false, wsOpen: true, error: undefined };
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
        total: "",
        totalTd: "",
        error: undefined,
      };
    }
    case WS_GET_MESSAGE_FEED: {
      return {
        ...state,
        orders: action.data.orders,
        total: action.data.total,
        totalTd: action.data.totalTd,
      };
    }
    case WS_CLEAR_STATE_FEED: {
      return {
        wsConnected: false,
        orders: [],
        total: "",
        totalTd: "",
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
