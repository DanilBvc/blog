import React, { FC } from 'react';
import { studioVideoPreviewProps } from './studioVideoPreview.type';
import { formatVideoLength } from '../../../utils/getDate';
import './studioVideoPreview.scss';
import ExpandableText from '../../general/expandableText/expandableText';
import { Link } from 'react-router-dom';
const StudioVideoPreview: FC<studioVideoPreviewProps> = ({ video }) => {
  const { videoDuration, videoPreviewUrl, description, _id } = video;
  return (
    <div className="video-preview-wrapper">
      <div className="video-preview">
        <Link to={`/video/${_id}`}>
          <div className="video-preview-img">
            <img src={videoPreviewUrl} alt="preview" className="video-preview-img" />
            <div className="video-preview-time">{formatVideoLength(videoDuration)}</div>
            <div className="gray-bg"></div>
          </div>
        </Link>
      </div>
      <div className="video-preview-info">
        <div className="video-preview-title">temp</div>
        <div className="video-preview-description">
          <ExpandableText text={description} length={20} />
        </div>
      </div>
    </div>
  );
};

export default StudioVideoPreview;
