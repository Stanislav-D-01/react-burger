import styles from "./order-table.module.css";

const OrderTable = () => {
  return (
    <div className={styles["order-table"]}>
      <section className={styles["order-table__status-blocks"]}>
        <div className={styles["order-table__status-block"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <p
            className={`${styles["order-table__order-num"]} text text_type_digits-default mb-2`}
          >
            123123123
          </p>
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
          123323
        </p>
      </section>
      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p
          className={`${styles["order-table__number"]} text text_type_digits-large`}
        >
          1231
        </p>
      </section>
    </div>
  );
};

export default OrderTable;
