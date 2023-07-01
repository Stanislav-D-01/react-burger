import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLEAR_STATE,
} from "../actions/feeds";

const initialState = {
  wsConnected: false,
  orders: [],
  total: "",
  totalTd: "",
  error: undefined,
};

export const feedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return { ...state, wsConnected: true, error: undefined };
    }
    case WS_CONNECTION_ERROR: {
      return { ...state, wsConnected: false, error: action.error };
    }
    case WS_CONNECTION_CLOSED: {
      return { ...state, wsConnected: false, error: undefined };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.data,
        total: action.total,
        totalTd: action.totalTd,
      };
    }
    case WS_CLEAR_STATE: {
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
