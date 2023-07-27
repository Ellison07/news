import React from 'react';
import './NewsItem.css';

// display the content of news
//passing data by props newsList
const NewsItem = ({ title, description, url, urlToImage }) => {
  //This attribute tells the browser to open the linked URL in a new tab
  //This attribute tells the browser to open the linked URL 
  //This relationship instructs the browser that the newly opened page should not have access to the window.opener property.
  // This relationship prevents the browser from sending the Referer header to the new page.
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
