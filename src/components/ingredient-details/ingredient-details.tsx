import styles from "./ingredient-details.module.css";
import { useSelector } from "../../services/types/hooks-types";

const IngredientsDetails = () => {
  const data = useSelector((store) => store.modal.ingredient);

  if (data) {
    return (
      <div className={styles["ingredient-details"]}>
        <img
          src={data!.image_large}
          className={styles["ingredient-details__image"]}
        />
        <h2 className="text text_type_main-medium mt-4 mb-8">{data!.name}</h2>
        <section className={styles["ingredient-details__section-info"]}>
          <div className={styles["ingredient-details__block-info"]}>
            <p className="text text_type_main-small text_color_inactive">
              Калорий, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data!.calories}
            </p>
          </div>
          <div className={styles["ingredient-details__block-info"]}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data!.proteins}
            </p>
          </div>
          <div className={styles["ingredient-details__block-info"]}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data!.fat}
            </p>
          </div>
          <div className={styles["ingredient-details__block-info"]}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data!.carbohydrates}
            </p>
          </div>
        </section>
      </div>
    );
  } else return <></>;
};

export default IngredientsDetails;
