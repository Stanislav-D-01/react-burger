import {
  Tab,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import priceSym from "../../image/Subtract.svg";
import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/utils.js";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ModalContext } from "../modal/modal-context";
const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("bun");
  const [stateModal, setStateModal] = React.useState(false);
  const [dataIngredient, setDataIngredient] = React.useState({});

  const toggleModal = (e) => {
    setStateModal(!stateModal);
    extractData(e.target);
  };

  React.useEffect(() => {
    if (document.getElementById(current)) {
      document.getElementById(current).scrollIntoView({ behavior: "smooth" });
    }
  }, [current]);

  const extractData = (element) => {
    if (element.closest("li") != undefined) {
      setDataIngredient((state) =>
        data.find((item) => item._id === element.closest("li").id)
      );
    }
  };

  const loadIngredients = (data, type) => {
    return data.map((element) => {
      if (element.type === type) {
        return (
          <li
            key={element._id}
            id={element._id}
            onClick={toggleModal}
            className={styles["section-burger-menu__card"]}
          >
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

  const renderIngredients = (data) => {
    return (
      <>
        <h3 id="bun" className="text text_type_main-medium mt-10">
          Булки
        </h3>
        <ul className={styles["section-burger-menu__cards-ingridients"]}>
          {loadIngredients(data, "bun")}
        </ul>
        <h3 id="sauce" className="text text_type_main-medium mt-10">
          Соуcы
        </h3>
        <ul className={styles["section-burger-menu__cards-ingridients"]}>
          {loadIngredients(data, "sauce")}
        </ul>
        <h3 id="main" className="text text_type_main-medium mt-10">
          Начинки
        </h3>
        <ul className={styles["section-burger-menu__cards-ingridients"]}>
          {loadIngredients(data, "main")}
        </ul>
      </>
    );
  };
  return (
    <>
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
          {renderIngredients(data)}
        </div>
      </section>
      {stateModal && (
        <>
          <ModalContext.Provider value={[setStateModal]}>
            <Modal
              data={dataIngredient}
              closeModal={toggleModal}
              name={"Детали ингредиента"}
            >
              <IngredientsDetails data={dataIngredient} />
            </Modal>
          </ModalContext.Provider>
        </>
      )}
    </>
  );
};

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
