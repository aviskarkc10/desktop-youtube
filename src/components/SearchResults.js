import React from 'react';

import ListItem from './ListItem.js';

const SearchResults = (props) => {
  const {
    handlePlay,
    handleAddItem,
    searchResults,
    playListItems,
    handleRemoveItem
  } = props

  return (
    <div>
      {
        searchResults && searchResults.map((listItem, index) => {
          return (
            <ListItem
              key={index}
              listItem={listItem}
              handlePlay={handlePlay}
              playListItems={playListItems}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem} />
          )
        })
      }
    </div>
  )
}

export default SearchResults;