import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";
import { authorizationReducer } from "../reducers/authorization";
import { setCookie } from "../../utils/utils";
export const SEND_REGISTRATION_REQUEST = "SEND_REGISTRATION_REQUEST";
export const SEND_REGISTRATION_SUCCSESS = "SEND_REGISTRATION_SUCCSESS";
export const SEND_REGISTRATION_ERROR = "SEND_REGISTRATION_ERROR";
export const FORGOT_PASS_SEND_EMAIL_REQUEST = "FORGOT_PASS_SEND_EMAIL_REQUEST";
export const FORGOT_PASS_SEND_EMAIL_SUCCSESS =
  "FORGOT_PASS_SEND_EMAIL_ SUCCSESS";
export const FORGOT_PASS_SEND_EMAIL_ERROR = "FORGOT_PASS_SEND_ERROR";

export const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR";



export const authorization = (email, pass) => {
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
          setCookie("token", authToken);
        }
        setCookie("refreshToken", data.refreshToken);
      })
      .catch((err) => dispatch({ type: "AUTHORIZATION_ERROR", err: err }));
  };
};

export const sendRegitration = (email, pass, name) => {
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
      })
      .catch((err) => dispatch({ type: "SEND_REGISTRATION_ERROR", err: err }));
  };
};

export const forgotPassSendEmail = (email) => {
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
