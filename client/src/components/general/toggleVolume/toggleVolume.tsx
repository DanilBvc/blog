import React, { FC, useEffect, useState } from 'react';
import './toggleVolume.scss';
import { toggleVolumeProps } from './toggleVolume.type';
import { soundIcon } from '../../../assets/videoPlayer/videoPlayerIcons';
const ToggleVolume: FC<toggleVolumeProps> = ({ onVolumeChange, volume }) => {
  const [visible, setVisible] = useState(false);
  const [isMute, setIsMute] = useState(false);
  useEffect(() => {
    if (volume === 0) {
      setIsMute(true);
    }
    if (isMute) {
      setIsMute(false);
    }
  }, [volume]);

  const handleVolume = () => {
    if (volume === 0) {
      onVolumeChange('100');
    } else {
      onVolumeChange('0');
    }
  };

  return (
    <div
      className={`toggle-volume-wrapper ${visible ? '' : 'hide-volume-wrapper'}`}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <div
        className={`toggle-volume-icon ${isMute ? 'mute' : ''}`}
        onMouseEnter={() => {
          setVisible(true);
        }}
        onClick={handleVolume}
      >
        {soundIcon}
      </div>
      <div className={`toggle-volume-value ${visible ? '' : 'hide'}`}>
        <input
          type="range"
          value={volume}
          onChange={(e) => {
            onVolumeChange(e.currentTarget.value);
          }}
          className="toggle-volume-input"
        />
      </div>
    </div>
  );
};

export default ToggleVolume;
