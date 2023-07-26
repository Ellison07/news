import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };
  // Categories array (same as before)
  const categories = [
    'All',
    'Politics', // Adding 'All' as a category to show all news
    'Business',
    'Technology',
    'Science',
    'Sports',
    'Health',
    'Entertainment',
    'Environment',
    'International',
    'Education',
    'Travel',
    'Lifestyle',
    'War',
    // ...
  ];
  // Function to handle category selection (same as before)
  const handleCategorySelect = (category) => {
    setSearchQuery(category.toLowerCase());
    setCurrentPage(1); // Reset to the first page when category is selected
  };

  useEffect(() => {
    // Fetch the total number of articles for pagination
    const getTotalArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery ? searchQuery : '*'}&apiKey=196eb9811b764a98a977b8209fcd1054`
      );
      const totalArticles = response.data.totalResults;
      setTotalPages(Math.ceil(totalArticles / pageSize));
    };
    getTotalArticles();
  }, [searchQuery, pageSize]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='App'>
      <div className='nav-bar'>
        <div className='nav-links'>
          <h1>News Categories</h1>
          <b></b>
          <div className='dropdown'>
            <button className='nav-link'>
              Categories
              <div className='dropdown-content'>
                {categories.map((category, index) => (
                  <a key={index} onClick={() => handleCategorySelect(category)}>
                    {category}
                  </a>
                ))}
              </div>
            </button>
          </div>
        </div>
        <div className='search-container'>
          <h1>Search news</h1>
          <input
            className='search'
            type='text'
            placeholder='Search News'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <NewsList searchQuery={searchQuery} currentPage={currentPage} pageSize={pageSize} />
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
