import IngredientsDetails from "../ingredient-details/ingredient-details";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_INGREDIENT_IN_MODAL } from "../../services/actions/modal";
import { getIngredients } from "../../services/actions/burger-ingredients";
import styles from "./view-ingredient.module.css";

const ViewIngredient = () => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    const id = location.pathname.split("/")[2];
    if (ingredients.length > 0) {
      console.log(ingredients);
      dispatch({
        type: SET_INGREDIENT_IN_MODAL,
        value: ingredients.find((item) => item._id === id),
      });
    }
  }, []);

  return (
    <section className={styles["view-ingredient"]}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientsDetails />
    </section>
  );
};

export default ViewIngredient;
