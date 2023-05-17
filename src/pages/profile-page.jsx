import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";

const ProfilePage = () => {
  const { name, setName } = useState("");
  const { email, setEmail } = useState("");
  const { pass, setPass } = useState("");
  const inputRef = useRef(null);
  return (
    <div>
      <menu>
        <ul>
          <li className="text text_type_main-medium">Профиль</li>
          <li className="text text_type_main-medium text_color_inactive">
            История заказов
          </li>
          <li className="text text_type_main-medium text_color_inactive">
            Выход
          </li>
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
          onFocus={(e) => console.log(e.target.onFocus)}
          onIconClick={(e) => {
            inputRef.current.disabled = false;
            inputRef.current.style.cursor = "text";
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
          icon="EditIcon"
          extraClass="mt-6"
        />
      </form>
    </div>
  );
};

export default ProfilePage;
