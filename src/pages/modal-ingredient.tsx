import Modal from "../components/modal/modal";
import IngredientsDetails from "../components/ingredient-details/ingredient-details";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "../services/types/hooks-types";
import {
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
} from "../services/actions/modal";
import { getIngredients } from "../services/actions/burger-ingredients";

export const ModalIngredient = () => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredient = useSelector((store) => store.modal.ingredient);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredient) {
      const id = location.pathname.split("/")[2];
      if (ingredients!.length > 0) {
        dispatch({
          type: SET_INGREDIENT_IN_MODAL,
          value: ingredients!.find((item) => item._id === id),
        });
      }
    }
    return () => {
      dispatch({ type: DEL_INGREDIENT_IN_MODAL });
    };
  }, [ingredients]);

  return (
    <Modal name={"Детали ингредиента"}>
      <IngredientsDetails />
    </Modal>
  );
};

export default ModalIngredient;
