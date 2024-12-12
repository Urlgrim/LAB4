import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ searchQuery, onSearchChange, onSearchSubmit, isSearchVisible, toggleSearchVisibility }) => {
  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className='icon'/>
      <h2>Following | <span> For you </span></h2>
      <FontAwesomeIcon 
        icon={faSearch} 
        className='icon search-icon' 
        onClick={toggleSearchVisibility} 
      />
      {isSearchVisible && (
        <form onSubmit={onSearchSubmit}>
          <input
            type="text"
            placeholder="Search by #"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </form>
      )}
    </div>
  );
};

export default TopNavbar;