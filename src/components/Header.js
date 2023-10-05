import headerLogo from '../images/Vector.svg';
import closeIcon from '../images/Close-Icon.svg'
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({userInfo, logOut, isOpenBurgerMenu, isOpen, onClose}) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  console.dir(isOpenBurgerMenu);  

    return (
      <>
        {isOpenBurgerMenu ? (
          <div className='header__nav-container'>
            <p className='header__nav-email'>{userInfo.email}</p>
            <button className='header__nav-logout' onClick={logOut}>Выйти</button>
          </div>
        ) : (
          null
          )
        }
        <header className="header">
          <img className="header__logo" src={headerLogo} alt="логотип" />
          <Routes>
            <Route 
              path="/sign-in" 
              element={
                <Link className="header__link" to="/sign-up">Регистрация</Link>
              } 
            />
            <Route 
              path="/sign-up" 
              element={
                <Link className="header__link" to="/sign-in">Войти</Link>
              } 
            />

            { windowWidth >= 520 ? (
            
              <Route 
                path="/"
                element={
                  <div className='header__user'>
                    <p className='header__email'>{userInfo.email}</p>
                    <button className='header__logout' onClick={logOut}>Выйти</button>
                  </div>
                }
              /> ) : (
              <Route 
                path="/"
                element={ 
                  isOpenBurgerMenu ? 
                    (
                    <>
                      <button className='header__close-button'>  
                        <img className='header__button-image' src={closeIcon} onClick={onClose} />
                      </button>
                    </>) :
                    (<button className='header__nav-button' onClick={isOpen}>☰</button>)

                }
              />
            )}
          </Routes>
        </header>
      </>
    );
}

export default Header;