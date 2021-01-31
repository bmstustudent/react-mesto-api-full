import React from "react";
import Popup from "./Popup";

const ImagePopup = ({card, isOpen, onClose}) => {
    return (
        <Popup name="picture"
               isOpen={isOpen}
               onClose={onClose}>
            <figure className="popup__figure">
                <img className="popup__image" src={card.link} alt={card.name}/>
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </Popup>
    );
}

export default ImagePopup;