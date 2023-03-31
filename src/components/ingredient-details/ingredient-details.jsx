import styles from "./ingredient-details.module.css";


const IngredientsDetails = (props) => {
  return (
    <div onClick={(e)=>e.stopPropagation()} className={styles["ingredient-details"]}>
    <img src={props.data.image} className={styles['ingredient-details__image']}/>
    <h2 className="text text_type_main-medium mt-4 mb-8">{props.data.name}</h2>
    <section className={styles["ingredient-details__section-info"]}>
      <div className={styles["ingredient-details__block-info"]}>
      <p className="text text_type_main-small text_color_inactive">Калорий, ккал</p>
      <p className="text text_type_digits-default text_color_inactive">{props.data.calories}</p>
      </div>
      <div className={styles["ingredient-details__block-info"]}>
      <p className="text text_type_main-small text_color_inactive">Белки, г</p>
      <p className="text text_type_digits-default text_color_inactive">{props.data.proteins}</p>
      </div>
      <div className={styles["ingredient-details__block-info"]}>
      <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
      <p className="text text_type_digits-default text_color_inactive">{props.data.fat}</p>
      </div>
      <div className={styles["ingredient-details__block-info"]}>
      <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
      <p className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</p>
      </div>
    </section>
    </div>
  );
};

export default IngredientsDetails;
