import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../ingredient/ingredient.module.css";
import priceSym from "../../image/Subtract.svg";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingr, toggleModal, counter }) => {
  const { _id } = ingr;

  const [, ref, refImg] = useDrag({
    type: "ingred",
    item: { _id },
  });

  return (
    <li
      ref={ref}
      id={ingr._id}
      onClick={toggleModal}
      className={styles["section-burger-menu__card"]}
    >
      <img
        ref={refImg}
        src={ingr.image}
        className={styles["section-burger-menu__image"]}
      />
      <p className="text text_type_digits-default">
        {ingr.price}
        <img className="pl-2" src={priceSym} />
      </p>
      <p className="text text_type_main-small mt-2">{ingr.name}</p>
      {counter > 0 && (
        <Counter count={counter} size="default" extraClass="m-1" />
      )}
    </li>
  );
};

export default Ingredient;
