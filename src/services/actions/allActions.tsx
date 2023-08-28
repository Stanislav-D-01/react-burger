import { TAuthorizationActions } from "./authorization";
import { TBurgerConstructorActions } from "./burger-constructor";
import { TBurgerIngredientsActions } from "./burger-ingredients";
import { TCheckAutorizationAction } from "./check-autorization";
import { TFeedsActions } from "./feeds";
import { TModalActions } from "./modal";
import { TOrderActions } from "./order";
import { TUserOrderActions } from "./userOrder";

export type TAllActions =
  | TAuthorizationActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TCheckAutorizationAction
  | TFeedsActions
  | TModalActions
  | TOrderActions
  | TUserOrderActions;
