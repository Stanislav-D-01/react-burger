import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__menu}>
          <li className={styles.header__listItem}>
            <BurgerIcon type="primary" />
            <p className={`text text_type_main-default ${styles.header__text}`}>
              Конструктор
            </p>
          </li>
          <li className={styles.header__listItem}>
            <ListIcon type="secondary" />
            <p className={`text text_type_main-default ${styles.header__text}`}>
              Лента заказов
            </p>
          </li>
          <li
            className={`${styles.header__listItem} ${styles.header__listItem_logo}`}
          >
            <Logo className={styles.header__logo} />
          </li>
          <li className={styles.header__listItem}>
            <ProfileIcon type="secondary" />
            <p className={`text text_type_main-default ${styles.header__text}`}>
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
