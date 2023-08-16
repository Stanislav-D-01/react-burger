import { TIngredients } from "../types/types";

export const ADD_INGR_IN_CONSTRUCTOR: "ADD_INGR_IN_CONSTRUCTOR" =
  "ADD_INGR_IN_CONSTRUCTOR";
export const ADD_BUN_IN_CONSTRUCTOR: "ADD_BUN_IN_CONSTRUCTOR" =
  "ADD_BUN_IN_CONSTRUCTOR";
export const DEL_INGR_CONSTRUCTOR: "DEL_INGR_CONSTRUCTOR" =
  "DEL_INGR_CONSTRUCTOR";
export const MOVE_INGR_CONSTRUCTOR: "MOVE_INGR_CONSTRUCTOR" =
  "MOVE_INGR_CONSTRUCTOR";
export const CALC_TOTAL_PRICE: "CALC_TOTAL_PRICE" = "CALC_TOTAL_PRICE";
export const CLEAN_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export type TAddIngrInConstructor = {
  readonly type: typeof ADD_INGR_IN_CONSTRUCTOR;
  readonly value: any;
};

export type TAddBunInConstructor = {
  readonly type: typeof ADD_BUN_IN_CONSTRUCTOR;
  readonly valueTop: TIngredients;
  readonly valueBottom: TIngredients;
};

export type TDelIngrConstructor = {
  readonly type: typeof DEL_INGR_CONSTRUCTOR;
  readonly value: any;
};

export type TMoveIngrConstructor = {
  readonly type: typeof MOVE_INGR_CONSTRUCTOR;
  readonly indexDrop: any;
  readonly indexDrag: any;
};

export type TCalcTotalPrice = {
  readonly type: typeof CALC_TOTAL_PRICE;
  readonly value: number;
};
export type TCleanConstructor = {
  readonly type: typeof CLEAN_CONSTRUCTOR;
};

export type TBurgerConstructorActions =
  | TAddIngrInConstructor
  | TAddBunInConstructor
  | TDelIngrConstructor
  | TMoveIngrConstructor
  | TCalcTotalPrice
  | TCleanConstructor;
