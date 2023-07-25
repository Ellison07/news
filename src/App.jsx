import React, { useState } from 'react';
import NewsList from './components/NewsList';
import './App.css'; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Categories array
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
    // Add other categories here
  ];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    // Set the search query to the selected category
    setSearchQuery(category.toLowerCase());
  };

  return (
    <div className='App'>
      <div className='nav-bar'>
        {/* News Categories */}
        <div className='nav-links'>
          <h1>News Categories</h1>
          <b></b>
          <div className='dropdown'>
            <button className='nav-link'>
              Categories
              <div className='dropdown-content'>
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </button>
          </div>
        </div>
        {/* Search News Bar */}
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
      <NewsList searchQuery={searchQuery} />
    </div>
  );
};

export default App;
