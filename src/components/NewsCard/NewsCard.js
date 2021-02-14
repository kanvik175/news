import React from 'react';

import DateUtil from '../../utils/DateUtil';

import './NewsCard.css';

function NewsCard({ newsCard, saved }) {
  const handleClick = (event) => {
    if (!event.target.matches('.news-card__button')) {
      const url = event.currentTarget.dataset.url;
      window.open(url, '_blank');
    }
  };

  return (
    <div onClick={handleClick} data-url={newsCard.url} className="news-card">
      <div className="news-card__image-container">
        <img className="news-card__image" src={newsCard.urlToImage} alt="pix" />
        <div className="news-card__button-wrapper">
          <div
            className={`news-card__tag ${saved ? 'news-card__tag_show' : ''}`}
          >
            {newsCard.tag}
          </div>
          <div className="news-card__image-actions">
            <button
              className={`news-card__button ${
                saved
                  ? 'news-card__button_type_trash'
                  : 'news-card__button_type_bookmark'
              } ${newsCard.saved ? 'news-card__button_checked' : ''}`}
            ></button>
            <div className="news-card__button-tooltip news-card__button-tooltip_type_bookmark">
              {saved
                ? 'Убрать из сохраненных'
                : 'Войдите, чтобы сохранять статьи'}
            </div>
          </div>
        </div>
      </div>
      <div className="news-card__info">
        <div className="news-card__content">
          <div className="news-card__date">
            {DateUtil.wordFormatDate(
              new Date(Date.parse(newsCard.publishedAt)),
            )}
          </div>
          <div className="news-card__title">{newsCard.title}</div>
          <div className="news-card__text">{newsCard.description}</div>
        </div>
        <div className="news-card__source">{newsCard.source.name}</div>
      </div>
    </div>
  );
}

export default NewsCard;
