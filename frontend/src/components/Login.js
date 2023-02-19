import React from 'react';

export default function LogIn(props) {
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
            email,
            password
        });
    }

    return (
        <section className="authorize ">
            <form className="authorize__form" onSubmit={handleSubmit}>
                <h2 className="authorize__heading">Вход</h2>
                <input name="email" className="authorize__input" type="email" placeholder="Email" required onChange={handleChangeEmail} value={email || ''} />
                <input name="password" className="authorize__input" type="password" placeholder="Пароль" required onChange={handleChangePassword} value={password || ''} />
                <button className="authorize__submit-btn" type="submit">Войти</button>
            </form>
        </section>
    );
}