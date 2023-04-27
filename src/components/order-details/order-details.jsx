import styles from "./order-details.module.css";
import done from "../../image/done.svg";
import React, { useContext } from "react";
import { ConstructorOrderContext } from "../burger-constructor/burger-constructor-context";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
  const order = useSelector(store=>store.state.order);
  return (
    <section className={styles["order-details"]}>
      <h2 className="text text_type_digits-large mt-4">{order.number}</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className={styles["order-details__image"]} src={done} />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

export default OrderDetails;
