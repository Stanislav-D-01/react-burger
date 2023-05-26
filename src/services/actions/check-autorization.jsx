import { BASE_URL } from "../../utils/utils";
import { request, fetchWithRefresh } from "../../utils/burger-api";
import { setCookie, getCookie } from "../../utils/utils";
export const CHECK_AUTHORIZATION_TOKEN_REQUEST =
  "CHECK_AUTHORIZATION_TOKEN_REQUEST";
export const CHECK_AUTHORIZATION_TOKEN_SUCCESS =
  "CHECK_AUTHORIZATION_TOKEN_SUCCESS";
export const CHECK_AUTHORIZATION_TOKEN_ERROR =
  "CHECK_AUTHORIZATION_TOKEN_ERROR";
export const GET_NEW_TOKEN_REQUEST = "GET_NEW_TOKEN_REQUEST";
export const GET_NEW_TOKEN_SUCCESS = "GET_NEW_TOKEN_SUCCESS";
export const GET_NEW_TOKEN_ERROR = "GET_NEW_TOKEN_ERROR";

export const checkAuthorization = (name, nameToken, nameRefreshToken) => {
  const updateData = (token) => {
    return request(`${BASE_URL}auth/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return fetchWithRefresh();
};
