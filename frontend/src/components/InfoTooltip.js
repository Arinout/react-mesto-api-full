import React from 'react';

export default function InfoTooltip(props) {

    return (
        <section className={`popup ${props.isOpen && 'popup_active'}`}>
            <div className="popup__content popup__content_auth">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <div className='popup__auth-info'>
                    <div className={`popup__auth-img ${props.isRegistration ? 'popup__auth-img_ok' :'popup__auth-img_error'}`}></div>
                    <span className="popup__auth-text">{props.RegistrationText}</span>
                </div>
            </div>
        </section>
    )
}