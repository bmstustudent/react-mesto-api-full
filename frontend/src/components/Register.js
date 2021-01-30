import React from "react";
import FormContent from "./FormContent";
import {Link} from 'react-router-dom';

const Register = ({onRegister, isLoading}) => {
  const submitValue = `${isLoading ? `Регистрация...` : `Зарегистрироваться`}`;
  const formName = "register";

  const handleRegisterSubmit = ({email, password}) => {
    if (!email || !password) {
      return;
    }
    onRegister(email, password);
  }

  return (
    <section className="register">
      <h2 className="popup__title popup__title_type_white">Регистрация</h2>
      <FormContent handleSubmit={handleRegisterSubmit} formName={formName} submitValue={submitValue}/>
      <Link to="signin" className="register__link">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;