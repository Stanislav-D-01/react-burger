import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/utils.js";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ModalContext } from "../modal/modal-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  DEL_INGREDIENT_IN_MODAL,
  SET_INGREDIENT_IN_MODAL,
} from "../../services/actions/modal";
import { useInView } from "react-intersection-observer";
import Ingredient from "../ingredient/ingredient";
import { useLocation, Outlet } from "react-router-dom";
const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  const [isModal, setIsModal] = useState(false);

  const { dataIngredients, ingredientsConstructor, ingrLoad } = useSelector(
    (store) => ({
      dataIngredients: store.ingredients.ingredients,
      ingredientsConstructor: store.burgerConstructor.ingredientsConstructor,
      ingrLoad: store.ingredients.ingredientsSuccess,
    })
  );
  const dispatch = useDispatch();
  let location = useLocation();
  const toggleModal = (e) => {
    if (!isModal) {
      // setIsModal(true);

      addIngredientInModal(e.target);
    } else {
      //  setIsModal(false);
      dispatch({ type: DEL_INGREDIENT_IN_MODAL });
    }
  };

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
      document.getElementById(current).scrollIntoView({ behavior: "smooth" });
    }
  }, [current]);

  const addIngredientInModal = (element) => {
    if (element.closest("li") != undefined) {
      const ingr = dataIngredients.find(
        (item) => item._id === element.closest("li").id
      );
      dispatch({
        type: SET_INGREDIENT_IN_MODAL,
        value: ingr,
      });
    }
  };

  const loadIngredients = useMemo(
    () => (data, type) => {
      return data.map((element, index) => {
        if (element.type === type) {
          const counter = ingredientsConstructor.filter(
            (item) => item._id === element._id
          ).length;
          return (
            <Ingredient
              key={index}
              ingr={element}
              toggleModal={toggleModal}
              counter={counter}
            />
          );
        }
      });
    },
    [ingredientsConstructor]
  );

  const renderIngredients = (data) => {
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
            {renderIngredients(dataIngredients)}
          </div>
        </section>

        {isModal && (
          <>
            <ModalContext.Provider value={[setIsModal]}>
              <Modal name={"Детали ингредиента"}>
                <IngredientsDetails />
              </Modal>
            </ModalContext.Provider>
          </>
        )}
      </>
    );
  }
};

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
