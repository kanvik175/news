import React from 'react';

import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

import './MainHeader.css';

function MainHeader() {
  return (
    <header className='main-header'>
      <Navigation isLoggedIn />
      <div className='main-header__content-container'>
        <div className='main-header__content'>
          <div className='main-header__title-group'>
            <h1 className='main-header__title'>Что творится в мире?</h1>
            <h3 className='main-header__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h3>
          </div>
          <SearchForm />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;