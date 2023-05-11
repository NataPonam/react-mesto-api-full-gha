import React, { useEffect, useState } from 'react';
import '../App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../context/CurrentUserContext';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import AskFormPopup from './AskFormPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import NotFoundPage from './NotFoundPage';
import NavBar from './NavBar';

import { api } from '../utils/Api';
import * as auth from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAskPopupOpen, setIsAskPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [isTooltipOpen, setIsTooltipOpen] = useState(false); //открытие попапа при регистрации
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false); //попап успешной регистрации

  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };

  //закрыть все попапы
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ link: '' });
    setIsAskPopupOpen(false);
    setIsTooltipOpen(false);
  };
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isAskPopupOpen ||
    isTooltipOpen;

    const api = new Api({
      url: 'https://api.moon.nomoredomains.monster',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getAllCards(), api.getUser()])
        .then(([cards, user]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .editProfile(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .editAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .getNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function askFormForDeleteCard(card) {
    setDeleteCard(card);
    setIsAskPopupOpen(true);
  }

  //12 ПР

  //Зарегистрироваться
  function onRegister({ email, password }) {
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          return (
            res,
            navigate('/sign-in', { replace: true }),
            setIsTooltipSuccess(true)
          );
        }
      })
      .catch((err) => {
        setIsTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsTooltipOpen(true));
  }
  //Войти
  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/', { replace: true });
          setIsTooltipOpen(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setIsTooltipOpen(true);
        setIsTooltipSuccess(false);
        console.log(err);
      });
  }

  useEffect(() => {
    // при наличии токена в localStorage проверяет валидность
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate('/', { replace: true });
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [navigate]);

  //Выход
  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-up');
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="body">
          <Header loggedIn={loggedIn}>
            <NavBar loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
          </Header>
          <Routes>
            <Route
              path="/sign-in"
              element={<Login onLogin={onLogin} loggedIn={loggedIn} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={onRegister} />}
            />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/"
                element={
                  <Main
                    onSignOut={onSignOut}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onDeleteBtn={askFormForDeleteCard}
                    cards={cards}
                  />
                }
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <AskFormPopup
            isOpen={isAskPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={deleteCard}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isTooltipSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
