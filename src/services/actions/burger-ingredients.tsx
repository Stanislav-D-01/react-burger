import { request } from "../../utils/burger-api";
import { BASE_URL } from "../../utils/utils";
import { CLEAN_CONSTRUCTOR } from "./burger-constructor";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCSESS: "GET_INGREDIENTS_SUCCSESS" =
  "GET_INGREDIENTS_SUCCSESS";
export const GET_INGREDIENTS_ERROR: "GET_INGREDIENTS_ERROR" =
  "GET_INGREDIENTS_ERROR";

export type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccsess = {
  readonly type: typeof GET_INGREDIENTS_SUCCSESS;
  readonly ingr: object[];
};
export type TGetIngredientsError = {
  readonly type: typeof GET_INGREDIENTS_ERROR;
};

export type TBurgerIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccsess
  | TGetIngredientsError;

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request(`${BASE_URL}ingredients`)
      .then((data) => {
        dispatch({ type: GET_INGREDIENTS_SUCCSESS, ingr: data.data });
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_ERROR, error: err });
        dispatch({ type: CLEAN_CONSTRUCTOR });
      });
  };
}
