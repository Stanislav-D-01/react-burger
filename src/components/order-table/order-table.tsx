import { useEffect } from "react";
import styles from "./order-table.module.css";
import { TOrders } from "../../services/types/types";

type TOrderTableProps = {
  data: {
    error: string;
    orders: TOrders[] | undefined;
    total: number;
    totalTd: number;
    wsConnected?: boolean | undefined;
    wsOpen?: boolean | undefined;
  };
};

const OrderTable = ({ data }: TOrderTableProps) => {
  const getListOrders = (orders: TOrders[], status: string) => {
    if (status === "done") {
      const doneOrders = orders.filter((el) => el.status === "done");

      return doneOrders.map((el, index) => {
        return (
          <li
            key={index}
            className={`${styles["order-table__order-num"]} text text_type_digits-default mb-2`}
          >
            {el.number}
          </li>
        );
      });
    }
    if (status !== "done") {
      const workOrders = orders.filter((el) => el.status !== "done");

      return workOrders.map((el) => {
        return (
          <li className={` text text_type_digits-default mb-2`}>{el.number}</li>
        );
      });
    }
  };

  return (
    <div className={styles["order-table"]}>
      <section className={styles["order-table__status-blocks"]}>
        <div className={styles["order-table__status-block"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles["order-table__ul"]}>
            {getListOrders(data.orders!, "done")}
          </ul>
        </div>
        <div className={styles["order-table__status-block"]}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles["order-table__ul"]}>
            {getListOrders(data.orders!, "work")}
          </ul>
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
