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
      if (element.type !== "bun"){
      return (      
        <li key={element._id} className={styles["burger-constructor__point"]}>
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
          />
        </li>
      )}
    });
  }
  totalPrice(data) {

const sum = data.reduce((sum, element)=>sum+element.price,0)
this.setState({total: sum })
  }

  render() {
     this.totalPrice(this.props.data)
    return (
      <section className={styles["burger-constructor"]}>
        <ul className={styles["burger-constructor__list"]}>
          <li key={this.props.data[0]._id} className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`} >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.props.data[0].name}
              price={this.props.data[0].price}
              thumbnail={this.props.data[0].image}
            />
          </li>
          {this.renderListOrder(this.props.data)}
          <li key={this.props.data[14]._id} className={`${styles["burger-constructor__point"]} ${styles["burger-constructor__point_type_lock"]}`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.props.data[14].name}
              price={this.props.data[14].price}
              thumbnail={this.props.data[14].image}
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
