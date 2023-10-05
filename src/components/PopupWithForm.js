import React from "react";
import closeButton from '../images/Close-Icon.svg';

function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__container">
              <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
                  <h2 className="popup__text">{title}</h2>
                  {children}
                  <button className="popup__button popup__button_type_create" type="submit">{buttonText}</button>
                  <button className="popup__button-close" type="button" onClick={onClose}>
                      <img src={closeButton} alt="закрыть" className="popup__button-image" />
                  </button>
              </form>
          </div>
      </div>
    )
}

export default PopupWithForm;