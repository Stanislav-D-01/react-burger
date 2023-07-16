import styles from "./profile-menu.module.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/actions/authorization";
import { useDispatch } from "react-redux";

import { deleteCookie, getCookie } from "../../utils/utils";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const logoutProfile = () => {
    dispatch(logout());
    deleteCookie("token");
    deleteCookie("refreshToken");
  };

  return (
    <>
      <div className={styles["profile-page"]}>
        <menu className={styles["profile-page__menu"]}>
          <ul className={styles["profile-page__ul"]}>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]}`}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? styles["profile-page__link_active"]
                    : styles["profile-page__link"]
                }
                to="/profile"
                end
              >
                Профиль
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? styles["profile-page__link_active"]
                    : styles["profile-page__link"]
                }
                to="/profile/orders"
              >
                История заказов
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
            >
              <NavLink className={styles["profile-page__link"]} to="/profile/">
                <div onClick={logoutProfile}>Выход</div>
              </NavLink>
            </li>
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </ul>
        </menu>
      </div>
    </>
  );
};
export default ProfileMenu;
