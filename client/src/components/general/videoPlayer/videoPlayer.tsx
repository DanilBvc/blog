import React, { FC, useEffect, useRef, useState } from 'react';
import './videoPlayer.scss';
import { videoPlayerProps } from './videoPlayer.type';
import { controlNextIcon, fullScreenIcon } from '../../../assets/videoPlayer/videoPlayerIcons';
import TogglePlay from '../togglePlay/togglePlay';
import ToggleVolume from '../toggleVolume/toggleVolume';
import { formatVideoLength } from '../../../utils/getDate';
const VideoPlayer: FC<videoPlayerProps> = ({ videoData }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stopTimer = (interval: NodeJS.Timeout) => {
    clearInterval(interval);
    setTimer(null);
    setProgress(0);
    setCurrentTime(0);
  };

  const startTimer = () => {
    if (!timer) {
      const newTimer = setInterval(() => {
        const current = videoRef.current;
        if (current) {
          const time = current.currentTime;
          setCurrentTime(time);
          setProgress((time / current.duration) * 100);
          if (videoData && time >= videoData.videoDuration) {
            setIsPlaying(false);
            stopTimer(newTimer);
          }
        }
      }, 1000);
      setTimer(newTimer);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        startTimer();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleVolumeChange = (value: string) => {
    const newVolume = parseFloat(value);
    setVolume(newVolume);
    if (videoRef.current) {
      if (newVolume !== 100) {
        videoRef.current.volume = newVolume / 100;
      } else {
        videoRef.current.volume = 1;
      }
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress * videoRef.current.duration) / 100;
      setProgress(newProgress);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        const current = videoRef.current;
        if (current) {
          setCurrentTime(current.currentTime);
        }
      };
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);
  return (
    <>
      {videoData ? (
        <div className="video-player-wrapper">
          <div className="video-wrapper">
            <video
              className="video"
              ref={videoRef}
              src={videoData.videoUrl}
              style={{ width: '100%' }}
              onClick={handlePlayPause}
            />
          </div>
          <div className="video-control">
            <div className="video-progress-bar">
              <input
                type="range"
                value={progress}
                step="0.01"
                onChange={handleProgressChange}
                style={{ width: '100%' }}
              />
            </div>
            <div className="video-player-controls">
              <div className="player-controls-left">
                <div className="video-player-play">
                  <TogglePlay state={isPlaying} handleState={handlePlayPause} />
                </div>
                <div className="video-player-next video-icons">{controlNextIcon}</div>
                <ToggleVolume onVolumeChange={handleVolumeChange} volume={volume} />
                <div className="video-player-time">
                  {formatVideoLength(currentTime)} / {formatVideoLength(videoData.videoDuration)}
                </div>
              </div>
              <div className="player-controls-right">
                <div className="video-player-fullScreen video-icons" onClick={handleFullScreen}>
                  {fullScreenIcon}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Video not found</div>
      )}
    </>
  );
};

export default VideoPlayer;
