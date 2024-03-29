import OrderFeeds from "../order-feeds/order-feeds";
import OrderTable from "../order-table/order-table";
import styles from "./feed.module.css";
import { useEffect } from "react";
import {
  WS_CONNECTION_START_FEED,
  WS_CONNECTION_CLOSED_FEED,
} from "../../services/actions/feeds";
import { useSelector, useDispatch } from "../../services/types/hooks-types";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useLocation } from "react-router-dom";
import { TOrders, TIngredients } from "../../services/types/types";
import { v4 as uuidv4 } from "uuid";
const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feeds);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();

  useEffect(() => {
    if (feeds.wsOpen == false) {
      dispatch({
        type: WS_CONNECTION_START_FEED,
        url: "wss://norma.nomoreparties.space/orders/all",
      });
    }
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_FEED });
    };
  }, []);

  const renderOrderFeeds = (
    orders: TOrders[],
    ingredients: TIngredients[] | undefined
  ) => {
    return orders.map((element, index) => {
      return (
        <OrderFeeds
          key={uuidv4()}
          statusFlag={false}
          order={element}
          ingredients={ingredients}
        />
      );
    });
  };

  return (
    (feeds.orders && feeds.orders!.length > 0 && (
      <div className={styles.feeds}>
        <h2 className={`${styles.feeds__text} text text_type_main-large mt-10`}>
          Лента заказов
        </h2>
        <section key={uuidv4()} className={styles.feeds__sections}>
          <div key={uuidv4()} className={styles.feeds__feeds}>
            {renderOrderFeeds(feeds.orders, ingredients)}
          </div>
          <OrderTable data={feeds} />
        </section>
      </div>
    )) || <></>
  );
};

export default Feed;
