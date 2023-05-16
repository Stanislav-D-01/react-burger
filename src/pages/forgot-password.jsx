import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link} from "react-router-dom"
import styles from "./login-page.module.css"
import { useState } from "react"




const ForgotPassword =()=>{
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)}
    return(
<div className={styles["login-page"]}>
        <form className={styles["login-page__form"]}>
            <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
        onChange={onChange}
       
        name={'email'}
        isIcon={false}
        extraClass="mt-6"
        />
    
      <Button extraClass="mt-6 mb-6" htmlType="button" type="primary" size="medium">
      Восстановить
</Button>
<p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles["login-page__link"]} to='/login'>Войти</Link></p>

      </form>
      </div>
    )
}

export default ForgotPassword