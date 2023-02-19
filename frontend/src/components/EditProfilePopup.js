import React , {useState, useContext}from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
  
    React.useEffect(() => {
      if (props.isOpen) {        
        setName(currentUser.name);
        setDescription(currentUser.about);
      }
    }, [props.isOpen,currentUser]); 
  
    function handleNameChange(evt) {
      setName(evt.target.value);
    }
  
    function handleDescriptionChange(evt) {
      setDescription(evt.target.value);
    }
  
    function handleSubmit(evt) {
      evt.preventDefault();
  
      props.onSubmit({
        name: name,
        profession: description,
      });
    }
  
    return(
      <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        name={'profile'}
        title='Редактировать профиль'
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}
      >
        <div className="popup__input-container">
            <input id="name" className="popup__input popup__input_element_name" name="name" type="text"  placeholder="Имя" minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange}/>
            <span className="name-error popup__error popup__error_visible"></span>
          </div>
          <div className="popup__input-container">
            <input id="profession"className="popup__input popup__input_element_profession"  name="profession" type="text"   placeholder="О себе" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange}/>
            <span className="profession-error popup__error popup__error_visible"></span>
          </div>
      </PopupWithForm>
    )
  }
  
  export default EditProfilePopup;