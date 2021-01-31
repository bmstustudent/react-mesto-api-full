import React from "react";
import useValidation from "../hooks/useValidation";

const FormContent = ({handleSubmit, formName, submitValue}) => {
  const fields = ['email', 'password'];

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      email: inputValue.email,
      password: inputValue.password,
    });
  }

  const {
    isValid, setIsValid,
    inputValue, setInputValue,
    validationMessage, setValidationMessage,
    handleInputChange, fieldsEnumeration
  } = useValidation(fields);

  React.useEffect(() => {
    setInputValue(fieldsEnumeration(''));
    setIsValid(fieldsEnumeration(false));
    setValidationMessage(fieldsEnumeration(''));
  }, [setInputValue, setIsValid, setValidationMessage]);

  return (
    <form className="form_type_register"
          action="#"
          name={formName}
          onSubmit={onSubmit}
          noValidate>
      <div className="popup__cover popup__cover_type_register">
        <label className="popup__control">
          <input
            className={`${validationMessage.email ? `popup__input popup__input_type_email popup__input_type_error` : `popup__input popup__input_type_email`}`}
            type="email" name="email" value={inputValue.email}
            onChange={handleInputChange} placeholder="Email" required/>
          <span
            className={`${isValid.email ? `popup__error` : `popup__error popup__error_type_active`}`}>{validationMessage.email}</span>
        </label>
        <label className="popup__control">
          <input
            className={`${validationMessage.password ? `popup__input popup__input_type_password popup__input_type_error` : `popup__input popup__input_type_password`}`}
            type="password" name="password" value={inputValue.password}
            onChange={handleInputChange} placeholder="Пароль" required/>
          <span
            className={`${isValid.password ? `popup__error` : `popup__error popup__error_type_active`}`}>{validationMessage.password}</span>
        </label>
      </div>
      <input
        className={`${isValid.email && isValid.password ? `button popup__submit popup__submit_type_white` : `button popup__submit popup__submit_type_white popup__submit_type_disabled`}`}
        type="submit" value={submitValue} name="submit"/>
    </form>
  )
}

export default FormContent;