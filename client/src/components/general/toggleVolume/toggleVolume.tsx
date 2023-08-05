import React, { FC, useEffect, useState } from 'react';
import './toggleVolume.scss';
import { toggleVolumeProps } from './toggleVolume.type';
import { soundIcon } from '../../../assets/videoPlayer/videoPlayerIcons';
const ToggleVolume: FC<toggleVolumeProps> = ({ onVolumeChange, volume }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="toggle-volume-wrapper"
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <div
        className="toggle-volume-icon "
        onMouseEnter={() => {
          setVisible(true);
        }}
      >
        {soundIcon}
      </div>
      <div className={`toggle-volume-value ${visible ? '' : 'hide'}`}>
        <input type="range" className="toggle-volume-input" />
      </div>
    </div>
  );
};

export default ToggleVolume;
