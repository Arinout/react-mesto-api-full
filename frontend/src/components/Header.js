import React from 'react';
import { Switch, Route, Link } from "react-router-dom";


function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route>
          <div className='header__logout'>
            <p className="header__email">{props.email}</p>
            <button to='/sign-in' className="header__quit" onClick={props.onClick} >Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;