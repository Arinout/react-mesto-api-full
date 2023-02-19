import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardDeleteButtonClassName = (
    `photo-grid__delete-button ${isOwn ? 'photo-grid__delete-button_visible' : ''}`
  ); 
  
  const cardLikeButtonClassName = (
    `photo-grid__button-like ${isLiked ? 'photo-grid__button-like_active' : ''}`
  );; 

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
      <li className="photo-grid__element">
        <button type="button" onClick={handleClick} className='photo-grid__image-button'>
          <img className="photo-grid__image" src={props.link} alt= {props.name} />
        </button>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="photo-grid__info">
          <h2 className="photo-grid__title">{props.name}</h2>
          <div className="photo-grid__likes">
            <button type="button"  className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="photo-grid__likes-counter">{props.likes}</span>
          </div>
        </div>
      </li>
    )
}

export default Card