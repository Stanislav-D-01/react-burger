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
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.addEventListener("focusout", (e) => {
      e.target.disabled = true;
      inputRef.current.style.cursor = "not-allowed";
      inputRef.current.style.color = "#8585AD";
    });

    navigate("/profile", {
      state: { path: "/", url: "profile", title: "profile" },
    });
  }, []);

  const saveForm = (e) => {
    e.preventDefault();
    if (name !== nameUser || email !== emailUser || pass.length > 0) {
      dispatch(saveNewProfile(name, email, pass));
    }
  };

  const undoInput = () => {
    setName(nameUser);
    setEmail(emailUser);
    setEdit(false);
    setPass("");
  };

  const buttonToggleState = () => {
    if (!edit) {
      setEdit(true);
    }
  };

  if (!request) {
    return (
      <form
        onSubmit={(e) => saveForm(e)}
        className={styles["profile-page"]}
        name="profileForm"
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {
            setName(e.target.value);
            buttonToggleState();
          }}
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
          onChange={(e) => {
            setEmail(e.target.value);
            buttonToggleState();
          }}
          name={"email"}
          value={email}
          placeholder={"E-mail"}
          extraClass="mt-6"
          isIcon={true}
        />
        <PasswordInput
          onChange={(e) => {
            setPass(e.target.value);
            buttonToggleState();
          }}
          value={pass}
          name={"password"}
          placeholder={"Изменить пароль"}
          icon="EditIcon"
          extraClass="mt-6"
        />
        {edit && (
          <Button
            name="saveButton"
            extraClass="mt-6 mr-6"
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        )}
        {edit && (
          <Button
            name="undoButton"
            extraClass={`mt-6 ${styles["profile-page__button"]}`}
            htmlType="button"
            type="primary"
            size="medium"
            onClick={undoInput}
          >
            Отмена
          </Button>
        )}
      </form>
    );
  } else return <></>;
};

export default Profile;
