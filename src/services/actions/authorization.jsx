import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";
export const SEND_REGISTRATION_REQUEST = "SEND_REGISTRATION_REQUEST";
export const SEND_REGISTRATION_SUCCSESS = "SEND_REGISTRATION_SUCCSESS";
export const SEND_REGISTRATION_ERROR = "SEND_REGISTRATION_ERROR";
export const FORGOT_PASS_SEND_EMAIL_REQUEST = "FORGOT_PASS_SEND_EMAIL_REQUEST"
export const FORGOT_PASS_SEND_EMAIL_SUCCSESS = "FORGOT_PASS_SEND_EMAIL_ SUCCSESS"
export const FORGOT_PASS_SEND_EMAIL_ERROR = "FORGOT_PASS_SEND_ERROR"

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
      .catch((err) => dispatch({ type: "FORGOT_PASS_SEND_EMAIL_ERROR", err: err }));
  };
};