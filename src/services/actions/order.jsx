import { BASE_URL } from "../../utils/utils";
import { request } from "../../utils/burger-api";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCSESS = "SEND_ORDER_SUCCSESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";

export function sendOrder(ingr) {
  return function (dispatch) {
    dispatch({ type: SEND_ORDER_REQUEST });

    request(`${BASE_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingr.map((el) => el._id) }),
    })
      .then((order) => {
        dispatch({ type: SEND_ORDER_SUCCSESS, order: order.order });
      })
      .catch((err) => {
        dispatch({ type: SEND_ORDER_ERROR, error: err });
      });
  };
}
