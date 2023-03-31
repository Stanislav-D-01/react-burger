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

function BurgerConstructor(props) {
  const [ingr, setIngr] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [stateModal, setStateModal] = React.useState(false);

  React.useEffect(() => {
    setIngr(...ingr, props.data);
    totalPrice(props.data);
  }, [props.data]);

  const toggleModal = () => {
    setStateModal(!stateModal);
  };

  const renderListOrder = (data) => {
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
      <>
        <section className={styles["burger-constructor"]}>
          <ul className={styles["burger-constructor__list"]}>
            <li
              key={ingr[0]._id}
              className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={ingr[0].name}
                price={ingr[0].price}
                thumbnail={ingr[0].image}
              />
            </li>
            {renderListOrder(ingr)}
            <li
              key={ingr[1]._id}
              className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={ingr[1].name}
                price={ingr[1].price}
                thumbnail={ingr[1].image}
              />
            </li>
          </ul>
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
            <OrderDetails numOrder={"000001"} closeModal={toggleModal} />
          )}
        </section>
      </>
    );
  }
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingr: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};
