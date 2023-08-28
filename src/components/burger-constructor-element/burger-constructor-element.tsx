import styles from "./burger-constructor-element.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { MOVE_INGR_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { TIngredients } from "../../services/types/types";

interface IBurgerConstructorElementProps {
  data: TIngredients;
  id: string;
  deleteIngr?: () => void;
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
}
type TId = {
  id: string;
};

const BurgerConstructorElement: FC<IBurgerConstructorElementProps> = ({
  data,
  id,
  deleteIngr,
  type,
  isLocked,
}) => {
  const [, dragRef] = useDrag({
    type: "element-ingr",
    item: { id },
  });

  const ingrConstr = useSelector(
    (store) => store.burgerConstructor.ingredientsConstructor
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [, dropRef] = useDrop({
    accept: "element-ingr",
    drop(id: TId) {
      console.log(id);
      if (id.id != ref.current!.id) {
        dispatch({
          type: MOVE_INGR_CONSTRUCTOR,
          indexDrop: ref.current!.id,
          valueDrag: ingrConstr.find(
            (item, index) => index.toString() == id.id
          ),
          indexDrag: id.id,
          valueDrop: ingrConstr.find(
            (item, index) => index.toString() == ref.current!.id
          ),
        });
      }
    },
  });

  const dragDropRef = dragRef(dropRef(ref));
  const className =
    type === "top"
      ? `${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_top"]}`
      : type === "bottom"
      ? `${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]} ${styles["burger-constructor__point_position_bottom"]} `
      : `${styles["burger-constructor__point"]}`;
  if (type) {
    return (
      <li id={id} className={className}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={
            type == "top"
              ? `${data.name} (верх)`
              : type == "bottom"
              ? `${data.name} (низ)`
              : data.name
          }
          price={data.price}
          thumbnail={data.image}
          handleClose={deleteIngr}
        />
      </li>
    );
  } else {
    return (
      <li ref={ref} id={id} className={className}>
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
