import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/app-header.jsx";
import BurgerIngridients from "./components/burger-ingredients/burger-ingredients.jsx";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngridients />
      </main>
    </>
  );
}

export default App;
