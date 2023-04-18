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
import { ConstructorOrderContext } from "./burger-constructor-context";
import { ModalContext } from "../modal/modal-context";
import { request } from "../../utils/burger-api";
import { urlOrders, dataPropTypes, BASE_URL } from "../../utils/utils";

function BurgerConstructor({ data }) {
  const [ingr, setIngr] = React.useState([]);
  const [order, setOrder] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [stateModal, setStateModal] = React.useState(false);

  React.useEffect(() => {
    if (data.length > 0) {
      setIngr(getIngr(data));
    }
  }, [data]);

  React.useEffect(() => {
    totalPrice(ingr);
  }, [ingr]);

  const getIngr = (data) => {
    const arrBun = [];
    let numBun = 0;
    data.forEach((el) => {
      if (el.type == "bun" && numBun == 0) {
        arrBun.push(el);
        numBun = 1;
      }
      if (el.type != "bun") {
        arrBun.push(el);
      }
    });
    return arrBun;
  };

  const sendOrder = () => {
    request(`${BASE_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingr.map((el) => el._id) }),
    })
      .then((order) => {
        setOrder(order);
        toggleModal();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  const toggleModal = () => {
    setStateModal(!stateModal);
  };
  const renderBun = (arr, type) => {
    return arr.map((el) => {
      if (el.type == "bun") {
        switch (type) {
          case "top":
            return (
              <li
                key={"top_1"}
                className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_top"]}`}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${el.name} (верх)`}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            );
          case "bottom":
            return (
              <li
                key={"bottom_1"}
                className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_bottom"]} `}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${el.name} (низ)`}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            );
        }
      }
    });
  };

  const renderMain = (data) => {
    return data.map((element) => {
      if (element.type !== "bun") {
        return (
          <li key={element._id} className={styles["burger-constructor__point"]}>
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
    const sum = data.reduce((sum, element) => sum + element.price, 0);
    setTotal(sum);
  };

  if (ingr.length > 0) {
    return (
      <section className={styles["burger-constructor"]}>
        <ul className={styles["burger-constructor__list"]}>
          {renderBun(ingr, "top")}
          <ul className={styles["burger-constructor__list-main"]}>
            {renderMain(ingr)}
          </ul>
          {renderBun(ingr, "bottom")}
        </ul>
        <ConstructorOrderContext.Provider value={order}>
          <div className={styles["burger-constructor__total-price-block"]}>
            <p className="text text_type_digits-medium mr-10">
              {total} <img className="pl-2" src={priceSym} />
            </p>

            <Button
              onClick={sendOrder}
              htmlType="button"
              type="primary"
              size="medium"
            >
              Оформить заказ
            </Button>
          </div>
          {stateModal && (
            <>
              <ModalContext.Provider value={[setStateModal]}>
                <Modal closeModal={toggleModal} name={""}>
                  <OrderDetails />
                </Modal>
              </ModalContext.Provider>
            </>
          )}
        </ConstructorOrderContext.Provider>
      </section>
    );
  }
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingr: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
