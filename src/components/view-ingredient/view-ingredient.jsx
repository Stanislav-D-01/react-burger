import IngredientsDetails from "../ingredient-details/ingredient-details";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_INGREDIENT_IN_MODAL,
  DEL_INGREDIENT_IN_MODAL,
} from "../../services/actions/modal";
import { getIngredients } from "../../services/actions/burger-ingredients";
import styles from "./view-ingredient.module.css";

const ViewIngredient = () => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length == 0) {
      dispatch(getIngredients());
    }
    const id = location.pathname.split("/")[2];
    console.log(ingredients.length);
    if (ingredients.length > 0) {
      console.log(ingredients);
      dispatch({
        type: SET_INGREDIENT_IN_MODAL,
        value: ingredients.find((item) => item._id === id),
      });
    }
    return () => {
      dispatch({ type: DEL_INGREDIENT_IN_MODAL });
    };
  }, [ingredients]);

  return (
    <section className={styles["view-ingredient"]}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientsDetails />
    </section>
  );
};

export default ViewIngredient;
