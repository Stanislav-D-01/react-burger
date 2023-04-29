import { request } from "../../utils/burger-api";
import { BASE_URL } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCSESS = "GET_INGREDIENTS_SUCCSESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const SET_INGREDIENT_IN_MODAL = "SET_INGREDIENT_IN_MODAL";
export const DEL_INGREDIENT_IN_MODAL = "DEL_INGREDIENT_IN_MODAL";
export const TOGGLE_MODAL_INGR = "TOGGAL_MODAL_INGR"
export const TOGGLE_MODAL_ORDER = "TOGGAL_MODAL_ORDER"
export const ADD_INGR_IN_CONSTRUCTOR = "ADD_INGR_IN_CONSTRUCTOR"
export const CALC_TOTAL_PRICE = "CALC_TOTAL_PRICE"
export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCSESS = "SEND_ORDER_SUCCSESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";
export const ADD_BUN_IN_CONSTRUCTOR = "ADD_BUN_IN_CONSTRUCTOR"

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
        });
    };
  }
  
  export function sendOrder (ingr)  {
    return function (dispatch){
      dispatch({type: SEND_ORDER_REQUEST})
    
    request(`${BASE_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingr.map((el) => el._id) }),
    })
      .then((order) => {
        dispatch({type: SEND_ORDER_SUCCSESS, order: order.order})
      })
      .catch((err)=>{dispatch({type: SEND_ORDER_ERROR, error:err})})
  }
}