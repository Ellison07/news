import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const categories = [
    'All',
    'Politics',
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

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'in', name: 'India' },
    { code: 'au', name: 'Australia' },
    { code: 'br', name: 'Brazil' },
    { code: 'cn', name: 'China' },
    // Add more countries as needed
  ];

  const handleCategorySelect = (selectedItem) => {
    // Check if the selected item is a country or a category
    if (categories.includes(selectedItem)) {
      setSearchQuery(selectedItem.toLowerCase());
    } else {
      setSelectedCountry(selectedItem.toLowerCase());
    }
    setCurrentPage(1); // Reset to the first page when category or country is selected
  };

  const fetchNewsByCountry = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=52b603dcce4a4085b26887595775e123`
      );
      const totalArticles = response.data.totalResults;
      setTotalPages(Math.ceil(totalArticles / pageSize));
    } catch (error) {
      console.error('Error fetching news by country:', error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchNewsByCountry();
    } else {
      const getTotalArticles = async () => {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${searchQuery ? searchQuery : '*'}&apiKey=52b603dcce4a4085b26887595775e123`
        );
        const totalArticles = response.data.totalResults;
        setTotalPages(Math.ceil(totalArticles / pageSize));
      };
      getTotalArticles();
    }
  }, [searchQuery, selectedCountry, pageSize]);

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
          <div className='dropdown'>
            <button className='nav-link'>
              Countries
              <div className='dropdown-content'>
                {countries.map((country) => (
                  <a key={country.code} onClick={() => handleCategorySelect(country.code)}>
                    {country.name}
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
      <NewsList
        searchQuery={selectedCountry || searchQuery}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      <div className='page'>
        <button className='pagination' onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className='pagination' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
