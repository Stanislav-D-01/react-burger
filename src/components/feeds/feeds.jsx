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
import { getIngredients } from "../../services/actions/burger-ingredients";

const Feeds = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feeds);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

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
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  const renderOrderFeeds = (orders, ingredients) => {
    return orders.map((element) => {
      return <OrderFeeds order={element} ingredients={ingredients} />;
    });
  };

  return (
    <div className={styles.feeds}>
      <h2 className={`${styles.feeds__text} text text_type_main-large mt-10`}>
        Лента заказов
      </h2>
      <section className={styles.feeds__sections}>
        <div className={styles.feeds__feeds}>
          {renderOrderFeeds(feeds.orders, ingredients)}
        </div>
        <OrderTable data={feeds} />
      </section>
    </div>
  );
};

export default Feeds;
