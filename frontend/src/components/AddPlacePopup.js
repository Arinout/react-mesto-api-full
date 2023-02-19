import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleNameUpdate(evt) {
    setName(evt.target.value);
  }

  function handleLinkUpdate(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name: name,
      link: link
    });
  }

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'card'}
      title={'Новое место'}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input id="title" className="popup__input popup__input_element_title" name="name" type="text"  placeholder="Название" minLength="2" maxLength="30" value={name || ''} onChange={handleNameUpdate} required/>
        <span className="title-error popup__error popup__error_visible"></span>
      </div>
      <div className="popup__input-container">
        <input id="link" className="popup__input popup__input_element_link"  name="link" type="url"  placeholder="Ссылка на картинку" value={link || ''} onChange={handleLinkUpdate} required/>
        <span className="link-error popup__error popup__error_visible"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;