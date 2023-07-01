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
  LOGOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SAVE_NEW_PROFILE_REQUEST,
  SAVE_NEW_PROFILE_SUCCESS,
  SAVE_NEW_PROFILE_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../actions/authorization";

import {
  CHECK_AUTHORIZATION_REQUEST,
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION_ERROR,
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
  sendEmailSuccess: false,
  resetPassword: false,
  loadEnd: false,
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
        request: false,
        requestSuccess: true,
        autorization: false,
        requestError: false,
        sendEmailSuccess: true,
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
    case CHECK_AUTHORIZATION_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        autorization: false,
        requestError: false,
        loadEnd: false,
      };
    }
    case CHECK_AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        request: false,
        requestSuccess: true,
        autorization: true,
        requestError: false,
        loadEnd: true,
      };
    }
    case CHECK_AUTHORIZATION_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: false,
        requestError: true,
        loadEnd: true,
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
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        request: false,
        requestSuccess: true,
        autorization: false,
        requestError: false,
        name: "",
        email: "",
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        request: false,
        requestSuccess: false,
        autorization: true,
        requestError: true,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return { ...state, request: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, request: false, resetPassword: true };
    }
    case RESET_PASSWORD_ERROR: {
      return { ...state, request: false, requestError: true };
    }
    case SAVE_NEW_PROFILE_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        requestError: false,
      };
    }
    case SAVE_NEW_PROFILE_SUCCESS: {
      return {
        ...state,
        request: false,
        requestSuccess: true,
        requestError: false,
        name: action.data.user.name,
        email: action.data.user.email,
      };
    }
    case SAVE_NEW_PROFILE_ERROR: {
      return {
        ...state,
        request: false,
        requestError: true,
        requestSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
