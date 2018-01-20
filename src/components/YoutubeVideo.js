import React, { Component } from 'react';
import * as _ from 'lodash';
import { lifecycle, withHandlers, withState, compose } from 'recompose';

class YoutubeVideo extends Component {
  constructor() {
    super();
    this.state = {
      loadYT: ''
    }
  }

  componentWillReceiveProps() {
    let loadYT = this.state.loadYT;
    if (!this.state.loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      })
    }
    loadYT.then((YT) => {
      this.setState({
        loadYT: loadYT
      });
      const videoId = _.get(this, 'props.currentVideo.id.videoId', '')

      if (videoId) {
        this.player = new YT.Player(this.youtubePlayerAnchor, {
          width: this.props.video.width,
          height: this.props.video.height,
          videoId: videoId,
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange
          }
        })
      }
    })
  }

  onPlayerReady = (event) => {
    event.target.playVideo();
  }

  onPlayerStateChange = (e) => {
    if (e.data === 0 && this.props.playListItems.length) {
      let videoIds = this.props.playListItems.map(video => video.id.videoId);
      e.target.loadPlaylist(videoIds);
      e.target.playVideo();
      this.props.handleVideoEnd();
    }
  }

  render() {
    return (
      <div className="youtube-video" ref={(r) => { this.youtubePlayerAnchor = r }}>
      </div>
    )
  }
}

export default YoutubeVideo;
