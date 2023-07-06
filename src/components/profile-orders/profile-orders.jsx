import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START_FEED } from "../../services/actions/feeds";
import { getCookie } from "../../utils/utils";
import OrderFeeds from "../order-feeds/order-feeds";
import { getIngredients } from "../../services/actions/burger-ingredients";
import styles from "./profile-orders.module.css";
import { WS_USER_ORDER_CONNECTION_START } from "../../services/actions/userOrder";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.userOrders);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    const accessToken = getCookie("token");

    dispatch({
      type: WS_USER_ORDER_CONNECTION_START,
      url: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
    });
  }, []);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  const renderOrderFeeds = (orders, ingredients) => {
    return orders
      .map((element) => {
        return (
          <OrderFeeds
            statusFlag={true}
            order={element}
            ingredients={ingredients}
          />
        );
      })
      .reverse();
  };
  return (
    orders.orders &&
    ingredients && (
      <div className={styles["profile-orders"]}>
        {renderOrderFeeds(orders.orders, ingredients)}
      </div>
    )
  );
};

export default ProfileOrders;
