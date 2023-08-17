import styles from "./order-view.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/types/hooks-types";
import { Link } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_CONNECTION_START_FEED,
  WS_CONNECTION_CLOSED_FEED,
} from "../../services/actions/feeds";
import {
  WS_USER_ORDER_CONNECTION_CLOSED,
  WS_USER_ORDER_CONNECTION_START,
} from "../../services/actions/userOrder";

import { getIngredients } from "../../services/actions/burger-ingredients";
import { getCookie } from "../../utils/utils";
import OrderFeeds from "../order-feeds/order-feeds";
import Modal from "../modal/modal";
import { TOrders, TIngredients } from "../../services/types/types";
import { v4 as uuidv4 } from "uuid";
type TIngredientsNoDuplicates = {
  ingredient: TIngredients | undefined;
  num: number;
};

const OrderView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { feeds, ingredients, profileOrders } = useSelector((store) => ({
    feeds: store.feeds,
    ingredients: store.ingredients.ingredients,
    profileOrders: store.userOrders,
  }));
  const [order, setOrder] = useState<TOrders>();
  const [page, setPage] = useState<string>();
  const [total, setTotal] = useState<number>();
  const [ingredientsOrder, setIngredientsOrder] =
    useState<TIngredientsNoDuplicates[]>();

  useEffect(() => {
    const accessToken = getCookie("token");

    if (location.pathname.split("/")[1] === "feed") {
      setPage("feed");
    }
    if (location.pathname.split("/")[1] === "profile") {
      setPage("profile");
    }

    switch (page) {
      case "feed": {
        !feeds.wsConnected &&
          !feeds.wsOpen &&
          dispatch({
            type: WS_CONNECTION_START_FEED,
            url: "wss://norma.nomoreparties.space/orders/all",
          });
        break;
      }
      case "profile": {
        !profileOrders.wsConnected &&
          !profileOrders.wsOpen &&
          dispatch({
            type: WS_USER_ORDER_CONNECTION_START,
            url: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
          });
        break;
      }
    }
    return () => {
      if (page === "feed") {
        dispatch({ type: WS_CONNECTION_CLOSED_FEED });
      }

      if (page === "profile") {
        dispatch({ type: WS_USER_ORDER_CONNECTION_CLOSED });
      }
    };
  }, [page]);

  useEffect(() => {
    if (ingredients && ingredients!.length == 0) {
      dispatch(getIngredients());
    }
    document.addEventListener("keydown", pageReturn);
    return () => {
      document.removeEventListener("keydown", pageReturn);
    };
  }, []);

  useEffect(() => {
    if (ingredients && ingredients!.length > 0) {
      const id =
        page === "feed"
          ? location.pathname.split("/")[2]
          : location.pathname.split("/")[3];

      if (
        feeds.orders! &&
        feeds.orders!.length > 0 &&
        profileOrders.orders.length == 0
      ) {
        setOrder(feeds.orders!.find((el: TOrders) => el._id === id));

        order && createListIngredientsOrder(order);
      }
      if (
        feeds.orders! &&
        feeds.orders!.length == 0 &&
        profileOrders.orders.length > 0
      ) {
        setOrder(profileOrders.orders.find((el: TOrders) => el._id === id));

        order && createListIngredientsOrder(order);
      }
    }
  }, [page, order]);

  const pageReturn = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      navigate(-1);
    }
  };

  const renderStatusOrder = (status: string) => {
    switch (status) {
      case "done": {
        return (
          <p
            className={`text text_type_main-default ${styles["order-view__status_type_done"]}`}
          >
            Выполнен
          </p>
        );
        break;
      }
      case "created": {
        return (
          <p
            className={`text text_type_main-default ${styles["order-view__status_type_no-done"]}`}
          >
            Создан
          </p>
        );
        break;
      }
      case "pending": {
        return (
          <p
            className={`text text_type_main-default ${styles["order-view__status_type_no-done"]}`}
          >
            Готовится
          </p>
        );
        break;
      }
      default: {
        return (
          <p
            className={`text text_type_main-default ${styles["order-view__status_type_no-done"]}`}
          >
            Не определен
          </p>
        );
        break;
      }
    }
  };

  const createListIngredientsOrder = (order: TOrders) => {
    console.log("!!!!");
    const arrayOrderIngredients = order.ingredients.map((el) => {
      const numbIngredients = order.ingredients.filter(
        (item) => item === el
      ).length;

      return {
        ingredient: ingredients!.find((item) => item._id === el),
        num: numbIngredients,
      };
    });
    let arrayOrderIngredientsNoDuplicates: TIngredientsNoDuplicates[] = [];

    for (let i = 0; i < arrayOrderIngredients.length; i++) {
      for (let y = 0; y < arrayOrderIngredients.length; y++) {
        if (
          arrayOrderIngredients[i].ingredient!._id ===
            arrayOrderIngredients[y].ingredient!._id &&
          y === i &&
          !arrayOrderIngredientsNoDuplicates.find(
            (el) =>
              el.ingredient!._id === arrayOrderIngredients[y].ingredient!._id
          )
        ) {
          arrayOrderIngredientsNoDuplicates.push(arrayOrderIngredients[i]);
        }
      }
    }

    const total = arrayOrderIngredientsNoDuplicates.reduce(
      (sum, el) => sum + el.ingredient!.price * el.num,
      0
    );
    console.log(arrayOrderIngredientsNoDuplicates);
    setIngredientsOrder(arrayOrderIngredientsNoDuplicates);
    setTotal(total);
  };

  const renderIngredients = (ingredients: TIngredientsNoDuplicates[]) => {
    console.log(ingredients);
    return ingredients.map((el) => {
      return (
        <Link
          className={styles["order-view__ingredient-block"]}
          to={`/ingredients/${el.ingredient!._id}`}
          state={{ background: location }}
          key={uuidv4()}
        >
          <div className={styles["order-view__image-border"]}>
            <img
              className={styles["order-view__image-ingredient"]}
              src={el.ingredient!.image}
            />
          </div>
          <h2
            className={`text text_type_main-default ${styles["order-view__nameIngredient"]}`}
          >
            {el.ingredient!.name}
          </h2>
          <p
            className={`text text_type_main-medium ${styles["order-view__price"]}`}
          >
            {`${el.num} x ${el.ingredient!.price} `}
            <CurrencyIcon type="primary" />
          </p>
        </Link>
      );
    });
  };

  return (
    (order && ingredientsOrder && (
      <div className={`${styles["order-view"]}`}>
        <div className={`${styles["order-view__section"]}`}>
          <h2
            className={`text text_type_digits-default ${styles["order-view__number"]}`}
          >{`#${order.number}`}</h2>
          <h3 className="text text_type_main-medium">{order.name}</h3>
          {renderStatusOrder(order.status)}
          <section>
            <h3 className="text text_type_main-medium">
              Состав:
              <section className={`${styles["order-view__ingredients-block"]}`}>
                {renderIngredients(ingredientsOrder)}
              </section>
            </h3>
          </section>
          <section className={`${styles["order-view__footer"]}`}>
            <FormattedDate
              className={` text text_type_main-default text_color_inactive`}
              date={new Date(order.createdAt)}
            />
            <p className="text text_type_main-medium">
              {`${total} `} <CurrencyIcon type="primary" />
            </p>
          </section>
        </div>
      </div>
    )) || <></>
  );
};

export default OrderView;
