import React from 'react';

import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({
  newsList,
  className = '',
  saved = false,
  handleButtonClick,
  keyword,
}) {
  return (
    <div className={`news-card-list ${className}`}>
      {newsList.map((newsCard, index) => (
        <NewsCard
          key={index}
          newsCard={newsCard}
          saved={saved}
          handleClick={handleButtonClick}
          keyword={keyword}
        />
      ))}
    </div>
  );
}

export default NewsCardList;
