import {
  Tab,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-ingredients.module.css";
import { data } from "../utils/utils.js";

class BurgerIngredients extends React.Component {
  state = {
    current: "one",
    setCurrent: "",
    dataIngr: data,
  };

  creatList = (arrayIngr) => {
    return arrayIngr.reduce((items, item) => {
      items += 
        '<li>'+
          <ConstructorElement
            type={"type"}
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={item.image}
          />
        +'</li>'
      );

      return items;
    });
  };

  render() {
    return (
      <section className={styles["section-burger-menu"]}>
        <h2>Соберите бургер</h2>
        <div style={{ display: "flex" }}>
          <Tab
            value="one"
            active={this.state.current === "one"}
            onClick={this.state.setCurrent}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={this.state.current === "two"}
            onClick={this.state.setCurrent}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={this.state.current === "three"}
            onClick={this.state.setCurrent}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles["section-burger-menu__ingridients"]}>
          <h3 className="text text_type_main-large">Булки</h3>
          <ul className={styles["section-burger-menu__ingridients-list"]}>
            {this.creatList(this.state.dataIngr)}
          </ul>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
