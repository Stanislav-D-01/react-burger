import styles from "./burger-constructor-element.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const BurgerConstructorElement = ({ data, id, deleteIngr, type, isLocked }) => {
  const [, dragRef] = useDrag({
    type: "element-ingr",
    item: { id },
  });

  const [, dropRef] = useDrop({
    accept: "element-ingr",
    hover(item) {
      console.log(ref.current.id);
    },
  });
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const className =
    type === "top"
      ? `${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_top"]}`
      : type === "bottom"
      ? `${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_bottom"]} `
      : `${styles["burger-constructor__point"]}`;
  if (type) {
    return (
      <li id={id} key={id} className={className}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={deleteIngr}
        />
      </li>
    );
  } else {
    return (
      <li ref={ref} id={id} key={id} className={className}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={deleteIngr}
        />
      </li>
    );
  }
};

export default BurgerConstructorElement;
