import React from "react";
import closeButton from "../images/Close-Icon.svg";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup-image ${card ? "popup_opened" : ""}`}>
            <figure className="popup-image__figure">
                <div className="popup-image__container">
                    <img src={card?.link} alt={card?.name} className="popup-image__element" />
                    <button className="popup__button-close" type="button" onClick={onClose}>
                        <img src={closeButton} alt="закрыть" className="popup__button-image" />
                    </button>
                </div>
                <figcaption className="popup-image__subtitle">{card ? card.name : ""}</figcaption>
            </figure>  
        </div>
    );
}

export default ImagePopup;