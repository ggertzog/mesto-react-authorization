import React, {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar})  {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = "";
    }, [isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        })
    }

    return(
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          buttonText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input 
            name="avatar" 
            type="url" 
            className="popup__input" 
            placeholder="Ссылка на изображение" 
            required
            ref={inputRef}
          />
          <span 
            id="avatar-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;