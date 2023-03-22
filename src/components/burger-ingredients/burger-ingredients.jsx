import {
  Tab,
  ConstructorElement,Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import priceSym from "../../image/Subtract.svg";
import React from "react";

class BurgerIngredients extends React.Component{
state = {
current:'one'
}


loadingridients=(data,type)=>{
return data.map((element)=>{
if (element.type === type) {
 return (<li className={styles['section-burger-menu__card']}>
            <img src={element.image} />
            <p className="text text_type_digits-default">
              {element.price}
              <img className="pl-2" src={priceSym} />
            </p>
            <p className="text text_type_main-small mt-2">{element.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
          </li>)
}})};




render(){
  return (
    <section className={styles["section-burger-menu"]}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={this.state.current === "one"} onClick={"one"}>
          Булки
        </Tab>
        <Tab value="two" active={this.state.current === "two"} onClick={"one"}>
          Соусы
        </Tab>
        <Tab value="three" active={this.state.current === "three"} onClick={"one"}>
          Начинки
        </Tab>
      </div>

      <div className={styles["section-burger-menu__ingridients"]}>
        <h3  className="text text_type_main-medium mt-10">Булки</h3>
        <ul className={styles["section-burger-menu__ingridients-list"]}>
        {this.loadingridients(this.props.data, "bun")}
        </ul>
     

      
        <h3 className="text text_type_main-medium mt-10">Соусы</h3>
        <ul className={styles["section-burger-menu__ingridients-list"]}>
       {this.loadingridients(this.props.data, "sauce")}
        </ul>
    

      
        <h3 className="text text_type_main-medium mt-10">Начинки</h3>
        <ul className={styles["section-burger-menu__ingridients-list"]}>
         {this.loadingridients(this.props.data, "main")}
        </ul>
      </div>
    </section>
  )
  }}

export default BurgerIngredients;
