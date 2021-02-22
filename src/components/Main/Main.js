import React, { useState, useMemo, useEffect } from 'react';

import MainHeader from '../MainHeader/MainHeader';
import About from '../About/About';
import MainContent from '../MainContent/MainContent';
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';
import NetworkError from '../NetworkError/NetworkError';
import NewsApi from '../../utils/NewsApi';

import './Main.css';

function Main({ handleSignUp, handleSignOut }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(3);
  const [keyword, setKeyword] = useState('');

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const localArticles = localStorage.getItem('articles');
    if (localArticles) {
      const localArticlesObj = JSON.parse(localArticles);
      setArticles(localArticlesObj.articles);
      setKeyword(localArticlesObj.keyword)
    }
  }, []);

  async function handleSearch(searchQuery) {
    setIsLoading(true);
    setNotFound(false);
    setShowButton(true);
    let response;
    try {
      response = await new NewsApi().search(searchQuery);
      setArticles(response.articles);
      setKeyword(searchQuery);
      localStorage.setItem('articles', JSON.stringify({
        keyword: searchQuery,
        articles: response.articles
      }));
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
      <MainHeader handleSignUp={handleSignUp} handleSignOut={handleSignOut} handleSearch={handleSearch} />
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
          keyword={keyword}
        />
      ) : (
        ''
      )}
      <About />
    </>
  );
}

export default Main;
