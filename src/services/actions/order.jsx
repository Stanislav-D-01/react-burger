import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";
import { CLEAN_CONSTRUCTOR } from "./burger-constructor";
import { fetchWithRefresh } from "../../utils/burger-api";
import { getCookie } from "../../utils/utils";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCSESS = "SEND_ORDER_SUCCSESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";
export const CLEAN_ORDER = "CLEAR_ORDER";

export function sendOrder(ingr) {
  return function (dispatch) {
    dispatch({ type: SEND_ORDER_REQUEST });
    const token = getCookie("token");

    if (token) {
      fetchWithRefresh(`${BASE_URL}orders`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingr.map((el) => el._id) }),
      })
        .then((order) => {
          dispatch({
            type: SEND_ORDER_SUCCSESS,
            order: order.order,
            ingredients: ingr.map((el) => el._id),
          });
          dispatch({ type: CLEAN_CONSTRUCTOR });
        })
        .catch((err) => {
          dispatch({ type: SEND_ORDER_ERROR, error: err });
          dispatch({ type: CLEAN_CONSTRUCTOR });
        });
    }
  };
}