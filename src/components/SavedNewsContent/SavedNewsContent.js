import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';
import { savedNewsList } from '../../consts/newsList';

import './SavedNewsContent.css';

function SavedNewsContent({ articles }) {
  return (
    <div className="saved-news-content">
      <div className="side-padding">
        <NewsCardList newsList={articles} saved />
      </div>
    </div>
  );
}

export default SavedNewsContent;
