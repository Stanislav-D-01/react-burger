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
  regRequest: false,
  regError: false,
  forgotPassEmailSendRequest: false,
  forgotPassEmailSendSuccsess: false,
  forgotPassEmailSendError: false,
  authorizationRequest: false,
  authorizationSuccess: false,
  authorizationError: false,
  token: "",
  refreshToken: "",
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_REQUEST: {
      return { ...state, regRequest: true, regSuccsess: false };
    }
    case SEND_REGISTRATION_SUCCSESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        regRequest: false,
      };
    }
    case SEND_REGISTRATION_ERROR: {
      return { ...state, regRequest: false, regError: true };
    }
    case FORGOT_PASS_SEND_EMAIL_REQUEST: {
      return {
        ...state,
        forgotPassEmailSendRequest: true,
        forgotPassEmailSendSuccsess: false,
        forgotPassEmailSendError: false,
      };
    }
    case FORGOT_PASS_SEND_EMAIL_SUCCSESS: {
      return {
        ...state,
        forgotPassEmailSendRequest: false,
        forgotPassEmailSendSuccsess: true,
        forgotPassEmailSendError: false,
      };
    }
    case FORGOT_PASS_SEND_EMAIL_ERROR: {
      return {
        ...state,
        forgotPassEmailSendRequest: false,
        forgotPassEmailSendSuccsess: false,
        forgotPassEmailSendError: true,
      };
    }
    case AUTHORIZATION_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        authorizationSuccess: false,
        authorizationError: false,
      };
    }
    case AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationSuccess: true,
        authorizationError: false,
        name: action.data.user.name,
        email: action.data.user.email,
        refreshToken: action.data.refreshToken,
      };
    }
    case AUTHORIZATION_ERROR: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationSuccess: false,
        authorizationError: true,
      };
    }
    case CHECK_AUTHORIZATION_TOKEN_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        authorizationSuccess: false,
        authorizationError: false,
      };
    }
    case CHECK_AUTHORIZATION_TOKEN_SUCCESS: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationSuccess: true,
        authorizationError: false,
        name: action.data.user.name,
        email: action.data.user.email,
      };
    }
    case GET_NEW_TOKEN_REQUEST: {
      return { ...state };
    }
    case GET_NEW_TOKEN_SUCCESS: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
