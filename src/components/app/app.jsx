import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingredients/burger-ingredients.jsx";
import { BASE_URL } from "../../utils/utils";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { request } from "../../utils/burger-api";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";

function App() {
  const errBlock = React.useRef();
  const dispatch = useDispatch();
  const { ingredientsFailed } = useSelector(
    (store) => store.ingredients.ingredients
  );

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {!ingredientsFailed ? (
        <main className={styles.main}>
          <BurgerIngridients />
        </main>
      ) : (
        <main className={styles.main}>Ошибка загрузки данных с сервера</main>
      )}
    </>
  );
}

export default App;
