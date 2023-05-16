import { BASE_URL } from "../../utils/utils";
export const SEND_REGISTRATION_REQUEST = "SEND_REGISTRATION_REQUEST";
export const SEND_REGISTRATION_SUCCSESS = "SEND_REGISTRATION_SUCCSESS";
export const SEND_REGISTRATION_ERROR = "SEND_REGISTRATION_ERROR";

export const sendRegitration = (email, pass, name) => {
  return function (dispatch) {
    dispatch({ type: "SEND_REGISTRATION_REQUEST" });
    request(`${BASE_URL}/auth/register`, {
      method: POST,
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
