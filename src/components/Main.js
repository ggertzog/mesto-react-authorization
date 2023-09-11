import React, {useState, useEffect} from "react";
import api from "../utils/Api";
import Card from "./Card";
import profileButton from '../images/button.svg';
import cardButton from '../images/button-plus.svg';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => console.log(err));

        api.getInitialCards()
            .then((items) => {
                setCards(items);
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <main className="content">
          <section className="profile">
              <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
                  <img className="profile__avatar" src={userAvatar} alt="аватарка" />
              </button>
              <div className="profile__info">
                  <div className="profile__user-container">
                      <h1 className="profile__user-name">{userName}</h1>
                      <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                          <img className="profile__edit-image" alt="ярлык" src={profileButton} />
                      </button>
                  </div>
                  <p className="profile__user-description">{userDescription}</p>
              </div>
              <button className="profile__add-button" type="button" onClick={onAddPlace}>
                  <img className="profile__add-image" alt="ярлык" src={cardButton} />
              </button>
          </section>
          <section className="elements">
              {cards.map((card) => {
                return (
                    <Card 
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                    />
                )
              })}
          </section>
      </main>
    );
}

export default Main;