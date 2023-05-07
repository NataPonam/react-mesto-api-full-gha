import React from 'react';
import headerLogo from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <span>{children}</span>
    </header>
  );
}

export default Header;
