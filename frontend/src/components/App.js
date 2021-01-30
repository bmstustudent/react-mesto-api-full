import React from 'react';
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {getToken, removeToken, setToken} from "../utils/token";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../auth.js';

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isTooltipPopupOpen, setTooltipPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  const handleContentGetter = (token) => {
    return auth.getContent(token)
      .then((res) => {
        setEmail(res.email);
        setLoggedIn(true);
        history.push('/');
      })
  }

  const tokenCheck = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    handleContentGetter(jwt)
      .catch((err) => {
        if (err === 401) {
          console.log('Произошла ошибка, токен не был передан, был передан не в том формате или не является корректным')
        }
      });
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (!data) {
          return
        }
        if (data.token) {
          setToken(data.token);
          handleContentGetter(data.token)
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log('Произошла ошибка, не передано одно из полей');
        } else if (err === 401) {
          console.log('Произошла ошибка, пользователь с данным email не найден');
        }
      });
  }

  const onRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsRegister(true);
          setTooltipPopupOpen(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        setIsRegister(false);
        setTooltipPopupOpen(true);
        if (err === 400) {
          console.log('Произошла ошибка, некорректно заполнено одно из полей')
        }
      });
  }

  const onSignOut = () => {
    removeToken();
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const promise = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);
    promise
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        const deleteCards = cards.filter((c) => c._id !== card._id);
        setCards(deleteCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  const getUserAndCards = async () => {
    try {
      const [userInfo, cards] = await Promise.all([api.getUserInfo(), api.getCards()]);
      setCards(cards);
      setCurrentUser(userInfo);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  React.useEffect(() => {
    if (!loggedIn) return;
    getUserAndCards();
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeletePopupOpenClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(false);
    setImagePopupOpen(false);
    setTooltipPopupOpen(false);
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true)
    api.setUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        console.log(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleUpdateAvatar = (inputValue) => {
    setIsLoading(true)
    api.setAvatar(inputValue)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleAddPlaceSubmit = (inputValue) => {
    setIsLoading(true)
    api.createCard(inputValue)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <div className="page">
      <div className="page__cover">
        <Switch>
          <CurrentUserContext.Provider value={currentUser}>
            <Header onSignOut={onSignOut} loggedIn={loggedIn} email={email}/>
            <Route path="/signin">
              <Login onLogin={onLogin} isLoading={isLoading}/>
            </Route>
            <Route path="/signup">
              <Register onRegister={onRegister} isLoading={isLoading}/>
            </Route>
            <ProtectedRoute exact path="/" loggedIn="loggedIn">
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeletePopupOpenClick}
                cards={cards}
              />
              <Footer/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                             onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                               onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>

              <DeleteConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}
                                  card={selectedCard} onCardDelete={handleCardDelete} isLoading={isLoading}/>

              <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>

            </ProtectedRoute>
            <Route>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
            </Route>
          </CurrentUserContext.Provider>
        </Switch>
        <InfoTooltip isRegister={isRegister} isOpen={isTooltipPopupOpen} onClose={closeAllPopups}/>
      </div>
    </div>

  );
}

export default App;