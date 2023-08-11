import React, { useRef } from 'react';
import './Search.css';

function Search(props) {
  const searchInput = useRef();

//   const handleSearch = () => {
//     props.eventHandler(searchInput.current.value);
//     props.searchWeather();
//   };

  return (
    <div className="input-container">
      <input
        type="search"
        value={props.searchData}
        className="input-field"
        onChange={() => props.eventHandler(searchInput.current.value)}
        ref={searchInput}
        placeholder="Enter your search"
      />
      {/* <button onClick={handleSearch} className="search-button">
        Search
      </button> */}
    </div>
  );
}

export default Search;
