import styles from "./ingredient-details.module.css";
import closeIco from "../../image/Close.svg";

const IngredientsDetails = () => {
  return (
    <div className={styles["ingredient-details"]}>
      <h2>Детали ингредиента</h2>
      <img src={closeIco} alt={"Закрыть"} />
    </div>
  );
};

export default IngredientsDetails;
