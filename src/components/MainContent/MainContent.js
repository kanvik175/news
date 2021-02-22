import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';
import MainApi from '../../utils/MainApi';

import './MainContent.css';

function MainContent({ handleMoreButtonClick, articles, showButton, keyword }) {

  const mainApi = new MainApi();

  async function handleButtonClick(data) {
    try {
      await mainApi.saveArticle(data);
      return true;
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <main className="main-content">
      <div className="side-padding">
        <h2 className="main-content__title">Результаты поиска</h2>
        <NewsCardList
          className="main-content__news-card-list"
          newsList={articles}
          handleButtonClick={handleButtonClick}
          keyword={keyword}
        />
        {showButton ? (
          <button
            onClick={handleMoreButtonClick}
            className="main-content__button"
          >
            Показать еще
          </button>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}

export default MainContent;
