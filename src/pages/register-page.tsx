import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./login-page.module.css";
import { authorizationReducer } from "../services/reducers/authorization";
import { sendRegitration } from "../services/actions/authorization";
import { useDispatch, useSelector } from "../services/types/hooks-types";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameUser = useSelector((store) => store.auth.name);

  const registrUser = (name: string, email: string, pass: string): void => {
    if (name && email && pass) {
      dispatch(sendRegitration(email, pass, name));
    }
  };

  return (
    <div className={styles["login-page"]}>
      <form
        onSubmit={() => registrUser(name, email, pass)}
        className={styles["login-page__form"]}
      >
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
          htmlType="submit"
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
