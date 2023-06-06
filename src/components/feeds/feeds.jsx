import OrderFeeds from "../order-feeds/order-feeds";
import OrderTable from "../order-table/order-table";
import styles from "./feeds.module.css";

const Feeds = () => {
  return (
    <div className={styles.feeds}>
      <h2 className={`${styles.feeds__text} text text_type_main-large mt-10`}>
        Лента заказов
      </h2>
      <section className={styles.feeds__sections}>
        <OrderFeeds />
        <OrderTable />
      </section>
    </div>
  );
};

export default Feeds;
