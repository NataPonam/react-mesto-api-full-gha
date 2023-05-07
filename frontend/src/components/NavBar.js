import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const NavBar = ({ email, onSignOut }) => {
  return (
    <nav className="header__nav">
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__nav_link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__nav_link">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <span className="header__nav_text">{email}</span>
              <Link
                to="/sign-up"
                className="header__nav_link-out"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            </>
          }
        />
      </Routes>
    </nav>
  );
};

export default NavBar;
