import React, { useState } from 'react';

import MainHeader from '../MainHeader/MainHeader';
import About from '../About/About';
import Footer from '../Footer/Footer';
import MainContent from '../MainContent/MainContent';
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';

import './Main.css';

function Main() {
  const [isLoading] = useState(false);
  const [notFound] = useState(false);

  return (
    <>
      <MainHeader />
      {isLoading ? (
        <Preloader />
      ) : notFound ? (
        <NotFoundNews />
      ) : (
        <MainContent />
      )}
      <About />
      <Footer />
    </>
  );
}

export default Main;
