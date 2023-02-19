import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleChangePassword(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({
            email: email,
            password: password
        });
    }

    return (
        <section className="authorize ">
            <form className="authorize__form" onSubmit={handleSubmit}>
                <h2 className="authorize__heading">Регистрация</h2>
                <input name="email" className="authorize__input" type="email" placeholder="Email" required onChange={handleChangeEmail} value={email || ''} />
                <input name="password" className="authorize__input" type="password" placeholder="Пароль" required onChange={handleChangePassword} value={password || ''} />
                <button className="authorize__submit-btn" type="submit">Зарегистрироваться</button>
            </form>
            <p className="authorize__caption">Уже зарегистрированы?
                <Link to="/sign-in" className="authorize__caption authorize__caption_link"> Войти</Link>
                </p>
        </section>
    );
}