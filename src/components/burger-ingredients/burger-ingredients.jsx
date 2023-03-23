import {
  Tab,
  ConstructorElement,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import priceSym from "../../image/Subtract.svg";
import React from "react";
import PropTypes from "prop-types";

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

class BurgerIngredients extends React.Component {
  state = {
    current: "one",
  };

  loadingridients = (data, type) => {
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

  render() {
    return (
      <section className={styles["section-burger-ingridients"]}>
        <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
        <div style={{ display: "flex" }}>
          <Tab
            value="one"
            active={this.state.current === "one"}
            onClick={"one"}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={this.state.current === "two"}
            onClick={"one"}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={this.state.current === "three"}
            onClick={"one"}
          >
            Начинки
          </Tab>
        </div>

        <div className={styles["section-burger-ingridients__list"]}>
          <h3 className="text text_type_main-medium mt-10">Булки</h3>
          <ul className={styles["section-burger-menu__cards-ingridients"]}>
            {this.loadingridients(this.props.data, "bun")}
          </ul>

          <h3 className="text text_type_main-medium mt-10">Соусы</h3>
          <ul className={styles["section-burger-menu__cards-ingridients"]}>
            {this.loadingridients(this.props.data, "sauce")}
          </ul>

          <h3 className="text text_type_main-medium mt-10">Начинки</h3>
          <ul className={styles["section-burger-menu__cards-ingridients"]}>
            {this.loadingridients(this.props.data, "main")}
          </ul>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes)),
};
