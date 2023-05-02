import styles from "./burger-constructor-element.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVE_INGR_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { v4 as uuidv4 } from "uuid";
const BurgerConstructorElement = ({ data, id, deleteIngr, type, isLocked }) => {
  const [, dragRef] = useDrag({
    type: "element-ingr",
    item: { id },
  });

  const ingrConstr = useSelector(
    (store) => store.burgerConstructor.ingredientsConstructor
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data.uuid);
  }, [data]);

  const [, dropRef] = useDrop({
    accept: "element-ingr",
    drop(id) {
      if (id.id != ref.current.id) {
        dispatch({
          type: MOVE_INGR_CONSTRUCTOR,
          indexDrop: ref.current.id,
          valueDrag: ingrConstr.find((item, index) => index == id.id),
          indexDrag: id.id,
          valueDrop: ingrConstr.find((item, index) => index == ref.current.id),
        });
      }
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
      <li id={id} key={data.uuid} className={className}>
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
      <li ref={ref} id={id} key={data.uuid} className={className}>
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
