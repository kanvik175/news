import React, { useState, useMemo, useEffect } from 'react';

import MainHeader from '../MainHeader/MainHeader';
import About from '../About/About';
import MainContent from '../MainContent/MainContent';
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';
import NetworkError from '../NetworkError/NetworkError';
import NewsApi from '../../utils/NewsApi';

import './Main.css';

function Main({ handleClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(3);

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const localArticles = localStorage.getItem('articles');
    if (localArticles) {
      setArticles(JSON.parse(localArticles));
    }
  }, []);

  async function handleSearch(searchQuery) {
    setIsLoading(true);
    let response;
    try {
      response = await new NewsApi().search(searchQuery);
      setArticles(response.articles);
      localStorage.setItem('articles', JSON.stringify(response.articles));
      setArticlesCount(3);
      if (!response.articles.length) {
        setNotFound(true);
      }
      if (response.articles.length <= 3) {
        setShowButton(false);
      }
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  function increaseArticlesCount() {
    setArticlesCount((prevArticleCount) => prevArticleCount + 3);
    if (articlesCount + 3 >= articles.length) {
      setShowButton(false);
    }
  }

  const visibleArticles = useMemo(() => {
    return articles.slice(0, articlesCount);
  }, [articles, articlesCount]);

  return (
    <>
      <MainHeader handleClick={handleClick} handleSearch={handleSearch} />
      {isLoading ? (
        <Preloader />
      ) : notFound ? (
        <NotFoundNews />
      ) : isError ? (
        <NetworkError />
      ) : articles.length ? (
        <MainContent
          handleMoreButtonClick={increaseArticlesCount}
          articles={visibleArticles}
          showButton={showButton}
        />
      ) : (
        ''
      )}
      <About />
    </>
  );
}

export default Main;
