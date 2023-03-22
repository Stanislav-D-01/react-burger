import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import priceSym from "../../image/Subtract_constructor.svg";
import React from "react";

class BurgerConstructor extends React.Component {
  state = {
    total: 0,
  };

  renderListOrder(data) {
    return data.map((element) => {
      return (
        <li>
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
          />
        </li>
      );
    });
  }
  totalPrice(data) {}

  render() {
    return (
      <section>
        <ul className={styles["burger-constructor__list"]}>
          <li className={styles["burger-constructor__list_type_lock"]}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.props.data[0].name}
              price={this.props.data[0].price}
              thumbnail={this.props.data[0].image}
            />
          </li>
          {this.renderListOrder(this.props.data)}
          <li className={styles["burger-constructor__list_type_lock"]}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.props.data[0].name}
              price={this.props.data[0].price}
              thumbnail={this.props.data[0].image}
            />
          </li>
        </ul>
        <div>
          <p className="text text_type_digits-medium">
            {this.state.total} <img className="pl-2" src={priceSym} />
          </p>
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
