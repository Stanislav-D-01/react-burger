import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./order-feeds.module.css";
import priceSym from "../../image/Subtract.svg";
import { useNavigate } from "react-router-dom";
import { PATH_FEED } from "../../utils/utils";

const OrderFeeds = ({ order, ingredients, statusFlag }) => {
  const navigate = useNavigate();
  const { orders } = useSelector((store) => ({
    orders: store.feeds.orders,
  }));
  const [total, setTotal] = useState(0);
  const [ingredientsOrder, setIngredientsOrder] = useState([]);
  useEffect(() => {
    order.ingredients.length > 0 && createListIngredientsOrder(order);
  }, [order]);

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
          arrayOrderIngredients[i].ingredient &&
          arrayOrderIngredients[y].ingredient
        ) {
          if (
            arrayOrderIngredients[i].ingredient._id ==
              arrayOrderIngredients[y].ingredient._id &&
            y == i &&
            !arrayOrderIngredientsNoDuplicates.find(
              (el) =>
                el.ingredient._id == arrayOrderIngredients[y].ingredient._id
            )
          ) {
            arrayOrderIngredientsNoDuplicates.push(arrayOrderIngredients[i]);
          }
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

  const renderIngredients = (orderIngredients, ingredients) => {
    if (orderIngredients.length > 0) {
      let numСircle = 0;

      let imageIngredients = orderIngredients.map((elem) => {
        numСircle = numСircle + 1;

        let ingredient = ingredients.find(
          (el) => el._id === elem.ingredient._id
        );

        if (numСircle <= 6 && ingredient) {
          return (
            <div
              className={`${styles["image-border"]} `}
              style={{ zIndex: 6 - numСircle }}
            >
              <img className={styles.image} src={ingredient.image} />
            </div>
          );
        }
        if (numСircle === 7 && ingredient) {
          const numOtherIngredient = orderIngredients.length - 5;
          numСircle = numСircle + 1;
          return (
            <>
              <div className={`${styles["image-border"]}`}>
                <img className={styles.image} src={ingredient.image} />
                <p
                  className={`${styles["image_text"]} text text_type_digits-default`}
                >{`+${numOtherIngredient}`}</p>
              </div>
            </>
          );
        }
      });
      return imageIngredients;
    }
  };
  return (
    ingredientsOrder.length > 0 && (
      <section
        onClick={() => navigate(`${PATH_FEED}/${order._id}`)}
        className={styles["order-feeds"]}
      >
        <h2
          className={`{styles["order-feeds__orderNum"]} text text_type_digits-default`}
        >
          {`#${order.number}`}
        </h2>

        <FormattedDate
          className={`${styles["order-feeds__date"]} text text_type_main-default text_color_inactive`}
          date={new Date(order.createdAt)}
        />
        <h2
          className={`${styles["order-feeds__name"]} text text_type_main-medium`}
        >
          {order.name}
          {statusFlag && renderStatusOrder(order.status)}
        </h2>

        <section className={styles["ingredients-circle"]}>
          {renderIngredients(ingredientsOrder, ingredients)}
        </section>
        <p
          className={`${styles["order-feeds__price"]} text text_type_digits-default mt-4`}
        >
          {total} <img src={priceSym} />
        </p>
      </section>
    )
  );
};

export default OrderFeeds;
