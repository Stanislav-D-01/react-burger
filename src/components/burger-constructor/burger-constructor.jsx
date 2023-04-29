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
  TOGGLE_MODAL_ORDER,
  CALC_TOTAL_PRICE,
  sendOrder,
} from "../../services/actions/index";
import { useDrop } from "react-dnd";

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
    accept: 'ingred',
    
    drop(item) {
      dispatch({type:ADD_INGR_IN_CONSTRUCTOR,
        value: ingr.find(el=>el._id===item._id)
      })
      console.log(item._id);
    },
  });

  React.useEffect(() => {
    totalPrice(ingrConstr);
  }, [ingrConstr]);

  React.useEffect(() => {
    addBunStart(ingr);
  }, [ingr]);

  const addIngr = (objIngr) => {
    dispatch({ type: ADD_INGR_IN_CONSTRUCTOR, value: objIngr });
  };

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

  const renderBun = (arr, type) => {
if (type === "top") {   
    
      return (
          
            
              <li
                key={"top_1"}
                className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_top"]}`}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${arr[0].name} (верх)`}
                  price={arr[0].price}
                  thumbnail={arr[0].image}
                />
              </li>)} else
    
          
            
            {return (
              <li
                key={"bottom_1"}
                className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_bottom"]} `}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${arr[1].name} (низ)`}
                  price={arr[1].price}
                  thumbnail={arr[1].image}
                />
              </li>)}
           
            
            
    }
      
 
  const renderMain = (data) => {
    return data.map((element) => {
      if (element.type !== "bun") {
        return (
          <li key={element.index} className={styles["burger-constructor__point"]}>
            <ConstructorElement
              text={element.name}
              price={element.price}
              thumbnail={element.image}
            />
          </li>
        );
      }
    });
  };

  const totalPrice = (data) => {
    const sum = data.reduce((sum, element) => sum + element.price,0);
    dispatch({ type: CALC_TOTAL_PRICE, value: sum });
  };

  if (ingrConstr.length > 0) {
    return (
      <section ref={dropRef} className={styles["burger-constructor"]}>
        <ul  className={styles["burger-constructor__list"]}>
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
