import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./order-feeds.module.css";
import priceSym from "../../image/Subtract.svg";

const OrderFeeds = () => {
  const { ingredients, orderIngredients } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    orderIngredients: store.order.ingredients,
  }));
  let price = 0;

  const ingredientsСircle = (orderIngredients, ingredients) => {
    if (orderIngredients.length > 0) {
      let numСircle = 0;

      let imageIngredients = orderIngredients.map((elem) => {
        numСircle = numСircle + 1;
        const ingredient = ingredients.find((el) => el._id === elem);
        price = price + ingredient.price;

        if (numСircle <= 6 && numСircle !== 1) {
          return (
            <div
              className={`${styles["image-border"]} `}
              style={{ zIndex: 6 - numСircle }}
            >
              <img className={styles.image} src={ingredient.image} />
            </div>
          );
        }
        if (numСircle === 7) {
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
    <div>
      <section className={styles["order-feeds"]}>
        <h1
          className={`{styles["order-feeds__orderNum"]} text text_type_digits-default`}
        >
          #213123
        </h1>
        <FormattedDate
          className={`${styles["order-feeds__date"]} text text_type_main-default text_color_inactive`}
          date={new Date("Sun Jun 03 2023 17:07:11 GMT+0400 (GMT+04:00)")}
        />
        <h2
          className={`${styles["order-feeds__name"]} text text_type_main-medium`}
        >
          Burger Name
        </h2>
        <section className={styles["ingredients-circle"]}>
          {ingredientsСircle(orderIngredients, ingredients)}
        </section>
        <p
          className={`${styles["order-feeds__price"]} text text_type_digits-default mt-4`}
        >
          {price} <img src={priceSym} />
        </p>
      </section>
    </div>
  );
};

export default OrderFeeds;
