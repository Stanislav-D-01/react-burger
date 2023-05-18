import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__menu}>
          <li className={styles.header__listItem}>
            <BurgerIcon type="primary" />
            <Link
              to="/"
              className={` ${styles.header__text} ${styles.header__text_type_inactive} text text_type_main-default`}
            >
              Конструктор
            </Link>
          </li>
          <li className={styles.header__listItem}>
            <ListIcon type="secondary" />
            <a
              href={"#"}
              className={`text text_type_main-default ${styles.header__text} text_color_inactive`}
            >
              Лента заказов
            </a>
          </li>
          <li
            className={`${styles.header__listItem} ${styles.header__listItem_logo}`}
          >
            <Logo />
          </li>
          <li className={styles.header__listItem}>
            <ProfileIcon type="secondary" />
            <Link
              to="/profile"
              className={`text text_type_main-default text_color_inactive ${styles.header__text}`}
            >
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
