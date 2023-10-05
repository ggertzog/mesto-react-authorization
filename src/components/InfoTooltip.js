import React from "react"
import closeButton from '../images/Close-Icon.svg';
import Ok from '../images/Ok.svg';
import Err from '../images/Err.svg'

function InfoTooltip({ onClose, isOpen, isRegister }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup-tooltip">
                <button type="button" className="popup__button-close" onClick={onClose}>
                    <img src={closeButton} className="popup__button-image" alt="Крестик" />
                </button>
                <img className="popup-tooltip__image" src={isRegister.status ? Ok : Err} alt="Статус" />
                <p className="popup-tooltip__text">{isRegister.message}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;