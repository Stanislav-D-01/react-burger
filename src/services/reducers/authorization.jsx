import {
  SEND_REGISTRATION_REQUEST,
  SEND_REGISTRATION_SUCCSESS,
  SEND_REGISTRATION_ERROR,
  FORGOT_PASS_SEND_EMAIL_REQUEST,
  FORGOT_PASS_SEND_EMAIL_SUCCSESS,
  FORGOT_PASS_SEND_EMAIL_ERROR,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_ERROR,
} from "../actions/authorization";

import {
  CHECK_AUTHORIZATION_TOKEN_REQUEST,
  CHECK_AUTHORIZATION_TOKEN_SUCCESS,
  CHECK_AUTHORIZATION_TOKEN_ERROR,
  GET_NEW_TOKEN_REQUEST,
  GET_NEW_TOKEN_SUCCESS,
  GET_NEW_TOKEN_ERROR,
} from "../actions/check-autorization";

const initialState = {
  name: "",
  email: "",
  pass: "",
  request: false,
  requestError: false,
  requestSuccess: false,
  autorization: false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
      };
    }
    case SEND_REGISTRATION_SUCCSESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        request: false,
        requestSuccess: true,
        autorization: true,
        requestError: false,
      };
    }
    case SEND_REGISTRATION_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
      };
    }
    case FORGOT_PASS_SEND_EMAIL_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
      };
    }
    case FORGOT_PASS_SEND_EMAIL_SUCCSESS: {
      return {
        ...state,
        frequest: false,
        requestSuccess: true,
        autorization: false,
        requestError: false,
      };
    }
    case FORGOT_PASS_SEND_EMAIL_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
      };
    }
    case AUTHORIZATION_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
      };
    }
    case AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        request: false,
        requestSuccess: true,
        autorization: true,
        requestError: false,
      };
    }
    case AUTHORIZATION_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
      };
    }
    case CHECK_AUTHORIZATION_TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
      };
    }
    case CHECK_AUTHORIZATION_TOKEN_SUCCESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        request: false,
        requestSuccess: true,
        autorization: true,
        requestError: false,
      };
    }
    case CHECK_AUTHORIZATION_TOKEN_ERROR: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
      };
    }
    case GET_NEW_TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
      };
    }
    case GET_NEW_TOKEN_SUCCESS: {
      return {
        ...state,
        request: false,
        requestSuccess: true,
        autorization: false,
        requestError: false,
      };
    }
    case GET_NEW_TOKEN_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
      };
    }

    default: {
      return state;
    }
  }
};
