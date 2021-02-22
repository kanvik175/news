import React, { useState, useCallback, useEffect } from 'react';

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

const mainApi = new MainApi();

function App() {
  const [registrationPopupIsOpen, setRegistrationPopupIsOpen] = useState(false);
  const [loginPopupIsOpen, setLoginPopupIsOpen] = useState(false);
  const [infoPopupIsOpen, setInfoPopupIsOpen] = useState(false);

  const [registrationErrorText, setRegistrationErrorText] = useState('');
  const [loginErrorText, setLoginErrorText] = useState('');

  const [currentUser, setCurrentUser] = useState();

  const getUserInfo = useCallback(async () => {
    const userInfo = await mainApi.getInfo();
    setCurrentUser(userInfo)
  }, [setCurrentUser]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => await getUserInfo())();
    }
  }, [getUserInfo])

  function handleSignOut() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

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
    try {
      await mainApi.signup(values.email, values.password, values.name);
      closeRegistrationPopup();
      openInfoPopup();
    } catch (error) {
      console.log(error.message);
      const errorMessage =
        error.message === '400'
          ? 'Данные заполнены неверно'
          : 'Ошибка регистрации';
      console.log(errorMessage);
      setRegistrationErrorText(errorMessage);
    }
  }

  const clearRegistrationErrorText = useCallback(() => {
    setRegistrationErrorText('');
  }, []);

  function handleRegistrationPopupLinkClick() {
    closeRegistrationPopup();
    openLoginPopup();
  }
  

  async function handleLoginPopupButtonClick(values) {
    try {
      const response = await mainApi.signin(values.email, values.password);
      localStorage.setItem('token', response.jwt);
      await getUserInfo();
      closeLoginPopup();
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        case '400':
          errorMessage = 'Данные заполнены неверно';
          break;
        case '404':
          errorMessage = 'Пользователя не существует';
          break;
        default:
          errorMessage = 'Ошибка авторизации';
      }
      setLoginErrorText(errorMessage);
    }
  }

  const clearLoginErrorText = () => {
    setLoginErrorText('');
  };

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
            <SavedNews handleSignOut={handleSignOut} handleSignUp={openRegistrationPopup} />
          </Route>
          <Route path="/">
            <Main handleSignUp={openRegistrationPopup} handleSignOut={handleSignOut} />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
      <RegistrationPopup
        isOpen={registrationPopupIsOpen}
        handleClose={closeRegistrationPopup}
        handleButtonClick={handleRegistrationPopupButtonClick}
        handleLinkClick={handleRegistrationPopupLinkClick}
        errorText={registrationErrorText}
        clearErrorText={clearRegistrationErrorText}
      />
      <LoginPopup
        isOpen={loginPopupIsOpen}
        handleClose={closeLoginPopup}
        handleButtonClick={handleLoginPopupButtonClick}
        handleLinkClick={handleLoginPopupLinkClick}
        errorText={loginErrorText}
        clearErrorText={clearLoginErrorText}
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
