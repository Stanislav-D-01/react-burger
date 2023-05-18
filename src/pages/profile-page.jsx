import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  const [name, setName] = useState(useSelector((state) => state.auth.name));
  const [email, setEmail] = useState(useSelector((state) => state.auth.email));
  const [pass, setPass] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.addEventListener("focusout", (e) => {
      e.target.disabled = true;
      inputRef.current.style.cursor = "not-allowed";
      inputRef.current.style.color = "#8585AD";
    });
  }, []);

  return (
    <>
      <div className={styles["profile-page"]}>
        <menu className={styles["profile-page__menu"]}>
          <ul className={styles["profile-page__ul"]}>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]}`}
            >
              Профиль
            </li>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
            >
              История заказов
            </li>
            <li
              className={`text text_type_main-medium ${styles["profile-page__li"]} text_color_inactive`}
            >
              Выход
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
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
