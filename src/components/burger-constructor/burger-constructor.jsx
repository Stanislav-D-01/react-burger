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
import {
  ADD_INGR_IN_CONSTRUCTOR,
   CALC_TOTAL_PRICE,
  sendOrder,
  ADD_BUN_IN_CONSTRUCTOR,
  DEL_INGR_CONSTRUCTOR,
} from "../../services/actions/index";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

function BurgerConstructor() {
  const { ingr, ingrConstr, order, total, orderRequest, orderFailed } =
    useSelector((store) => ({
      ingr: store.state.ingredients,
      ingrConstr: store.state.ingredientsConstructor,
      order: store.state.order,
      total: store.state.total,
      orderRequest: store.state.orderRequest,
      orderFailed: store.state.orderFailed,
    }));
  const [isModal, setIsModal] = React.useState(false);
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingred",

    drop(item) {
      if (ingr.find((el) => el._id === item._id && el.type !== "bun")) {
        dispatch({
          type: ADD_INGR_IN_CONSTRUCTOR,
          value: ingr.find((el) => el._id === item._id),
        });
        console.log(item);
      } else {
        dispatch({
          type: ADD_BUN_IN_CONSTRUCTOR,
          value: ingr.find((el) => el._id === item._id),
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
      const bun = arrIngr.find((item) => item.type == "bun");
      dispatch({ type: ADD_INGR_IN_CONSTRUCTOR, value: bun });
      dispatch({ type: ADD_INGR_IN_CONSTRUCTOR, value: bun });
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
