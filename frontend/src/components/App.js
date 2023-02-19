import React from "react";
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLogIn, setisLogIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isRegistration, setIsRegistration] = React.useState(false);
  const [RegistrationText, setRegistrationText] = React.useState('');
  const [email, setEmail] = React.useState('')

  const history = useHistory();

  React.useEffect ( () => {
    if (isLogIn) {
      Promise.all([
        api.getUserInfo(), 
        api.getInitialCards()])
        .then(([user, data]) => {
            setCurrentUser(user);
            setCards(data)
        })
        .catch((err) => {
          console.log(`ошибка ${err}`);
        })
      }
      }, [isLogIn]);
  
    
  
  function handleUpdateUser(data) {
    api.editUserInfo(data)
    .then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  function handleUpdateAvatar(data) {
    api.editAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleRegister (data) {
    auth.register(data)
    .then(() => {
      setEmail(data.email);
      setIsRegistration(true)
      setRegistrationText('Вы успешно зарегистрировались!')
      setIsInfoTooltipPopupOpen(true)
      history.push("/sign-in");
    })
    .catch(() => {
      setIsRegistration(false)
      setRegistrationText('Что-то пошло не так! Попробуйте ещё раз.')
      setIsInfoTooltipPopupOpen(true)
    })
  }

  function handleLogIn(data) {
    auth.authorize(data)
      .then((res) => {
        if (res) {
          setisLogIn(true);
          setEmail(data.email);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  React.useEffect(() => { 
    handleCheckToken()
  }, []) 

  function handleCheckToken() { 
    auth.getContent() 
      .then((res) => { 
        setisLogIn(true); 
        setEmail(res.email); 
        history.push("/"); 
      }) 
      .catch(() => { 
        history.push("/sign-in"); 
      }); 
  } 

  function handleSignOut() {
    setisLogIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="page">
        <Header email={email} onClick={handleSignOut}/>
          <Switch>
          <ProtectedRoute exact path="/" component={Main} 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isLogIn={isLogIn}
            />

          <Route path="/sign-up">
            <Register  onRegister={handleRegister}/>
          </Route>

          <Route path="/sign-in">
            <Login  onRegister={handleLogIn}/>
          </Route>

          <Route>
            {isLogIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>

          </Switch>

        {isLogIn && <Footer />}

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onSubmit={handleUpdateAvatar}
        />

        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}  
        onClose={closeAllPopups} 
        onSubmit={handleAddPlaceSubmit}
        />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onSubmit={handleUpdateUser}
        /> 

        <PopupWithForm name='delete' title= 'Вы уверены?'>
          <input type="submit"  name="button" className="popup__submit-button" value="Да"/>
        </PopupWithForm>

        <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
        />

        <InfoTooltip 
        onClose={closeAllPopups} 
        isOpen={isInfoTooltipPopupOpen} 
        RegistrationText={RegistrationText} 
        isRegistration={isRegistration}/>

      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
