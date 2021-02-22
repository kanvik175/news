import React, { useContext } from 'react';

import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SavedHeader.css';

function SavedHeader({ handleSignOut, handleSignUp, articles }) {
  const currentUser = useContext(CurrentUserContext);

  const articlesCount = articles.length;

  const countKeywords = () => {
    if (!articles.length) {
      return '';
    }
    const keywords = articles.map((article) => article.keyword);
    const keywordsCountList = keywords.reduce((finalList, keyword) => {
      const index = finalList.findIndex(
        (item) => item.name.toLowerCase() === keyword.toLowerCase(),
      );
      if (index === -1) {
        finalList.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          count: 1,
        });
      } else {
        finalList[index].count += 1;
      }
      return finalList;
    }, []);

    const sortedKeywordsCountList = keywordsCountList.sort((a, b) => {
      return b.count - a.count;
    });

    let result;
    console.log(sortedKeywordsCountList);
    if (sortedKeywordsCountList.length < 4) {
      result = (
        <>
          {' '}
          {sortedKeywordsCountList.slice(0, -1).map((keyword) => (
            <span className="saved-header__keyword_bold">{keyword.name}</span>
          ))}{' '}
          и{' '}
          <span className="saved-header__keyword_bold">
            {sortedKeywordsCountList.slice(-1)[0].name}
          </span>
        </>
      );
    } else {
      result = (
        <>
          {' '}
          {sortedKeywordsCountList.slice(0, 2).map((keyword) => (
            <>
              <span className="saved-header__keyword_bold">{keyword.name}</span>{' '}
            </>
          ))}{' '}
          и{' '}
          <span className="saved-header__keyword_bold">
            {sortedKeywordsCountList.length - 2}-ум другим
          </span>
        </>
      );
    }

    return result;
  };

  console.log(countKeywords());

  return (
    <div className="saved-header">
      <Navigation
        isDark
        isLoggedIn
        handleSignOut={handleSignOut}
        handleSignUp={handleSignUp}
      />
      <div className="saved-header__info side-padding">
        <h4 className="saved-header__breadcrumb">Сохраненные статьи</h4>
        <h1 className="saved-header__title">
          {currentUser ? currentUser.name : ''}, у вас {articlesCount}{' '}
          сохраненных статей
        </h1>
        <p className="saved-header__keywords">
          По ключевым словам:
          {articles.length ? countKeywords() : ''}
        </p>
      </div>
    </div>
  );
}

export default SavedHeader;
