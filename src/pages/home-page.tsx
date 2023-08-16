import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home-page.module.css";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "../services/types/hooks-types";
import { getIngredients } from "../services/actions/burger-ingredients";
import { checkAuthorization } from "../services/actions/check-autorization";

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

  if (!ingredientsRequest && !request) {
    return (
      <main className={styles.home}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngridients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    );
  } else return <></>;
};

export default HomePage;
