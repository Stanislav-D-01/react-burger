import { useEffect } from "react";
import styles from "./order-table.module.css";

const OrderTable = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);

  const getListOrder = (orders, status) => {
    const doneOrders = orders.filter((el)=>el.status==='done');
    const 
    
    
    orders.map((el) => {
      if (el.status === "done" && status === "done") {
        return (
          <li
            className={`${styles["order-table__order-num"]} text text_type_digits-default mb-2`}
          >
            {el.number}
          </li>
        );
      }
    });
    if (status === "done"){
      return doneOrders
    }
  };

  return (
    <div className={styles["order-table"]}>
      <section className={styles["order-table__status-blocks"]}>
        <div className={styles["order-table__status-block"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul>{getListOrder(data.orders, "done")}</ul>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <p className="text text_type_digits-default mb-2">123123123</p>
        </div>
      </section>
      <section className={`${styles["order-table__order-statistics"]}`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p
          className={`${styles["order-table__number"]} text text_type_digits-large`}
        >
          {data.total}
        </p>
      </section>
      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p
          className={`${styles["order-table__number"]} text text_type_digits-large`}
        >
          {data.totalTd}
        </p>
      </section>
    </div>
  );
};

export default OrderTable;
