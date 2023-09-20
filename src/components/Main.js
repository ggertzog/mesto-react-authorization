import React, {useContext} from "react";
import Card from "./Card";
import profileButton from '../images/button.svg';
import cardButton from '../images/button-plus.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const currentUserInfo = useContext(CurrentUserContext);

    return(
        <main className="content">
          <section className="profile">
              <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
                  <img className="profile__avatar" src={currentUserInfo.avatar} alt="аватарка" />
              </button>
              <div className="profile__info">
                  <div className="profile__user-container">
                      <h1 className="profile__user-name">{currentUserInfo.name}</h1>
                      <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                          <img className="profile__edit-image" alt="ярлык" src={profileButton} />
                      </button>
                  </div>
                  <p className="profile__user-description">{currentUserInfo.about}</p>
              </div>
              <button className="profile__add-button" type="button" onClick={onAddPlace}>
                  <img className="profile__add-image" alt="ярлык" src={cardButton} />
              </button>
          </section>
          <section className="elements">
              {cards.map((card) => {
                return( 
                    <Card 
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                )
              })}
          </section>
      </main>
    );
}

export default Main;