import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login-page.module.css";
const LoginPage = () => {
  const [value, setValue] = useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles["login-page"]}>
      <form className={styles["login-page__form"]}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={value}
          name={"password"}
          extraClass="mt-6"
        />
        <Button
          extraClass="mt-6 mb-20"
          htmlType="button"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link className={styles["login-page__link"]} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?{" "}
          <Link className={styles["login-page__link"]} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
