import React from "react";
import Popup from "./Popup";
import useValidation from "../hooks/useValidation";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
  const fields = ['name', 'link'];

  const {
    isValid, setIsValid,
    inputValue, setInputValue,
    validationMessage, setValidationMessage,
    handleInputChange, fieldsEnumeration
  } = useValidation(fields);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({
      name: inputValue.name,
      link: inputValue.link
    });
  }

  React.useEffect(() => {
    setInputValue(fieldsEnumeration(''));
    setIsValid(fieldsEnumeration(false));
    setValidationMessage(fieldsEnumeration(''));
  }, [isOpen, setInputValue, setIsValid, setValidationMessage]);

  return (
    <Popup
      name="add"
      isOpen={isOpen}
      onClose={onClose}>
      <h2 className="popup__title">Новое место</h2>
      <form className={'popup__form form_type_add'}
            action="#"
            name="add"
            onSubmit={handleSubmit}
            noValidate>
        <div className="popup__cover">
          <label className="popup__control">
            <input
              className={`${validationMessage.name ? `popup__input popup__input_type_title popup__input_type_error` : `popup__input popup__input_type_title`}`}
              type="text" name="name" placeholder="Название" minLength="1" maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё\D][A-Za-zА-Яа-яЁё\s\D]*[A-Za-zА-Яа-яЁё\D]$"
              required value={inputValue.name}
              onChange={handleInputChange}/>
            <span
              className={`${isValid.name ? `popup__error` : `popup__error popup__error_type_active`}`}>{validationMessage.name}</span>
          </label>
          <label className="popup__control">
            <input
              className={`${validationMessage.link ? `popup__input popup__input_type_link popup__input_type_error` : `popup__input popup__input_type_link`}`}
              type="url" name="link" placeholder="Ссылка на картинку" required value={inputValue.link}
              onChange={handleInputChange}/>
            <span
              className={`${isValid.link ? `popup__error` : `popup__error popup__error_type_active`}`}>{validationMessage.link}</span>
          </label>
        </div>
        <input
          className={`${isValid.link && isValid.name ? `button popup__submit` : `button popup__submit popup__submit_type_disabled`}`}
          type="submit" value={`${isLoading ? `Сохранение...` : `Сохранить`}`}
          name="submit"/>
      </form>
    </Popup>
  )
}

export default AddPlacePopup;