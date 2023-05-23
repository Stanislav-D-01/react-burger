import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";
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

  const getNewToken = (refreshToken) => {
    if (refreshToken) {
      return request(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
    }
  };

  return function (dispatch) {
    let token = getCookie(nameToken);

    if (!name && token) {
      dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_REQUEST" });
      updateData(token)
        .then((data) => {
          dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_SUCCESS", data: data });
        })
        .catch(() => {
          dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_ERROR" });
          const refreshToken = getCookie(nameRefreshToken);
          getNewToken(refreshToken).then((data) => {
            if (data.accessToken.indexOf("Bearer") === 0) {
              token = data.accessToken.split("Bearer ")[1];
            }
            if (token) {
              setCookie("token", token);
            }
            setCookie("refreshToken", data.refreshToken);
            dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_REQUEST" });
            updateData(token)
              .then((data) => {
                dispatch({
                  type: "CHECK_AUTHORIZATION_TOKEN_SUCCESS",
                  data: data,
                });
              })
              .catch(() => {
                dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_ERROR" });
              });
          });
        });
    }
    if (!name && !token) {
      const refreshToken = getCookie(nameRefreshToken);
      if (refreshToken) {
        getNewToken(refreshToken).then((data) => {
          if (data.accessToken.indexOf("Bearer") === 0) {
            token = data.accessToken.split("Bearer ")[1];
          }
          if (token) {
            setCookie("token", token);
          }
          setCookie("refreshToken", data.refreshToken);
        });
        updateData(token)
          .then((data) => {
            dispatch({
              type: "CHECK_AUTHORIZATION_TOKEN_SUCCESS",
              data: data,
            });
          })

          .catch(() => {
            dispatch({ type: "CHECK_AUTHORIZATION_TOKEN_ERROR" });
          });
      }
    }
  };
};
