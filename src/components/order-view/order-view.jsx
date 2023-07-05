import styles from "./order-view.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_CONNECTION_START_FEED,
  WS_CONNECTION_CLOSED_FEED,
} from "../../services/actions/feeds";
import { getIngredients } from "../../services/actions/burger-ingredients";

const OrderView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feeds, ingredients } = useSelector((store) => ({
    feeds: store.feeds,
    ingredients: store.ingredients.ingredients,
  }));
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState([]);
  const [ingredientsOrder, setIngredientsOrder] = useState([]);

  useEffect(() => {
    !feeds.wsConnected &&
      dispatch({
        type: WS_CONNECTION_START_FEED,
        url: "wss://norma.nomoreparties.space/orders/all",
      });
  }, []);
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    console.log(feeds);
    if (feeds.orders.length > 0) {
      feeds && setOrder(feeds.orders.find((el) => el._id === id));

      order && createListIngredientsOrder(order);
    }
  }, [feeds, order]);

  const renderStatusOrder = (status) => {
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

  const createListIngredientsOrder = (order) => {
    const arrayOrderIngredients = order.ingredients.map((el) => {
      const numbIngredients = order.ingredients.filter(
        (item) => item === el
      ).length;

      return {
        ingredient: ingredients.find((item) => item._id === el),
        num: numbIngredients,
      };
    });
    let arrayOrderIngredientsNoDuplicates = [];
    for (let i = 0; i < arrayOrderIngredients.length; i++) {
      for (let y = 0; y < arrayOrderIngredients.length; y++) {
        if (
          arrayOrderIngredients[i].ingredient._id ===
            arrayOrderIngredients[y].ingredient._id &&
          y === i &&
          !arrayOrderIngredientsNoDuplicates.find(
            (el) =>
              el.ingredient._id === arrayOrderIngredients[y].ingredient._id
          )
        ) {
          arrayOrderIngredientsNoDuplicates.push(arrayOrderIngredients[i]);
        }
      }
    }
    const total = arrayOrderIngredientsNoDuplicates.reduce(
      (sum, el) => sum + el.ingredient.price * el.num,
      0
    );
    setIngredientsOrder(arrayOrderIngredientsNoDuplicates);
    setTotal(total);
  };

  const renderIngredients = (ingredients) => {
    return ingredients.map((el) => {
      return (
        <Link
          className={styles["order-view__ingredient-block"]}
          to={`/ingredients/${el.ingredient._id}`}
          state={{ background: location }}
        >
          <div className={styles["order-view__image-border"]}>
            <img
              className={styles["order-view__image-ingredient"]}
              src={el.ingredient.image}
            />
          </div>
          <h2
            className={`text text_type_main-default ${styles["order-view__nameIngredient"]}`}
          >
            {el.ingredient.name}
          </h2>
          <p
            className={`text text_type_main-medium ${styles["order-view__price"]}`}
          >
            {`${el.num} x ${el.ingredient.price} `}
            <CurrencyIcon type="primary" />
          </p>
        </Link>
      );
    });
  };

  return (
    ingredientsOrder &&
    total &&
    order && (
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
    )
  );
};

export default OrderView;
