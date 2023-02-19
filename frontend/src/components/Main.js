import React from "react";
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__image" />
          <button className="profile__image-btn" onClick={props.onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>

      <section className="photo-grid">
        <ul className="photo-grid__elements">
        {props.cards.map (card => {
          return <Card 
          name={card.name} 
          card={card} 
          link={card.link} 
          likes={card.likes.length} 
          key={card._id} 
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete} />
          })
        }
        </ul>
      </section>
    </main>
  )
}

export default Main