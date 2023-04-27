import {
  Tab,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import priceSym from "../../image/Subtract.svg";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/utils.js";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ModalContext } from "../modal/modal-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  DEL_INGREDIENT_IN_MODAL,
  SET_INGREDIENT_IN_MODAL,
} from "../../services/actions/index";
import { useInView } from "react-intersection-observer";
import { useDrag } from "react-dnd";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  const [id, setId] = useState("");
  const [isModal, setIsModal] = useState(false);
  const { dataIngredients } = useSelector((store) => ({
    dataIngredients: store.state.ingredients,
  }));
  const dispatch = useDispatch();

  const [, refIng] = useDrag({
    type: "ingredients",
    item: { id },
  });

  const toggleModal = (e) => {
    if (!isModal) {
      setIsModal(true);
      addIngredientInModal(e.target);
    } else {
      setIsModal(false);
      dispatch({ type: DEL_INGREDIENT_IN_MODAL });
    }
  };

  const [refBun, inViewBun] = useInView({ threshold: 1 });
  const [refMain, inViewMain] = useInView({ threshold: 0.4 });
  const [refSauce, inViewSauce] = useInView({ threshold: 1, delay: 500 });

  useEffect(() => {
    if (!inViewBun && !inViewMain && inViewSauce) {
      setCurrent("sauce");
    }
    if (!inViewBun && inViewMain && !inViewSauce) {
      setCurrent("main");
    }
    if (inViewBun && !inViewMain && !inViewSauce) {
      setCurrent("bun");
    }

    console.log(`bun -${inViewBun} suace-${inViewSauce} main-${inViewMain}`);
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

  const loadIngredients = (data, type) => {
    return data.map((element) => {
      if (element.type === type) {
        return (
          <li
            ref={refIng}
            key={element._id}
            id={element._id}
            onClick={toggleModal}
            onMouseDown={(e) => setId(e.target.parentElement.id)}
            className={styles["section-burger-menu__card"]}
          >
            <img src={element.image} />
            <p className="text text_type_digits-default">
              {element.price}
              <img className="pl-2" src={priceSym} />
            </p>
            <p className="text text_type_main-small mt-2">{element.name}</p>
            <Counter count={0} size="default" extraClass="m-1" />
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
          {renderIngredients(dataIngredients)}
        </div>
      </section>
      {isModal && (
        <>
          <ModalContext.Provider value={[setIsModal]}>
            <Modal>
              name={"Детали ингредиента"}
              <IngredientsDetails />
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
