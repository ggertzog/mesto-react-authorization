import React, { useContext } from "react";
import like from "../images/like.svg";
import trashcan from "../images/musorka.svg";
import { CurrentContext } from "../contexts/CurrentContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUserInfo = useContext(CurrentContext);
    const isOwn = card.owner._id === currentUserInfo._id;
    const isLiked = card.likes.some(i => i._id === currentUserInfo._id);
    const cardLikeButtonClassName = (`elements__button-like ${isLiked && "elements__button-like_active"}`);

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="elements__card">
            <img className="elements__image" alt={card.name} src={card.link} onClick={handleCardClick} />
            {isOwn && <button className="elements__button-del" type="button" onClick={handleDeleteClick}>
                <img src={trashcan} alt="урна" className="elements__button-del-image" />
            </button>}
            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
                        <img src={like} alt="нравится" className="elements__button-like-image" />
                    </button>
                        <h3 className="elements__likes-sum">{card.likes.length}</h3>
                    </div>
            </div>
        </div>
    )
}

export default Card;