import React from "react";
import styles from "./App.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingredients/burger-ingredients.jsx";
import { urlAdress } from "../utils/utils.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

function App() {
  const [ state, setState ] = React.useState({
    data: [],
    hasError: false,
    successLoad: false,
  });
const errBlock = React.useRef();
  React.useEffect(()=>getDataIngridients(urlAdress)
  ,[]);

  function getDataIngridients(url) {
  
    fetch(url)
      .then(res => res.json())
      .then(dat => setState({ ...state, data: dat.data, hasError: false, successLoad: true }))
      .catch((err) =>{setState({ ...state, hasError: true })
    errBlock.current.textContent = `Ошибка при получении данных с сервера(${err})`
    })
  };
         
  



  return (
  <>
    <AppHeader />
    {!state.hasError && <main className={styles.main}>
      <BurgerIngridients data={state.data} />
      <BurgerConstructor data={state.data} />
    </main>}
    {state.hasError && <div ref={errBlock}></div>}
  </>)}


export default App;
