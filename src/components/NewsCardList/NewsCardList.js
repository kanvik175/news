import React from 'react';

import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({ newsList, className = '', saved = false }) {
  return (
    <div className={`news-card-list ${className}`}>
      {newsList.map((newsCard, index) => (
        <NewsCard key={index} newsCard={newsCard} saved={false} />
      ))}
    </div>
  );
}

export default NewsCardList;
