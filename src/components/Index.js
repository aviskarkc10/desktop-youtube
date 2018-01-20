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

      if (index != -1) {
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
      // let data = {
      //   "kind": "youtube#searchListResponse",
      //   "etag": "\"S8kisgyDEblalhHF9ooXPiFFrkc/5PkH-zgSu0mkGjvHXJNK1pAgtJ8\"",
      //   "nextPageToken": "CAIQAA",
      //   "regionCode": "NP",
      //   "pageInfo": {
      //     "totalResults": 1000000,
      //     "resultsPerPage": 2
      //   },
      //   "items": [
      //     {
      //       "kind": "youtube#searchResult",
      //       "etag": "\"S8kisgyDEblalhHF9ooXPiFFrkc/fhQLCw6vEkN5Rl2r_5yzjsGdufM\"",
      //       "id": {
      //         "kind": "youtube#video",
      //         "videoId": "b6hoBp7Hk-A"
      //       },
      //       "snippet": {
      //         "publishedAt": "2015-02-03T20:00:01.000Z",
      //         "channelId": "UCblfuW_4rakIf2h6aqANefA",
      //         "title": "The Beautiful Chaos of Surfing Pipeline",
      //         "description": "Pipeline is the Yankee Stadium, center court at Wimbledon, and the Melbourne Cricket Ground of surfing. Surfers grow up on the myths of the hallowed reef break, and magazines write biblical...",
      //         "thumbnails": {
      //           "default": {
      //             "url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/default.jpg",
      //             "width": 120,
      //             "height": 90
      //           },
      //           "medium": {
      //             "url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/mqdefault.jpg",
      //             "width": 320,
      //             "height": 180
      //           },
      //           "high": {
      //             "url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/hqdefault.jpg",
      //             "width": 480,
      //             "height": 360
      //           }
      //         },
      //         "channelTitle": "Red Bull",
      //         "liveBroadcastContent": "none"
      //       }
      //     },
      //     {
      //       "kind": "youtube#searchResult",
      //       "etag": "\"S8kisgyDEblalhHF9ooXPiFFrkc/pRYklAvmlOoF4nxm0MmxZEttNVk\"",
      //       "id": {
      //         "kind": "youtube#video",
      //         "videoId": "fNr8kqSLpxQ"
      //       },
      //       "snippet": {
      //         "publishedAt": "2014-11-12T18:00:17.000Z",
      //         "channelId": "UC3Yc0vyFkYXB1_njh3uj7yw",
      //         "title": "World's best surfing 2014/2015 (HD)",
      //         "description": "Subscribe: http://bit.ly/SUBICTV Submit a Video : http://bit.ly/T1RsJh Facebook: https://www.facebook.com/Icompilationtv Follow us on Twitter - https://twitter.com/IcompilationTV Like our...",
      //         "thumbnails": {
      //           "default": {
      //             "url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/default.jpg",
      //             "width": 120,
      //             "height": 90
      //           },
      //           "medium": {
      //             "url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/mqdefault.jpg",
      //             "width": 320,
      //             "height": 180
      //           },
      //           "high": {
      //             "url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/hqdefault.jpg",
      //             "width": 480,
      //             "height": 360
      //           }
      //         },
      //         "channelTitle": "IcompilationTV",
      //         "liveBroadcastContent": "none"
      //       }
      //     }
      //   ]
      // }
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.updateVideo(this.props.video);
    }
  }),
)(Index);