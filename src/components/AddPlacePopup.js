import React, {useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentContext } from "../contexts/CurrentContext";

function AddPlacePopup(props) {

  const currentCard = useContext(CurrentContext);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
      setTitle(currentCard.title);
      setLink(currentCard.link)
  }, [currentCard, props.isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            title,
            link,
        })
    }

    return(
        <PopupWithForm 
          title="Новое место"
          name="create"
          buttonText="Создать"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input 
            name="title" 
            type="text" 
            placeholder="Название" 
            className="popup__input popup__input_type_title" 
            required 
            minLength="2" 
            maxLength="30"
            onChange={handleChangeTitle}
            value={title || ""}
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
            onChange={handleChangeLink}
            value={link || ""}
          />
          <span 
            id="link-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;