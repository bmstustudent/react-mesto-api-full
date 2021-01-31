import React from "react";
import Popup from "./Popup";
import success from '../images/success.svg';
import error from '../images/error.svg';

const InfoTooltip = ({isRegister, isOpen, onClose}) => {
  return (
    <Popup name="info"
           isOpen={isOpen}
           onClose={onClose}>
        <img className="popup__icon" src={`${isRegister ? `${success}` : `${error}`}`}
             alt="Значок об успешной регистрации либо ошибке"/>
        <h2 className="popup__title popup__title_type_center">{`${isRegister ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
Попробуйте ещё раз.`}`}</h2>
    </Popup>
  );
}

export default InfoTooltip;