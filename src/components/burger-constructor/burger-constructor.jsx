import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import priceSym from "../../image/Subtract_constructor.svg";
import React from "react";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { ModalContext } from "../modal/modal-context";
import { dataPropTypes } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {
  ADD_INGR_IN_CONSTRUCTOR,
  ADD_BUN_IN_CONSTRUCTOR,
  DEL_INGR_CONSTRUCTOR,
  CALC_TOTAL_PRICE,
} from "../../services/actions/burger-constructor";
import { sendOrder } from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor() {
  const { ingr, ingrConstr, order, total, orderRequest, orderFailed } =
    useSelector((store) => ({
      ingr: store.ingredients.ingredients,
      ingrConstr: store.burgerConstructor.ingredientsConstructor,
      order: store.order.order,
      total: store.burgerConstructor.total,
      orderRequest: store.order.orderRequest,
      orderFailed: store.order.orderFailed,
    }));
  const [isModal, setIsModal] = React.useState(false);
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingred",

    drop(item) {
      const ingredient = {
        ...ingr.find((el) => el._id === item._id),
        uuid: uuidv4(),
      };
      if (ingredient && ingredient.type !== "bun") {
        dispatch({
          type: ADD_INGR_IN_CONSTRUCTOR,
          value: ingredient,
        });
      } else {
        dispatch({
          type: ADD_BUN_IN_CONSTRUCTOR,
          value: ingredient,
        });
        totalPrice(ingrConstr);
      }
    },
  });

  React.useEffect(() => {
    totalPrice(ingrConstr);
  }, [ingrConstr]);

  React.useEffect(() => {
    addBunStart(ingr);
  }, [ingr]);

  const addBunStart = (arrIngr) => {
    if (arrIngr.length > 0) {
      const bunTop = {
        ...arrIngr.find((item) => item.type == "bun"),
        uuid: uuidv4(),
      };
      const bunBottom = {
        ...arrIngr.find((item) => item.type == "bun"),
        uuid: uuidv4(),
      };
      dispatch({ type: ADD_INGR_IN_CONSTRUCTOR, value: bunTop });
      dispatch({ type: ADD_INGR_IN_CONSTRUCTOR, value: bunBottom });
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const createOrder = () => {
    if (ingrConstr.length > 0) {
      dispatch(sendOrder(ingrConstr));
      toggleModal();
    }
  };

  const deleteIngr = (e) => {
    dispatch({ type: DEL_INGR_CONSTRUCTOR, value: e.target.closest("li").id });
  };

  const renderBun = (arr, type) => {
    if (type === "top") {
      return (
        <BurgerConstructorElement
          data={arr[0]}
          id={0}
          type={type}
          isLocked={true}
        />
      );
    } else {
      return (
        <BurgerConstructorElement
          data={arr[1]}
          id={1}
          type={type}
          isLocked={true}
        />
      );
    }
  };

  const renderMain = (data) => {
    return data.map((element, index) => {
      if (element.type !== "bun") {
        return (
          <BurgerConstructorElement
            data={element}
            id={index}
            deleteIngr={deleteIngr}
          />
        );
      }
    });
  };

  const totalPrice = (data) => {
    const sum = data.reduce((sum, element) => sum + element.price, 0);
    dispatch({ type: CALC_TOTAL_PRICE, value: sum });
  };

  if (ingrConstr.length > 0) {
    return (
      <section ref={dropRef} className={styles["burger-constructor"]}>
        <ul className={styles["burger-constructor__list"]}>
          {renderBun(ingrConstr, "top")}
          <ul className={styles["burger-constructor__list-main"]}>
            {renderMain(ingrConstr)}
          </ul>
          {renderBun(ingrConstr, "bottom")}
        </ul>

        <div className={styles["burger-constructor__total-price-block"]}>
          <p className="text text_type_digits-medium mr-10">
            {total} <img className="pl-2" src={priceSym} />
          </p>

          <Button
            onClick={createOrder}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Оформить заказ
          </Button>
        </div>
        {isModal && !orderRequest && !orderFailed && (
          <>
            <ModalContext.Provider value={[setIsModal]}>
              <Modal name={""}>
                <OrderDetails />
              </Modal>
            </ModalContext.Provider>
          </>
        )}
      </section>
    );
  }
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingr: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
