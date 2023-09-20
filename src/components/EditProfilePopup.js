import React, {useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUserInfo = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUserInfo.name);
        setDescription(currentUserInfo.about);
    }, [currentUserInfo, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          buttonText="Сохранить"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input 
            name="name" 
            type="text" 
            placeholder="Введите имя" 
            className="popup__input popup__input_type_name" 
            required 
            minLength="2" 
            maxLength="40"
            value={name || ""}
            onChange={handleChangeName} 
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
            value={description || ""}
            onChange={handleChangeDescription}
          />
          <span 
            id="about-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;