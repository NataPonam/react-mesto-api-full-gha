import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  function handleSubmit(event) {
    event.preventDefault();

    onLogin({ email, password });
    resetForm();
    console.log({ email, password });
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="popup__container auth">
      <form className="popup__form form" onSubmit={handleSubmit}>
        <fieldset className="popup__input-box auth">
          <h3 className="popup__title auth">Вход</h3>
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
            required
          />
          <button className="popup__btn auth" type="submit">
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
