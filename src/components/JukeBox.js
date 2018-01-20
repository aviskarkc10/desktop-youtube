import React from 'react';

import PlayList from './PlayList.js';
import YoutubeVideo from './YoutubeVideo.js'

const JukeBox = (props) => {
  const {
    video,
    handlePlay,
    changeVideo,
    currentVideo,
    playListItems,
    handleVideoEnd,
    handleRemoveItem
  } = props;
  
  return (
    <div className="jukebox">
      <YoutubeVideo 
        video={video}
        changeVideo={changeVideo}
        currentVideo={currentVideo} 
        playListItems={playListItems}         
        handleVideoEnd={handleVideoEnd} />       
      <PlayList 
        handlePlay={handlePlay}
        currentVideo={currentVideo}
        playListItems={playListItems}
        handleRemoveItem={handleRemoveItem} />
    </div>
  )
}

export default JukeBox;