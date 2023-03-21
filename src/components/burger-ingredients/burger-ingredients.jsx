import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={styles["section-burger-menu"]}>
      <h2>Соберите бургер</h2>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles["section-burger-menu__ingridients"]}>
        <h3 className="text text_type_main-large">Булки</h3>
        <div className={styles["section-burger-menu__ingridients"]}>

        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
