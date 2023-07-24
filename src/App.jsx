import React, { useState } from 'react';
import NewsList from './components/NewsList';
import './App.css'; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='App'>
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
      <NewsList searchQuery={searchQuery} />
    </div>
  );
};
export default App;
