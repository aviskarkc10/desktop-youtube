import React from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = (props) => {
  const {
    handlePlay,
    handleSubmit,
    handleAddItem,
    searchResults,
    playListItems,
    handleRemoveItem
  } = props;

  return (
    <div className="search">
      <SearchBar handleSubmit={handleSubmit} />
      <SearchResults 
        handlePlay={handlePlay}
        searchResults={searchResults}
        handleAddItem={handleAddItem} 
        playListItems={playListItems}
        handleRemoveItem={handleRemoveItem} />
    </div>
  )
}

export default Search;