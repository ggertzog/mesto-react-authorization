import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentContext } from '../contexts/CurrentContext.js';

import api from '../utils/Api.js';

import ProtectedRouteElement from './ProtectedRoute.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import * as auth from '../utils/auth.js'
import Login from './Login.js';
import Register from './Register.js';


import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isRegister, setIsRegister] = useState({
    status: "",
    massage: ""
  });
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getInitialCards()
        .then((items) => {
            setCards(items);
        })
        .catch(console.error)
  }, []);

  //получаем токен из локального хранилища и записываем его в стейт переменную
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, [token]);


  useEffect(() => {
    if(!token || loggedIn) {
      return;
    }
    auth.getContent(token)
      .then((user) => {
        setUserInfo(user.data);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(console.error)
  }, [token, loggedIn, navigate])

  function registration(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsRegister({
          status: true,
          message: "Вы успешно зарегестрировались!"
        });
        navigate("/");
        navigate("/sign-in", {replace: true});
      })
      .catch((err) => {
        setIsRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте ещё раз."
        });
        console.error(err);
      })
      .finally(() => {
        setIsOpenTooltip(true);
      })
  }

  function login(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setLoginFailed("Что-то пошло не так! Попробуйте ещё раз.")
      });
  }

  function logOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setToken("");
    setUserInfo({});
    navigate("/sign-in");
    setIsOpenBurgerMenu(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function openNavBar() {
    setIsOpenBurgerMenu(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsOpenTooltip(false);
    setIsOpenBurgerMenu(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(console.error)
  }

  function handleUpdateUser(items) {
    api.editUserProfile(items)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(items) {
    api.changeAvatar(items)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(items) {
    api.postNewCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }

  return (
    <CurrentContext.Provider value={currentUser}>
      <div className="body root">
        <Header 
          logOut={logOut} 
          userInfo={userInfo} 
          isOpenBurgerMenu={isOpenBurgerMenu}
          onClose={closeAllPopups}
          isOpen={openNavBar}
        />
        <Routes>
          <Route 
            path="/" 
            element= {
              <ProtectedRouteElement 
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                userInfo={userInfo}
                loggedIn={loggedIn} 
                logOut={logOut}
              />  
            }
          />
          <Route 
            path="/sign-in" 
            element={
              <Login 
                loggedIn={loggedIn}
                login={login}
                errorMassage={loginFailed}
                onClose={closeAllPopups}
              />
            } 
          />
          <Route 
            path="/sign-up" 
            element={
              <Register 
                loggedIn={loggedIn}
                registration={registration}
                onClose={closeAllPopups}
              />
            } 
          />
          <Route
            path="/*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <InfoTooltip 
          isRegister={isRegister}
          isOpen={isOpenTooltip}
          onClose={closeAllPopups}
          alt={"Статус"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
        >
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}  
        />
      </div>
    </CurrentContext.Provider>
  );
}

export default App;
