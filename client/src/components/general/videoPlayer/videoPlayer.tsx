import React, { FC, useRef, useState } from 'react';
import './videoPlayer.scss';
import { videoPlayerProps } from './videoPlayer.type';
import { controlNextIcon, fullScreenIcon } from '../../../assets/videoPlayer/videoPlayerIcons';
import TogglePlay from '../togglePlay/togglePlay';
import ToggleVolume from '../toggleVolume/toggleVolume';
const VideoPlayer: FC<videoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  return (
    <div className="video-player-wrapper">
      <div className="video-wrapper">
        <video className="video" ref={videoRef} src={src} style={{ width: '100%' }} />
      </div>
      <div className="video-control">
        <div className="video-progress-bar"></div>
        <div className="video-player-controls">
          <div className="player-controls-left">
            <div className="video-player-play">
              <TogglePlay state={isPlaying} handleState={handlePlayPause} />
            </div>
            <div className="video-player-next video-icons">{controlNextIcon}</div>
            <ToggleVolume onVolumeChange={handleVolumeChange} volume={volume} />
            <div className="video-player-time">0:09 / 33:04</div>
          </div>
          <div className="player-controls-right">
            <div className="video-player-fullScreen video-icons">{fullScreenIcon}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
