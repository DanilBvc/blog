import React, { FC } from 'react';
import { studioVideoPreviewProps } from './studioVideoPreview.type';
import { formatVideoLength } from '../../../utils/getDate';

const StudioVideoPreview: FC<studioVideoPreviewProps> = ({ video }) => {
  const { videoDuration, videoPreviewUrl } = video;
  return (
    <div className="video-preview-wrapper">
      <div className="video-preview">
        <img src={videoPreviewUrl} alt="preview" className="video-preview-img" />
        <div className="video-preview-time">{formatVideoLength(videoDuration)}</div>
      </div>
      <div className="video-preview-info">
        <div className="video-preview-title">temp</div>
      </div>
    </div>
  );
};

export default StudioVideoPreview;
