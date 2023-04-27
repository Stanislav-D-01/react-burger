import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const errBlock = React.useRef();
  const dispatch = useDispatch();
  const { ingredientsFailed } = useSelector((store) => store.state.ingredients);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {!ingredientsFailed ? (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : (
        <main className={styles.main}>Ошибка загрузки данных с сервера</main>
      )}
    </>
  );
}

export default App;
