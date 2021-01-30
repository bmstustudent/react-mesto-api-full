import React from "react";
import Popup from "./Popup";

const DeleteConfirmPopup = ({card, onClose, isOpen, onCardDelete, isLoading}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onCardDelete(card);
    };

    return (
        <Popup name="prevent"
               isOpen={isOpen}
               onClose={onClose}>
            <h2 className="popup__title">Вы уверены?</h2>
            <form className={'popup__form form_type_prevent'}
                  action="#"
                  name="prevent"
                  onSubmit={handleSubmit}
                  noValidate>
                <input className="button popup__submit" type="submit" name="submit"
                       value={`${isLoading ? `Удаление...` : `Да`}`}/>
            </form>
        </Popup>
    )
}

export default DeleteConfirmPopup;