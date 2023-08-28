import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/utils";

import { useSelector, useDispatch } from "../../services/types/hooks-types";
import { useEffect, useState, useMemo } from "react";

import { useInView } from "react-intersection-observer";
import Ingredient from "../ingredient/ingredient";
import { useLocation } from "react-router-dom";
import { TIngredients } from "../../services/types/types";
const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>("bun");

  const {
    dataIngredients,
    ingredientsConstructor,
    ingrLoad,
    ingredientInModal,
  } = useSelector((store) => ({
    dataIngredients: store.ingredients.ingredients,
    ingredientsConstructor: store.burgerConstructor.ingredientsConstructor,
    ingrLoad: store.ingredients.ingredientsSuccess,
    ingredientInModal: store.modal.ingredient,
  }));

  const [refBun, inViewBun] = useInView({ threshold: 0.2 });
  const [refMain, inViewMain] = useInView({ threshold: 0.3 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.8, delay: 500 });

  useEffect(() => {
    if (!inViewBun && !inViewMain && inViewSauce) {
      setCurrent("sauce");
    }
    if (!inViewBun && inViewMain && !inViewSauce) {
      setCurrent("main");
    }
    if (inViewBun && !inViewMain && inViewSauce) {
      setCurrent("bun");
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  useEffect(() => {
    if (document.getElementById(current)) {
      document.getElementById(current)!.scrollIntoView({ behavior: "smooth" });
    }
  }, [current]);

  const loadIngredients = useMemo(
    () => (data: TIngredients[], type: string) => {
      return data.map((element: TIngredients, index: number) => {
        if (element.type === type) {
          const counter = ingredientsConstructor.filter(
            (item: TIngredients) => item._id === element._id
          ).length;
          return <Ingredient key={index} ingr={element} counter={counter} />;
        }
      });
    },
    [ingredientsConstructor]
  );

  const renderIngredients = (data: TIngredients[]) => {
    return (
      <>
        <h3 id="bun" className="text text_type_main-medium mt-10">
          Булки
        </h3>
        <ul
          ref={refBun}
          className={styles["section-burger-menu__cards-ingridients"]}
        >
          {loadIngredients(data, "bun")}
        </ul>
        <h3 id="sauce" className="text text_type_main-medium mt-10">
          Соуcы
        </h3>
        <ul
          ref={refSauce}
          className={styles["section-burger-menu__cards-ingridients"]}
        >
          {loadIngredients(data, "sauce")}
        </ul>
        <h3 id="main" className="text text_type_main-medium mt-10">
          Начинки
        </h3>
        <ul
          ref={refMain}
          className={styles["section-burger-menu__cards-ingridients"]}
        >
          {loadIngredients(data, "main")}
        </ul>
      </>
    );
  };
  if (ingrLoad) {
    return (
      <>
        <section className={styles["section-burger-ingridients"]}>
          <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
          <div style={{ display: "flex" }}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={current === "sauce"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>

          <div className={styles["section-burger-ingridients__list"]}>
            {renderIngredients(dataIngredients!)}
          </div>
        </section>
      </>
    );
  } else return <></>;
};

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
