import React from 'react';
import { Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const ListItem = (props) => {
  const {
    listItem,
    handlePlay,
    playListItems,
    handleAddItem,
    handleRemoveItem
  } = props;
  let filter = [];

  filter = playListItems.length && playListItems.filter(singleItem => (listItem.id.videoId === singleItem.id.videoId));
  
  const isItemInPlayList = filter.length ? true : false;

  return (
    <div className="list-item clearfix">
      <div className="buttons">
        <span className="single-button">
          <OverlayTrigger placement="left" overlay={(<Tooltip id="tooltip">Play this video</Tooltip>)}>
            <Button className="editButton" onClick={() => { handlePlay(listItem) }}>
              <Glyphicon glyph="play" />
            </Button>
          </OverlayTrigger>
        </span>
        <span className="single-button">
          {
            isItemInPlayList ?
              <OverlayTrigger className="single-button" placement="left" overlay={(<Tooltip id="tooltip">Remove from playlist</Tooltip>)}>
                <Button className="editButton" onClick={() => { handleRemoveItem(listItem) }}>
                  <Glyphicon glyph="remove-sign" />
                </Button>
              </OverlayTrigger> :
              <OverlayTrigger className="single-button" placement="left" overlay={(<Tooltip id="tooltip">Push to playlist</Tooltip>)}>
                <Button className="editButton" onClick={() => { handleAddItem(listItem) }}>
                  <Glyphicon glyph="plus" />
                </Button>
              </OverlayTrigger>
          }
        </span>
      </div>
      <div className="thumbnail">
        <img src={listItem.snippet.thumbnails.default.url}></img>
      </div>
      <div className="video-text">
        <span className="video-title">
          {listItem.snippet.title}
        </span>
        <br />
        <span className="video-description">{listItem.snippet.description}</span>
      </div>
    </div>
  )
}

export default ListItem;