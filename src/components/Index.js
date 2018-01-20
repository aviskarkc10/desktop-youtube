import React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';

import JukeBox from './JukeBox';
import Search from './Search.js';

import config from '../config.js';
import * as youtubeService from '../services/youtubeService';

const Index = (props) => {
  const {
    handlePlay,
    changeVideo,
    handleSubmit,
    currentVideo,
    handleAddItem,
    searchResults,
    playListItems,
    handleVideoEnd,
    handleRemoveItem
  } = props;
  const {
    video
  } = config;

  return (
    <div>
      <Search
        handlePlay={handlePlay}
        handleSubmit={handleSubmit}
        handleAddItem={handleAddItem}
        playListItems={playListItems}
        searchResults={searchResults.items}
        handleRemoveItem={handleRemoveItem} />
      <JukeBox
        video={video}
        handlePlay={handlePlay}
        changeVideo={changeVideo}
        currentVideo={currentVideo}
        playListItems={playListItems}
        handleVideoEnd={handleVideoEnd}
        handleRemoveItem={handleRemoveItem} />
    </div>
  )
}

export default compose(
  withState('video', 'updateVideo', {}),
  withState('player', 'updatePlayer', ''),
  withState('currentVideo', 'updateCurrentVideo', {}),
  withState('searchResults', 'updateSearchResults', {}),
  withState('playListItems', 'updatePlayListItems', []),
  withHandlers({
    handlePlay: ({ playListItems, updatePlayListItems, updateCurrentVideo, currentVideo, updateChangeVideo }) => item => {
      currentVideo = item;
      updateCurrentVideo(currentVideo);
      const index = playListItems.indexOf(item);

      if (index !== -1) {
        playListItems.splice(index, 1);
        updatePlayListItems(playListItems);
      }
    },
    handleAddItem: ({ playListItems, updatePlayListItems }) => item => {
      playListItems.push(item);
      updatePlayListItems(playListItems);
    },
    handleRemoveItem: ({ playListItems, updatePlayListItems }) => item => {
      const index = playListItems.indexOf(item);
      playListItems.splice(index, 1);
      updatePlayListItems(playListItems);
    },
    handleVideoEnd: ({ playListItems, updatePlayListItems, updateCurrentVideo }) => e => {
      const video = playListItems[0];
      playListItems.splice(0, 1);
      updateCurrentVideo(video);
      updatePlayListItems(playListItems);
    },
    handleSubmit: ({ updateSearchResults }) => (e, query) => {
      e.preventDefault();
      youtubeService.search(query)
        .then((response) => {
          let data = response;
          updateSearchResults(data);
        });
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.updateVideo(this.props.video);
    }
  }),
)(Index);