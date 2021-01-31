import React from "react";
import FormContent from "./FormContent";

const Login = ({onLogin, isLoading}) => {
  const submitValue = `${isLoading ? `Выполняется вход...` : `Войти`}`;
  const formName = "login";

  const handleLoginSubmit = ({email, password}) => {
    if (!email || !password){
      return;
    }
    onLogin(email, password);
  }

  return (
    <section className="register">
      <h2 className="popup__title popup__title_type_white">Вход</h2>
        <FormContent handleSubmit={handleLoginSubmit} formName={formName} submitValue={submitValue}/>
    </section>
  )
}

export default Login;