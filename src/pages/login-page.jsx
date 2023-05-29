import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./login-page.module.css";
import { authorization } from "../services/actions/authorization";
import { getCookie } from "../utils/utils";
import { checkAuthorization } from "../services/actions/check-autorization";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, resetPass, request } = useSelector((store) => ({
    email: store.auth.email,
    name: store.auth.name,
    resetPass: store.auth.resetPassword,
    request: store.auth.request,
  }));

  
  const logIn = (login, pass) => {
    dispatch(authorization(login, pass));
  };

  if (!email && !request) {
    return (
      <div className={styles["login-page"]}>
        <form
          onSubmit={() => logIn(login, pass)}
          className={styles["login-page__form"]}
        >
          <h2 className="text text_type_main-medium">Вход</h2>
          <EmailInput
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            name={"email"}
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
  }
  if (email && !request) {
    return <Navigate to="/" replace />;
  }
};

export default LoginPage;
