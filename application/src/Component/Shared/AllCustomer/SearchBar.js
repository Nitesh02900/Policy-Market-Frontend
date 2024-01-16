import React from 'react';

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by username"
      value={searchTerm}
      onChange={onChange}
    />
  );
};

export default SearchBar;
