import React from "react";

import styles from "./App.module.css";
import AppHeader from "./components/app-header/app-header.jsx";
import BurgerIngridients from "./components/burger-ingredients/burger-ingredients.jsx";
import { data } from "../src/components/utils/utils.js";
import BurgerConstructor from "./components/burger-constructor/burger-constructor.jsx";

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
