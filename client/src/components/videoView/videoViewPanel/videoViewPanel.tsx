import React, { FC } from 'react';
import { disLikeIcon, likeIcon } from '../../../assets/generalIcons/videoIcons';
import './videoViewPanel.scss';
import { downloadIcon, shareIcon } from '../../../assets/global';
import { videoViewPanelProps } from './videoViewPanel.type';
import BlockWrapper from '../../general/blockWrapper/blockWrapper';
const VideoViewPanel: FC<videoViewPanelProps> = ({ videoData }) => {
  const { like, dislike } = videoData;
  return (
    <div className="videoViewPanel-wrapper">
      <div className="panel panel-reaction">
        <BlockWrapper additionalClass="panel-icon panel-reaction-like">
          {likeIcon}
          {like}
        </BlockWrapper>
        <BlockWrapper additionalClass="panel-icon panel-reaction-dislike">
          {dislike}
          {disLikeIcon}
        </BlockWrapper>
      </div>
      <BlockWrapper additionalClass="panel">
        <div className="panel-icon">{shareIcon}</div>
        <div className="panel-title">share</div>
      </BlockWrapper>
      <BlockWrapper additionalClass="panel">
        <div className="panel-icon">{downloadIcon}</div>
        <div className="panel-title">download</div>
      </BlockWrapper>
    </div>
  );
};

export default VideoViewPanel;
