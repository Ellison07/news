import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsList = ({ searchQuery, currentPage, pageSize }) => {
  
  //Hooks
  const [articles, setArticles] = useState([]);
  
  //function
  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery ? searchQuery : '*'}&apiKey=52b603dcce4a4085b26887595775e123&page=${currentPage}&pageSize=${pageSize}`
      );
      setArticles(response.data.articles);
    };
    getArticles();
  }, [searchQuery, currentPage, pageSize]);
  //
  return (
    <div className='news-list'>
      {articles.map((article) => {
        return (
          <NewsItem
            key={article.title}
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
          />
        );
      })}
    </div>
  );
};

export default NewsList;
