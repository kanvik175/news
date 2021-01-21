import React from 'react';

import './NewsCard.css';

function NewsCard({ newsCard }) {
  return (
    <a href={newsCard.url} className="news-card">
      <div
        className="news-card__image"
        style={{ backgroundImage: `url(${newsCard.image})` }}
      >
        <div className="news-card__button-wrapper">
          <div className="news-card__tag"></div>
          <div className="news-card__image-actions">
            <button className="news-card__button news-card__button_type_bookmark"></button>
            <div className="news-card__button-tooltip news-card__button-tooltip_type_bookmark">
              Войдите, чтобы сохранять статьи
            </div>
          </div>
        </div>
      </div>
      <div className="news-card__info">
        <div className="news-card__content">
          <div className="news-card__date">{newsCard.date}</div>
          <div className="news-card__title">{newsCard.title}</div>
          <div className="news-card__text">{newsCard.text}</div>
        </div>
        <a
          target="_blank"
          rel="noreferrer"
          href={newsCard.sourceUrl}
          className="news-card__source"
        >
          {newsCard.source}
        </a>
      </div>
    </a>
  );
}

export default NewsCard;
