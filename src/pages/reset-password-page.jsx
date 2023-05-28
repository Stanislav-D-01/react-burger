import styles from "./login-page.module.css";
import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/actions/authorization";
import { useNavigate } from "react-router-dom";
const ResetPasswordPage = () => {
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPassSuccess = useSelector((store) => store.auth.resetPassword);
  const sendEmailSuccess = useSelector((store) => store.auth.sendEmailSuccess);
  const resetPass = () => {
    dispatch(resetPassword(pass, code));
  };
  useEffect(() => {
    if (resetPassSuccess) {
      navigate("/login");
    }
  }, [resetPassSuccess]);

  if (sendEmailSuccess) {
    return (
      <div className={styles["login-page"]}>
        <form className={styles["login-page__form"]}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <PasswordInput
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name={"password"}
            extraClass="mt-6"
            placeholder={"Введите новый пароль"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
          />

          <Button
            extraClass="mt-6 mb-6"
            htmlType="button"
            type="primary"
            size="medium"
            onClick={resetPass}
          >
            Сохранить
          </Button>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link className={styles["login-page__link"]} to="/login">
              Войти
            </Link>
          </p>
        </form>
      </div>
    );
  } else return <Navigate to="/forgot-password" />;
};

export default ResetPasswordPage;
