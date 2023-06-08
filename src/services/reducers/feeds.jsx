import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WC_CONNECTION_ERROR,
  wS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
} from "../actions/feeds";

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
