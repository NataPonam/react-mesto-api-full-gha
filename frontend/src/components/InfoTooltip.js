import React from 'react';
import successMessage from '../images/successMessage.svg';
import errorMessage from '../images/errorMessage.svg';

const InfoTooltip = ({ onClose, isOpen, isSuccess }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}  `}>
      <div className="popup__container message">
        <img
          className="popup__img-message"
          src={isSuccess ? successMessage : errorMessage}
          alt={isSuccess ? 'успешная регистрация' : 'ошибка регистрации'}
        ></img>
        <h3 className="popup__title message">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
        <button
          className="popup__close-icon"
          onClick={onClose}
          type="button"
          aria-label="закрыть"
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
