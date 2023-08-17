import { BASE_URL } from "../../utils/utils";
import { CLEAN_CONSTRUCTOR } from "./burger-constructor";
import { fetchWithRefresh } from "../../utils/burger-api";
import { getCookie } from "../../utils/utils";
import { AppThunk } from "../types/thunk-types";
import { AppDispatch } from "../types/dispatch-types";
import { TIngredients } from "../types/types";
export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCSESS: "SEND_ORDER_SUCCSESS" = "SEND_ORDER_SUCCSESS";
export const SEND_ORDER_ERROR: "SEND_ORDER_ERROR" = "SEND_ORDER_ERROR";
export const CLEAN_ORDER: "CLEAR_ORDER" = "CLEAR_ORDER";

export type TSendOrderRequest = {
  readonly type: typeof SEND_ORDER_REQUEST;
};
export type TSendOrderSuccsess = {
  readonly type: typeof SEND_ORDER_SUCCSESS;
  order: any;
  ingredients: string[];
};
export type TSendOrderError = {
  readonly type: typeof SEND_ORDER_ERROR;
};

export type TCleanOrder = {
  readonly type: typeof CLEAN_ORDER;
};

export type TOrderActions =
  | TSendOrderRequest
  | TSendOrderSuccsess
  | TSendOrderError
  | TCleanOrder;

export function sendOrder(ingr: any) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: SEND_ORDER_REQUEST });
    const token = getCookie("token");

    if (token) {
      fetchWithRefresh(`${BASE_URL}orders`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingr.map((el: { _id: string }) => el._id),
        }),
      })
        .then((order) => {
          dispatch({
            type: SEND_ORDER_SUCCSESS,
            order: order.order,
            ingredients: ingr.map((el: { _id: string }) => el._id),
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
