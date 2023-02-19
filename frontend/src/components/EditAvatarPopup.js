import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props){
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    
    props.onSubmit({
      avatar: ref.current.value
    });
  }

  React.useEffect(() => {
    if (props.isOpen){
      ref.current.value = '';
    }
  }, [props.isOpen]);
  
  return(
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input ref={ref} id="avatar" className="popup__input popup__input_element_avatar" name="avatar" type="url"  placeholder="Ссылка на картинку" required/>
        <span className="avatar-error popup__error popup__error_visible"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;