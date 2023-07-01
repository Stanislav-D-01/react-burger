import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./login-page.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassSendEmail } from "../services/actions/authorization";
import { PATH_RESET_PASS } from "../utils/utils";
const ForgotPassword = () => {
  const sendEmailSuccess = useSelector((store) => store.auth.sendEmailSuccess);
  const nameUser = useSelector((store) => store.auth.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (sendEmailSuccess) {
      navigate(PATH_RESET_PASS);
    }
  }, [sendEmailSuccess]);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const sendEmail = (email) => {
    dispatch(forgotPassSendEmail(email));
  };

  if (!nameUser) {
    return (
      <div className={styles["login-page"]}>
        <form
          onSubmit={() => sendEmail(email)}
          className={styles["login-page__form"]}
        >
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            value={email}
            isIcon={false}
            extraClass="mt-6"
          />

          <Button
            extraClass="mt-6 mb-6"
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
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
  } else return <Navigate to="/profile" />;
};

export default ForgotPassword;
