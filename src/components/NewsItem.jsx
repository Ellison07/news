import React from 'react';
import './NewsItem.css';

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div className='news-item'>
      <img className='news-img' src={urlToImage} alt={title} />
      <h3>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default NewsItem;
