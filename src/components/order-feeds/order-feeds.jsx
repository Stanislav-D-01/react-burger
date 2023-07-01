import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./order-feeds.module.css";

const OrderFeeds = () => {
  const { ingredients, orderIngredients } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    orderIngredients: store.order.ingredients,
  }));
  let price = 0;

  const ingredientsСircle = (orderIngredients, ingredients) => {
    if (orderIngredients.length > 0) {
      let numRound = 0;

      let imageIngredients = orderIngredients.map((elem) => {
        numRound = numRound + 1;
        const ingredient = ingredients.find((el) => el._id === elem);
        price = price + ingredient.price;
        if (numRound <= 5) {
          return (
            <div className={styles["image-border"]}>
              <img className={styles.image} src={ingredient.image} />
            </div>
          );
        }
        if (numRound === 6) {
          const numOtherIngredient = orderIngredients.length - 5;
          numRound = numRound + 1;
          return (
            <div
              className={`&{styles["image-border"]} z-index=${0 - numRound}`}
            >
              <img className={styles.image} src={ingredient.image} />{" "}
              <p>{`+${numOtherIngredient}`}</p>
            </div>
          );
        }
      });

      return imageIngredients;
    }
  };
  return (
    <div>
      <section>
        <h1>#213123</h1>
        <FormattedDate
          date={new Date("Sun Jun 03 2023 17:07:11 GMT+0400 (GMT+04:00)")}
        />
        <h2>Burger Name</h2>
        <section className={styles["ingredients-circle"]}>
          {ingredientsСircle(orderIngredients, ingredients)}
        </section>
        <p>{price}</p>
      </section>
    </div>
  );
};

export default OrderFeeds;
