function ImagePopup(props) {
  return (
    <div  className={`popup popup_type_image image-popup " ${props.card ? 'popup_active' : ''}`}>
      <figure className="image-popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="image-popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
        <figcaption className="image-popup__caption">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  )
}
  
  export default ImagePopup;