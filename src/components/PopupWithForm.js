import React from "react";
import closeButton from '../images/Close-Icon.svg';
import {usePopupClose}  from "../hooks/usePopupClose";

function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}) {

    usePopupClose(isOpen, onClose);
    
    return (
        <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__container">
              <form className="popup__form" name={name} onSubmit={onSubmit}>
                  <h2 className="popup__text">{title}</h2>
                  {children}
                  <button className="popup__button popup__button_type_create" type="submit">{buttonText}</button>
                  <button className="popup__button-close" onClick={onClose}>
                      <img src={closeButton} alt="закрыть" className="popup__button-image" />
                  </button>
              </form>
          </div>
      </div>
    )
}

export default PopupWithForm;