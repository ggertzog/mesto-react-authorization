import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function AddPlacePopup(props) {

    const titleRef = useRef(null);
    const linkRef = useRef(null);

    useEffect(() => {
        titleRef.current.value = "";
        linkRef.current.value = "";
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            title: titleRef.current.value,
            link: linkRef.current.value,
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
            ref={titleRef}
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
            ref={linkRef}
          />
          <span 
            id="link-error" 
            className="popup__span-error">
          </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;