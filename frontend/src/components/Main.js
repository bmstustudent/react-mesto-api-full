import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) => {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__cover">
                    <div className="avatar profile__avatar" onClick={onEditAvatar}
                         style={{backgroundImage: `url(${currentUser.avatar})`}}/>
                    <div className="profile__info">
                        <div className="profile__position">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="button button_edit profile__button opacity" type="button"
                                    onClick={onEditProfile}/>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="button button_add opacity" type="button" onClick={onAddPlace}/>
            </section>

            <section className="pictures">
                <ul className="pictures__list">
                    {cards.map((card) => <Card key={card._id} onCardClick={onCardClick} card={card}
                                               onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main;