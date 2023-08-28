export const SET_INGREDIENT_IN_MODAL: "SET_INGREDIENT_IN_MODAL" =
  "SET_INGREDIENT_IN_MODAL";
export const DEL_INGREDIENT_IN_MODAL: "DEL_INGREDIENT_IN_MODAL" =
  "DEL_INGREDIENT_IN_MODAL";
export const TOGGLE_MODAL_INGR: "TOGGAL_MODAL_INGR" = "TOGGAL_MODAL_INGR";
export const TOGGLE_MODAL_ORDER: "TOGGAL_MODAL_ORDER" = "TOGGAL_MODAL_ORDER";

export type TSetIngredientInModal = {
  readonly type: typeof SET_INGREDIENT_IN_MODAL;
  readonly value: any;
};

export type TDelIngredientInModal = {
  readonly type: typeof DEL_INGREDIENT_IN_MODAL;
};

export type TToggleModalIngr = {
  readonly type: typeof TOGGLE_MODAL_INGR;
};

export type TToggleModalOrder = {
  readonly type: typeof TOGGLE_MODAL_ORDER;
};

export type TModalActions =
  | TSetIngredientInModal
  | TDelIngredientInModal
  | TToggleModalIngr
  | TToggleModalOrder;
