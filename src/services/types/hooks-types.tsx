import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";

import { AppThunk } from "../../services/types/thunk-types";
import { RootState } from "../..";
import { AppDispatch } from "./dispatch-types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
