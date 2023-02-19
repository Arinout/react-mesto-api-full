function PopupWithForm(props) {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_active`: ""}`}>
        <div className="popup__content">
          <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}/>
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            {props.children}
            <input type="submit"  name="button" className="popup__submit-button card-popup__submit-button" value={props.buttonText}/>
          </form>
        </div>
      </div>
    )
  }

export default PopupWithForm