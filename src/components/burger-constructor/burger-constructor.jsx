import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import priceSym from "../../image/Subtract_constructor.svg";
import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../utils/utils";
import OrderDetails from "../order-details/order-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import {
  ConstructorIngridientsContext,
  ConstructorTotalPrice,
} from "./burger-constructor-context";

function BurgerConstructor({ data }) {
  const [ingr, setIngr] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [stateModal, setStateModal] = React.useState(false);
  const [numBun, setNumBun] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setStateModal(false);
      }
    });
  }, [data]);

  const toggleModal = () => {
    setStateModal(!stateModal);
  };

  const renderListOrder = (data) => {
    return data.map((element) => {
      if (element.type !== "bun") {
        setIngr(...ingr, element);
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

  if (data.length > 0) {
    return (
      <>
        <section className={styles["burger-constructor"]}>
          <ul className={styles["burger-constructor__list"]}>
            <li
              key={data[0]._id}
              className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${data[0].name} (верх)`}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            {renderListOrder({ data })}
            <li
              key={data[1]._id}
              className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${data[0].name} (низ)`}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
          </ul>
          <ConstructorIngridientsContext.Provider>
            <div className={styles["burger-constructor__total-price-block"]}>
              <p className="text text_type_digits-medium mr-10">
                {total} <img className="pl-2" src={priceSym} />
              </p>

              <Button
                onClick={toggleModal}
                htmlType="button"
                type="primary"
                size="medium"
              >
                Оформить заказ
              </Button>
            </div>
            {stateModal && (
              <>
                <ModalOverlay onClose={toggleModal} />
                <Modal closeModal={toggleModal} name={""}>
                  <OrderDetails numOrder={"000001"} />
                </Modal>
              </>
            )}
          </ConstructorIngridientsContext.Provider>
        </section>
      </>
    );
  }
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingr: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
