import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home-page.module.css";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/burger-ingredients";
import { checkAuthorization } from "../services/actions/check-autorization.jsx";

const HomePage = () => {
  const errBlock = useRef();
  const dispatch = useDispatch();
  const { ingredientsRequest, request } = useSelector((store) => ({
    ingredientsRequest: store.ingredients.ingredientsRequest,
    request: store.auth.request,
  }));

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    !ingredientsRequest &&
    !request && (
      <main className={styles.home}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngridients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    )
  ); 
};

export default HomePage;
