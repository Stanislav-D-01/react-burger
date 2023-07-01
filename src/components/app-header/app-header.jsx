import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AppHeader = () => {
  let location = useLocation();
  const [profileActive, setProfileActive] = useState(
    location.pathname === ("/profile" || "/history-order") ? true : false
  );

  useEffect(() => {
    if (
      location.pathname === "/profile" ||
      location.pathname === "/history-order"
    ) {
      setProfileActive(true);
    } else {
      setProfileActive(false);
    }
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__menu}>
          <li className={styles.header__listItem}>
            <BurgerIcon type="primary" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__text} ${styles.header__text_type_inactive} text text_type_main-default`
                  : `${styles.header__text} text text_type_main-default`
              }
            >
              Конструктор
            </NavLink>
          </li>
          <li className={styles.header__listItem}>
            <ListIcon type="secondary" />
            <NavLink
              to="/feeds"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__text} ${styles.header__text_type_inactive} text text_type_main-default`
                  : `${styles.header__text} text text_type_main-default`
              }
            >
              Лента заказов
            </NavLink>
          </li>
          <li
            className={`${styles.header__listItem} ${styles.header__listItem_logo}`}
          >
            <Logo />
          </li>
          <li className={styles.header__listItem}>
            <ProfileIcon type="secondary" />
            <NavLink
              to="/profile"
              className={
                profileActive
                  ? `${styles.header__text} ${styles.header__text_type_inactive} text text_type_main-default`
                  : `${styles.header__text} text text_type_main-default`
              }
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
