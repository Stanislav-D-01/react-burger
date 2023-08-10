import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";

import { setCookie, getCookie } from "../../utils/utils";
import { fetchWithRefresh } from "../../utils/burger-api";
export const SEND_REGISTRATION_REQUEST: "SEND_REGISTRATION_REQUEST" =
  "SEND_REGISTRATION_REQUEST";
export const SEND_REGISTRATION_SUCCSESS: "SEND_REGISTRATION_SUCCSESS" =
  "SEND_REGISTRATION_SUCCSESS";
export const SEND_REGISTRATION_ERROR: "SEND_REGISTRATION_ERROR" =
  "SEND_REGISTRATION_ERROR";
export const FORGOT_PASS_SEND_EMAIL_REQUEST: "FORGOT_PASS_SEND_EMAIL_REQUEST" =
  "FORGOT_PASS_SEND_EMAIL_REQUEST";
export const FORGOT_PASS_SEND_EMAIL_SUCCSESS: "FORGOT_PASS_SEND_EMAIL_SUCCSESS" =
  "FORGOT_PASS_SEND_EMAIL_SUCCSESS";
export const FORGOT_PASS_SEND_EMAIL_ERROR: "FORGOT_PASS_SEND_ERROR" =
  "FORGOT_PASS_SEND_ERROR";

export const AUTHORIZATION_REQUEST: "AUTHORIZATION_REQUEST" =
  "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" =
  "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR" = "AUTHORIZATION_ERROR";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" =
  "RESET_PASSWORD_ERROR";
export const SAVE_NEW_PROFILE_REQUEST: "SAVE_NEW_PROFILE_REQUEST" =
  "SAVE_NEW_PROFILE_REQUEST";
export const SAVE_NEW_PROFILE_SUCCESS: "SAVE_NEW_PROFILE_SUCCESS" =
  "SAVE_NEW_PROFILE_SUCCESS";
export const SAVE_NEW_PROFILE_ERROR: "SAVE_NEW_PROFILE_ERROR" =
  "SAVE_NEW_PROFILE_ERROR";

export type TSendRegistrationRequest = {
  readonly type: typeof SEND_REGISTRATION_REQUEST;
};
export type TSendRegistrationSuccsess = {
  readonly type: typeof SEND_REGISTRATION_SUCCSESS;
  readonly data: { user: { name: string; email: string } };
};
export type TSendRegistrationError = {
  readonly type: typeof SEND_REGISTRATION_ERROR;
};
export type TForgotPassSendEmailRequest = {
  readonly type: typeof FORGOT_PASS_SEND_EMAIL_REQUEST;
};

export type TForgotPassSendEmailSuccsess = {
  readonly type: typeof FORGOT_PASS_SEND_EMAIL_SUCCSESS;
};

export type TForgotPassSendEmailError = {
  readonly type: typeof FORGOT_PASS_SEND_EMAIL_ERROR;
};

export type TAuthorizationRequest = {
  readonly type: typeof AUTHORIZATION_REQUEST;
};
export type TAuthorizationSuccess = {
  readonly type: typeof AUTHORIZATION_SUCCESS;
  readonly data: { user: { name: string; email: string } };
};

export type TAuthorizationError = {
  readonly type: typeof AUTHORIZATION_ERROR;
};
export type TLogout = {
  readonly type: typeof LOGOUT;
};
export type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};
export type TLogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS;
};
export type TLogoutError = {
  readonly type: typeof LOGOUT_ERROR;
};
export type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
export type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};
export type TResetPasswordError = {
  readonly type: typeof RESET_PASSWORD_ERROR;
};
export type TSaveNewProfileRequest = {
  readonly type: typeof SAVE_NEW_PROFILE_REQUEST;
};
export type TSaveNewProfileSuccess = {
  readonly type: typeof SAVE_NEW_PROFILE_SUCCESS;
  readonly data: { user: { name: string; email: string } };
};
export type TSaveNewProfileError = {
  readonly type: typeof SAVE_NEW_PROFILE_ERROR;
};

export type TAuthorizationActions =
  | TSendRegistrationRequest
  | TSendRegistrationSuccsess
  | TSendRegistrationError
  | TForgotPassSendEmailRequest
  | TForgotPassSendEmailSuccsess
  | TForgotPassSendEmailError
  | TAuthorizationRequest
  | TAuthorizationSuccess
  | TAuthorizationError
  | TLogout
  | TLogoutRequest
  | TLogoutSuccess
  | TLogoutError
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordError
  | TSaveNewProfileRequest
  | TSaveNewProfileSuccess
  | TSaveNewProfileError;

export const resetPassword = (newPass: string, token: string) => {
  return function (dispatch) {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });
    request(`${BASE_URL}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPass, token: token }),
    })
      .then(() => {
        dispatch({ type: "RESET_PASSWORD_SUCCESS" });
      })
      .catch((err) => dispatch({ type: "RESET_PASSWORD_ERROR", err: err }));
  };
};

export const authorization = (email: string, pass: string) => {
  return function (dispatch) {
    dispatch({ type: "AUTHORIZATION_REQUEST" });
    request(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((data) => {
        dispatch({ type: "AUTHORIZATION_SUCCESS", data: data });
        let authToken;
        if (data.accessToken.indexOf("Bearer") === 0) {
          authToken = data.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken, { path: "/" });
        }
        setCookie("refreshToken", data.refreshToken, { path: "/" });
      })
      .catch((err) => dispatch({ type: "AUTHORIZATION_ERROR", err: err }));
  };
};

export const sendRegitration = (email: string, pass: string, name: string) => {
  return function (dispatch) {
    dispatch({ type: "SEND_REGISTRATION_REQUEST" });
    request(`${BASE_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pass, name: name }),
    })
      .then((data) => {
        dispatch({ type: "SEND_REGISTRATION_SUCCSESS", data: data });
        let authToken;
        if (data.accessToken.indexOf("Bearer") === 0) {
          authToken = data.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken);
        }
        setCookie("refreshToken", data.refreshToken);
      })
      .catch((err) => dispatch({ type: "SEND_REGISTRATION_ERROR", err: err }));
  };
};

export const forgotPassSendEmail = (email: string) => {
  return function (dispatch) {
    dispatch({ type: "FORGOT_PASS_SEND_EMAIL_REQUEST" });
    request(`${BASE_URL}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then(() => {
        dispatch({ type: "FORGOT_PASS_SEND_EMAIL_SUCCSESS" });
      })
      .catch((err) =>
        dispatch({ type: "FORGOT_PASS_SEND_EMAIL_ERROR", err: err })
      );
  };
};

export const saveNewProfile = (name, email, pass) => {
  return function (dispatch) {
    dispatch({ type: "SAVE_NEW_PROFILE_REQUEST" });
    const token = getCookie("token");
    if (token) {
      fetchWithRefresh(`${BASE_URL}auth/user`, {
        method: "PATCH",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: pass }),
      })
        .then((data) => {
          dispatch({ type: "SAVE_NEW_PROFILE_SUCCESS", data: data });
        })
        .catch((err) => dispatch({ type: "SAVE_NEW_PROFILE_ERROR" }));
    } else {
      dispatch({ type: "SAVE_NEW_PROFILE_ERROR" });
    }
  };
};

export const logout = () => {
  return function (dispatch) {
    dispatch({ type: "LOGOUT_REQUEST" });
    const token = getCookie("refreshToken");
    request(`${BASE_URL}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((data) => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch((err) => dispatch({ type: "LOGOUT_ERROR" }));
  };
};
