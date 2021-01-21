import React from 'react';

import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({ newsList }) {
  return (
    <div className="news-card-list">
      {newsList.map((newsCard) => (
        <NewsCard key={newsCard.id} newsCard={newsCard} />
      ))}
    </div>
  );
}

export default NewsCardList;
