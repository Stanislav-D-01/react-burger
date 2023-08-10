import { BASE_URL } from "../../utils/utils";
import { request, fetchWithRefresh } from "../../utils/burger-api";
import { setCookie, getCookie } from "../../utils/utils";
export const CHECK_AUTHORIZATION_REQUEST: "CHECK_AUTHORIZATION_REQUEST" =
  "CHECK_AUTHORIZATION_REQUEST";
export const CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS" =
  "CHECK_AUTHORIZATION_SUCCESS";
export const CHECK_AUTHORIZATION_ERROR: "CHECK_AUTHORIZATION_ERROR" =
  "CHECK_AUTHORIZATION_ERROR";
export const GET_NEW_TOKEN_REQUEST: "GET_NEW_TOKEN_REQUEST" =
  "GET_NEW_TOKEN_REQUEST";
export const GET_NEW_TOKEN_SUCCESS: "GET_NEW_TOKEN_SUCCESS" =
  "GET_NEW_TOKEN_SUCCESS";
export const GET_NEW_TOKEN_ERROR: "GET_NEW_TOKEN_ERROR" = "GET_NEW_TOKEN_ERROR";

export type TCheckAuthorizationRequest = {
  readonly type: typeof CHECK_AUTHORIZATION_REQUEST;
};
export type TCheckAuthorizationSuccess = {
  readonly type: typeof CHECK_AUTHORIZATION_SUCCESS;
  readonly data: { user: { name: string; email: string } };
};
export type TCheckAuthorizationError = {
  readonly type: typeof CHECK_AUTHORIZATION_ERROR;
};
export type TGetNewTokenRequest = {
  readonly type: typeof GET_NEW_TOKEN_REQUEST;
};
export type TGetNewTokenSuccess = {
  readonly type: typeof GET_NEW_TOKEN_SUCCESS;
};
export type TGetNewTokenError = {
  readonly type: typeof GET_NEW_TOKEN_ERROR;
};

export type TCheckAutorizationAction =
  | TCheckAuthorizationRequest
  | TCheckAuthorizationSuccess
  | TCheckAuthorizationError
  | TGetNewTokenRequest
  | TGetNewTokenSuccess
  | TGetNewTokenError;

export const checkAuthorization = () => {
  return function (dispatch) {
    dispatch({ type: CHECK_AUTHORIZATION_REQUEST });
    const token = getCookie("token");
    if (token) {
      fetchWithRefresh(`${BASE_URL}auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          dispatch({ type: CHECK_AUTHORIZATION_SUCCESS, data: data });
        })
        .catch((err) => dispatch({ type: CHECK_AUTHORIZATION_ERROR }));
    } else {
      dispatch({ type: CHECK_AUTHORIZATION_ERROR });
    }
  };
};
