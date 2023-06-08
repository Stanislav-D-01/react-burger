import OrderFeeds from "../order-feeds/order-feeds";
import OrderTable from "../order-table/order-table";
import styles from "./feeds.module.css";
import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/feeds";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Feeds = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feeds.orders);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, []);

  const renderOrderFeeds = (orders) => {
    return orders.map((element) => {
      return <OrderFeeds orderIngredients={element.ingredients} />;
    });
  };

  return (
    <div className={styles.feeds}>
      <h2 className={`${styles.feeds__text} text text_type_main-large mt-10`}>
        Лента заказов
      </h2>
      <section className={styles.feeds__sections}>
        <div className={styles.feeds__feeds}>{renderOrderFeeds(orders)}</div>
        <OrderTable />
      </section>
    </div>
  );
};

export default Feeds;
