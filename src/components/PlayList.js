import React from 'react';

import PlaylistItem from './PlaylistItem';

const PlayList = (props) => {
  const {
    handlePlay,
    playListItems,
    handleRemoveItem
  } = props;
  return (
    <div className="playList">
      {
        playListItems && playListItems.map(listItem => {
          return (
            <PlaylistItem
              listItem={listItem}
              handlePlay={handlePlay}
              key={listItem.id.videoId}
              handleRemoveItem={handleRemoveItem} />
          )
        })
      }
    </div>
  )
}

export default PlayList;