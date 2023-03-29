import {
  Tab,
  ConstructorElement,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import priceSym from "../../image/Subtract.svg";
import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes, urlAdress } from "../utils/utils.js";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
 



 

  

  const loadingridients = (data, type) => {
    return data.map((element) => {
      if (element.type === type) {
        return (
          <li key={element._id} className={styles["section-burger-menu__card"]}>
            <img src={element.image} />
            <p className="text text_type_digits-default">
              {element.price}
              <img className="pl-2" src={priceSym} />
            </p>
            <p className="text text_type_main-small mt-2">{element.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
          </li>
        );
      }
    });
  };

  const renderIngridients = (data, type) => {
    return (
      <>
        <h3 className="text text_type_main-medium mt-10">
          {current === "bun"
            ? "Булки"
            : current === "sauce"
            ? "Соусы"
            : "Начинки"}
        </h3>
        <ul className={styles["section-burger-menu__cards-ingridients"]}>
          {loadingridients(data, type)}
        </ul>
      </>
    );
  };

  return (
    <section className={styles["section-burger-ingridients"]}>
      <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

    
        <div className={styles["section-burger-ingridients__list"]}>
          {renderIngridients(props.data, current)}
        </div>
      
  
    </section>
  );
}

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes)),
};
