import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import priceSym from "../../image/Subtract_constructor.svg";
import React from "react";
import PropTypes from "prop-types";

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

class BurgerConstructor extends React.Component {
  state = {
    total: 0,
  };

  renderListOrder(data) {
    return data.map((element) => {
      if (element.type !== "bun") {
        return (
          <li key={element._id} className={styles["burger-constructor__point"]}>
            <ConstructorElement
              text={element.name}
              price={element.price}
              thumbnail={element.image}
            />
          </li>
        );
      }
    });
  }
  totalPrice(data) {
    const sum = data.reduce((sum, element) => sum + element.price, 0);
    this.setState({ total: sum });
  }
  componentDidMount() {
    this.totalPrice(this.props.data);
  }

  render() {
    return (
      <section className={styles["burger-constructor"]}>
        <ul className={styles["burger-constructor__list"]}>
          <li
            key={this.props.data[0]._id}
            className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.props.data[0].name}
              price={this.props.data[0].price}
              thumbnail={this.props.data[0].image}
            />
          </li>
          {this.renderListOrder(this.props.data)}
          <li
            key={this.props.data[this.props.data.length - 1]._id}
            className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.props.data[this.props.data.length - 1].name}
              price={this.props.data[this.props.data.length - 1].price}
              thumbnail={this.props.data[this.props.data.length - 1].image}
            />
          </li>
        </ul>
        <div className={styles["burger-constructor__total-price-block"]}>
          <p className="text text_type_digits-medium mr-10">
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes)),
};
