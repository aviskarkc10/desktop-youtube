import React from 'react';
import { Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const PLaylistItem = (props) => {
  const {
    listItem,
    handlePlay,
    handleRemoveItem
  } = props;

  return (
    <div className="playlist-item clearfix">
      <div className="buttons">
        <span className="single-button">
          <OverlayTrigger placement="left" overlay={(<Tooltip id="tooltip">Play this video</Tooltip>)}>
            <Button className="editButton" onClick={() => handlePlay(listItem)}>
              <Glyphicon glyph="play" />
            </Button>
          </OverlayTrigger>
        </span>
        <span className="single-button">
          <OverlayTrigger className="single-button" placement="left" overlay={(<Tooltip id="tooltip">Push to stack</Tooltip>)}>
            <Button className="editButton" onClick={() => handleRemoveItem(listItem)}>
              <Glyphicon glyph="remove-sign" />
            </Button>
          </OverlayTrigger>
        </span>
      </div>
      <div className="thumbnail">
        <img src={listItem.snippet.thumbnails.default.url}></img>
      </div>
      <div className="playlist-video-text">
        <span className="video-title">
          {listItem.snippet.title}
        </span><br />
        <span className="video-description">{listItem.snippet.description}</span>
        <br />
      </div>
    </div>
  )
}

export default PLaylistItem;