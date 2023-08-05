import React, { FC } from 'react';
import { togglePlayProps } from './togglePlay.type';
import './togglePlay.scss';
const TogglePlay: FC<togglePlayProps> = ({ handleState }) => {
  return (
    <div className="togglePlay-container">
      <label htmlFor="checkbox" className="togglePlay-label" onClick={handleState}>
        <div className="play_pause_icon play"></div>
      </label>
      <input className="togglePlay-input" type="checkbox" id="checkbox" />
    </div>
  );
};

export default TogglePlay;
