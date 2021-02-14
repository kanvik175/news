import React, { useState } from 'react';

import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';

import './App.css';

function App() {
  const [registrationPopupIsOpen, setRegistrationPopupIsOpen] = useState(false);
  const [loginPopupIsOpen, setLoginPopupIsOpen] = useState(false);
  const [infoPopupIsOpen, setInfoPopupIsOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  function closeRegistrationPopup() {
    setRegistrationPopupIsOpen(false);
  }

  function closeLoginPopup() {
    setLoginPopupIsOpen(false);
  }

  function closeInfoPopup() {
    setInfoPopupIsOpen(false);
  }

  function openRegistrationPopup() {
    setRegistrationPopupIsOpen(true);
  }

  function openLoginPopup() {
    setLoginPopupIsOpen(true);
  }

  function openInfoPopup() {
    setInfoPopupIsOpen(true);
  }

  async function handleRegistrationPopupButtonClick(values) {
    const mainApi = new MainApi();
    try {
      const response = await mainApi.signup(
        values.email,
        values.password,
        values.name,
      );
      console.log(response);
      closeRegistrationPopup();
      openInfoPopup();
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleRegistrationPopupLinkClick() {
    closeRegistrationPopup();
    openLoginPopup();
  }

  function handleLoginPopupButtonClick() {
    closeLoginPopup();
  }

  function handleLoginPopupLinkClick() {
    closeLoginPopup();
    openRegistrationPopup();
  }

  function handleInfoPopupLinkClick() {
    closeInfoPopup();
    openLoginPopup();
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/saved-news">
            <SavedNews handleClick={openRegistrationPopup} />
          </Route>
          <Route path="/">
            <Main handleClick={openRegistrationPopup} />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
      <RegistrationPopup
        isOpen={registrationPopupIsOpen}
        handleClose={closeRegistrationPopup}
        handleButtonClick={handleRegistrationPopupButtonClick}
        handleLinkClick={handleRegistrationPopupLinkClick}
      />
      <LoginPopup
        isOpen={loginPopupIsOpen}
        handleClose={closeLoginPopup}
        handleButtonClick={handleLoginPopupButtonClick}
        handleLinkClick={handleLoginPopupLinkClick}
      />
      <InfoPopup
        isOpen={infoPopupIsOpen}
        handleClose={closeInfoPopup}
        handleLinkClick={handleInfoPopupLinkClick}
      />
    </div>
  );
}

export default App;
