import headerLogo from '../images/Vector.svg';
import React from "react";

function Header() {
    return (
        <header className="header">
          <img className="header__logo" src={headerLogo} alt="логотип" />
        </header>
    );
}

export default Header;