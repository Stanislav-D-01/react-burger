import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./profile.module.css";

import { useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { logout } from "../../services/actions/authorization";
import { deleteCookie, getCookie } from "../../utils/utils";
import { saveNewProfile } from "../../services/actions/authorization";
const Profile = () => {
  const nameUser = useSelector((state) => state.auth.name);
  const emailUser = useSelector((state) => state.auth.email);
  const request = useSelector((state) => state.auth.request);
  const [name, setName] = useState(nameUser);
  const [email, setEmail] = useState(emailUser);
  const [pass, setPass] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.addEventListener("focusout", (e) => {
      e.target.disabled = true;
      inputRef.current.style.cursor = "not-allowed";
      inputRef.current.style.color = "#8585AD";
    });
    navigate("", { state: { path: "/", url: "profile", title: "profile" } });
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    deleteCookie("token");
    deleteCookie("refreshToken");
  };
  const undoInput = () => {
    setName(nameUser);
    setEmail(emailUser);
  };

  const saveProfile = (name, email, pass) => {
    if (name !== nameUser || email !== emailUser || pass.length > 0) {
      dispatch(saveNewProfile(name, email, pass));
    }
  };
  if (!request) {
    return (
      <>
        <div className={styles["profile-page"]}>
          <menu className={styles["profile-page__menu"]}>
            <ul className={styles["profile-page__ul"]}>
              <li
                className={`text text_type_main-medium ${styles["profile-page__li"]}`}
              >
                <Link
                  className={styles["profile-page__link_active"]}
                  to="/profile"
                >
                  Профиль
                </Link>
              </li>
              <li
                className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
              >
                <Link className={styles["profile-page__link"]} to="/profile/">
                  История заказов
                </Link>
              </li>
              <li
                className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
              >
                <Link className={styles["profile-page__link"]} to="/profile/">
                  <div onClick={logout}>Выход</div>
                </Link>
              </li>
              <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </ul>
          </menu>
          <form>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setName(e.target.value)}
              disabled={true}
              value={name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              icon={"EditIcon"}
              extraClass="mt-6"
              ref={inputRef}
              onIconClick={(e) => {
                inputRef.current.disabled = false;
                inputRef.current.style.cursor = "text";
                inputRef.current.style.color = "white";
                setTimeout(() => inputRef.current.focus(), 0);
              }}
            />
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              name={"email"}
              value={email}
              placeholder={"E-mail"}
              extraClass="mt-6"
              isIcon={true}
            />
            <PasswordInput
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              name={"password"}
              placeholder={"Изменить пароль"}
              icon="EditIcon"
              extraClass="mt-6"
            />
            <Button
              extraClass="mt-6 mr-6"
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => saveProfile(name, email, pass)}
            >
              Сохранить
            </Button>
            <Button
              extraClass={`mt-6 ${styles["profile-page__button"]}`}
              htmlType="button"
              type="primary"
              size="medium"
              onClick={undoInput}
            >
              Отмена
            </Button>
          </form>
        </div>
      </>
    );
  }
};

export default Profile;
