import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {};
    values.email = email;
    values.password = password;

    onRegister(values);
    resetForm();
  };

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  /*useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/', { replace: true }); //если пользователь уже имеет jwt token, то перенаправляем на главную
    }
  }, [localStorage, navigate]);*/

  return (
    <div className="popup__container auth">
      <form className="popup__form form" onSubmit={handleSubmit}>
        <fieldset className="popup__input-box auth">
          <h3 className="popup__title auth">Регистрация</h3>
          <input
            className="popup__input auth"
            placeholder="Email:"
            id="email"
            name="email"
            type="email"
            value={email || ''}
            onChange={handleChangeEmail}
            autoComplete="off"
            required
          />
          <input
            className="popup__input auth"
            placeholder="Пароль:"
            id="password"
            name="password"
            type="password"
            value={password || ''}
            onChange={handleChangePassword}
            autoComplete="off"
            required
          />

          <button className="popup__btn auth" type="submit">
            Зарегистрироваться
          </button>
          <div className="register__signin">
            <span>
              <p className="register__text">{'Уже зарегистрированы?'}</p>
            </span>
            <Link to="/sign-in" className="register__link">
              Войти
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
