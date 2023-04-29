import { combineReducers } from "redux";


import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCSESS,
  GET_INGREDIENTS_ERROR,
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
  TOGGLE_MODAL_INGR, ADD_INGR_IN_CONSTRUCTOR, 
  CALC_TOTAL_PRICE,
  TOGGLE_MODAL_ORDER, 
  SEND_ORDER_REQUEST, 
  SEND_ORDER_SUCCSESS, 
  SEND_ORDER_ERROR,
  ADD_BUN_IN_CONSTRUCTOR
} from "../actions/index"

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredient:{},
  isModalIngr: false,
  isModalOrder:false,
  ingredientsConstructor:[],
  order:{},
  orderRequest:false,
  orderFailed:false,
  total:0
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCSESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingr,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return { ...state, ingredientsRequest: true, ingredientsFailed: true };
    }
    case SET_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: action.value };
    }
    case DEL_INGREDIENT_IN_MODAL: {
      return { ...state, ingredient: {} };
    }
    case TOGGLE_MODAL_INGR:{
      return {...state, isModalIngr: !state.isModalIngr}
    }
    case TOGGLE_MODAL_ORDER:{
      return {...state, isModalOrder: !state.isModalOrder}
    }
    case ADD_INGR_IN_CONSTRUCTOR:{
      return {...state, ingredientsConstructor: ([...state.ingredientsConstructor, action.value])}
    }
    case ADD_BUN_IN_CONSTRUCTOR:{
      return {...state, ingredientsConstructor}
    }
    case CALC_TOTAL_PRICE:{
      return{...state, total: action.value}
    }
    case SEND_ORDER_REQUEST:{
      return {...state, orderRequest: true}
    }
    case SEND_ORDER_SUCCSESS:{
      return {...state, orderRequest: false, orderFailed: false, order: action.order}
    }
    case SEND_ORDER_ERROR:{
      return{...state, orderRequest:false, orderFailed: true}
    }
    default: {
      return state;
    }
  }
};






export const rootReducer = combineReducers({
  state: ingredientsReducer,

});
