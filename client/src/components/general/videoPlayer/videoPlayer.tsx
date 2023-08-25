import React, { FC, useEffect, useRef, useState } from 'react';
import './videoPlayer.scss';
import { videoPlayerProps } from './videoPlayer.type';
import { controlNextIcon, fullScreenIcon } from '../../../assets/videoPlayer/videoPlayerIcons';
import TogglePlay from '../togglePlay/togglePlay';
import ToggleVolume from '../toggleVolume/toggleVolume';
import { formatVideoLength } from '../../../utils/getDate';
import useAnimationFrame from '../../../customHooks/useAnimationFrame';
import ModalError from '../modalError/modalError';
const VideoPlayer: FC<videoPlayerProps> = ({ videoData }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const stopTimer = () => {
    setIsPlaying(false);
  };

  const startTimer = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(true);
  };

  useAnimationFrame((delta) => {
    const time = videoRef.current;
    if (time) {
      setCurrentTime((prevTime) => {
        return (time.currentTime + delta * 0.001) % 100;
      });
      setProgress((prev) => {
        return (time.currentTime + delta * 0.001) % 100;
      });
    }
  }, isPlaying);

  useEffect(() => {
    if (videoData && videoData.videoDuration < currentTime) {
      stopTimer();
    }
  }, [currentTime, videoData]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.setAttribute('crossorigin', 'anonymous');
        videoRef.current.crossOrigin = 'anonymous';
        videoRef.current.play().catch((err) => {
          setError(true);
          setErrorText(String(err));
        });
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
    if (videoRef.current && videoData?.videoDuration) {
      videoRef.current.currentTime =
        (newProgress * videoRef.current.duration) / videoData.videoDuration;
      setProgress(newProgress);
    }
  };

  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
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
                max={videoData.videoDuration}
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
      ) : null}
    </>
  );
};

export default VideoPlayer;
