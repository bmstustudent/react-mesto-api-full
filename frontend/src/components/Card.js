import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const handleClick = () => {
        onCardClick(card);
    }

    return (
        <li className="pictures__item">
            <button
                className={`${isOwn ? `button pictures__delete pictures__delete_show opacity` : `button pictures__delete opacity`}`}
                type="button" onClick={handleDeleteClick}/>
            <img className="pictures__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="pictures__cover">
                <p className="pictures__title">{card.name}</p>
                <div className="pictures__like-cover">
                    <button
                        className={`${isLiked ? `button pictures__like pictures__like_active opacity` : `button pictures__like opacity`}`}
                        type="button" onClick={handleLikeClick}/>
                    <span className="pictures__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;