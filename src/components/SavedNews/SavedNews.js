import React, { useEffect, useState } from 'react';

import SavedHeader from '../SavedHeader/SavedHeader';
import SavedNewsContent from '../SavedNewsContent/SavedNewsContent';
import MainApi from '../../utils/MainApi';

import './SavedNews.css';

const mainApi = new MainApi();

function SavedNews({ handleSignUp, handleSignOut }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await mainApi.getArticles();
      if (response.articles.length) {
        setArticles(
          response.articles.map((article) => {
            return {
              keyword: article.keyword,
              title: article.title,
              description: article.text,
              publishedAt: article.date,
              source: {
                name: article.source,
              },
              url: article.link,
              urlToImage: article.image,
            };
          }),
        );
      }
    })();
  }, []);

  return (
    <>
      <SavedHeader
        articles={articles}
        handleSignUp={handleSignUp}
        handleSignOut={handleSignOut}
      />
      <SavedNewsContent articles={articles} />
    </>
  );
}

export default SavedNews;
