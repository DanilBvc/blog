import React from 'react';
import { disLikeIcon, likeIcon } from '../../../assets/generalIcons/videoIcons';
import './videoViewPanel.scss';
const VideoViewPanel = () => {
  return (
    <div className="videoViewPanel-wrapper">
      <div className="panel-reaction">
        <div className="panel-reaction-like">{likeIcon}</div>
        <div className="panel-reaction-line"></div>
        <div className="panel-reaction-dislike">{disLikeIcon}</div>
      </div>
    </div>
  );
};

export default VideoViewPanel;
