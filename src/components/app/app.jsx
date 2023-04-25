import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingredients/burger-ingredients.jsx";
import { BASE_URL } from "../../utils/utils";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { request } from "../../utils/burger-api";

function App() {
  const [state, setState] = React.useState({
    data: [],
    hasError: false,
    successLoad: false,
  });
  const errBlock = React.useRef();
  React.useEffect(() => {
    getDataIngredients(BASE_URL);
  }, []);

  function getDataIngredients(url) {
    request(`${url}ingredients`)
      .then((dat) =>
        setState({
          data: dat.data,
          hasError: false,
          successLoad: true,
        })
      )
      .catch((err) => {
        setState({ ...state, hasError: true });
        errBlock.current.textContent = `Ошибка при получении данных с сервера(${err})`;
      });
  }

  return (
    <>
      <AppHeader />
      {state.hasError ? (
        <div ref={errBlock}></div>
      ) : (
        <main className={styles.main}>
          <BurgerIngridients data={state.data} />
          <BurgerConstructor data={state.data} />
        </main>
      )}
    </>
  );
}

export default App;
