import React, {useState} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="body root">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm 
          title="Новое место"
          name="create"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            name="title" 
            type="text" 
            placeholder="Название" 
            className="popup__input popup__input_type_title" 
            required 
            minLength="2" 
            maxLength="30" 
          />
          <span 
            id="title-error" 
            className="popup__span-error">
          </span>
          <input 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку" 
            className="popup__input popup__input_type_link" 
            required 
          />
          <span 
            id="link-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            name="name" 
            type="text" 
            placeholder="Введите имя" 
            className="popup__input popup__input_type_name" 
            required 
            minLength="2" 
            maxLength="40" 
          />
          <span 
            id="name-error" 
            className="popup__span-error">
          </span>
          <input 
            name="about" 
            type="text" 
            placeholder="Расскажите о себе" 
            className="popup__input popup__input_type_about" 
            required 
            minLength="2" 
            maxLength="200" 
          />
          <span 
            id="about-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            name="avatar" 
            type="url" 
            className="popup__input" 
            placeholder="Ссылка на изображение" 
            required 
          />
          <span 
            id="avatar-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
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
  );
}

export default App;
