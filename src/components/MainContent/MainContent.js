import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';

import './MainContent.css';

function MainContent({ handleMoreButtonClick, articles, showButton }) {
  console.log(articles);
  return (
    <main className="main-content">
      <div className="side-padding">
        <h2 className="main-content__title">Результаты поиска</h2>
        <NewsCardList
          className="main-content__news-card-list"
          newsList={articles}
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
