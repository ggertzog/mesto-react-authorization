import React from "react";
import like from "../images/like.svg";
import trashcan from "../images/musorka.svg";

function Card({card, onCardClick}) {

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <div className="elements__card">
            <img className="elements__image" alt={card.name} src={card.link} onClick={handleCardClick} />
            <button className="elements__button-del" type="button">
                <img src={trashcan} alt="урна" className="elements__button-del-image" />
            </button>
            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button className="elements__button-like" type="button">
                        <img src={like} alt="нравится" className="elements__button-like-image" />
                    </button>
                        <h3 className="elements__likes-sum">{card.likes.length}</h3>
                    </div>
            </div>
        </div>
    )
}

export default Card;