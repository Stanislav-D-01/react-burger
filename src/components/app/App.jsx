import React from "react";

import styles from "./App.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingredients/burger-ingredients.jsx";
import { data } from "../utils/utils.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;
