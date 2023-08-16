import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { useEffect } from "react";
import { WS_CONNECTION_START_FEED } from "../../services/actions/feeds";
import { getCookie } from "../../utils/utils";
import OrderFeeds from "../order-feeds/order-feeds";
import { getIngredients } from "../../services/actions/burger-ingredients";
import styles from "./profile-orders.module.css";
import {
  WS_USER_ORDER_CONNECTION_START,
  WS_USER_ORDER_CONNECTION_CLOSED,
} from "../../services/actions/userOrder";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredients, TOrders } from "../../services/types/types";
const ProfileOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const orders = useSelector((store) => store.userOrders);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    const accessToken = getCookie("token");

    dispatch({
      type: WS_USER_ORDER_CONNECTION_START,
      url: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_USER_ORDER_CONNECTION_CLOSED });
    };
  }, []);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  const renderOrderFeeds = (orders: TOrders[], ingredients: TIngredients[]) => {
    return orders
      .map((element, index) => {
        return (
          <OrderFeeds
            key={index}
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
