import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login-page.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className={styles["login-page"]}>
      <form className={styles["login-page__form"]}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
          value={email}
          placeholder={"E-mail"}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          name={"password"}
          extraClass="mt-6"
        />
        <Button
          extraClass="mt-6 mb-20"
          htmlType="button"
          type="primary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегестрированы?{" "}
          <Link className={styles["login-page__link"]} to="/login">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
