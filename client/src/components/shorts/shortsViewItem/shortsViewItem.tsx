import React, { FC, useEffect, useRef, useState } from 'react';
import { shortsViewItemProps } from './shortsViewItem.type';
import useAnimationFrame from '../../../customHooks/useAnimationFrame';
import ModalError from '../../general/modalError/modalError';
import './shortsViewItem.scss';
import { vector } from '../../../assets/global';
import ProfilePicture from '../../general/profilePicture/profilePicture';
import { formatVideoLength, getDateFrom } from '../../../utils/getDate';
import { Link } from 'react-router-dom';
import ExpandableText from '../../general/expandableText/expandableText';
import { unauthorizedRequest } from '../../../utils/queries';
import { shortIdUrl } from '../../../utils/network';
import Loading from '../../general/loading/loading';
const ShortsViewItem: FC<shortsViewItemProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [authorData, setAuthorData] = useState<null | { fullName: string; avatarUrl: string }>(
    null
  );
  const [showDescription, setShowDescription] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDescription = async () => {
    setLoading(true);
    try {
      if (!authorData) {
        const author = await unauthorizedRequest(shortIdUrl(video._id), 'GET');
        setAuthorData(author);
      }
      setShowDescription(!showDescription);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  const stopTimer = () => {
    setIsPlaying(false);
  };

  const startTimer = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  useAnimationFrame((delta) => {
    const time = videoRef.current;
    if (time) {
      setCurrentTime((prevTime) => {
        return (time.currentTime + delta * 0.001) % 100;
      });
    }
  }, isPlaying);

  useEffect(() => {
    if (video.videoDuration < currentTime) {
      stopTimer();
    }
  }, [currentTime, video]);

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

  return (
    <>
      <ModalError open={error} close={() => setError(false)} text={errorText} />

      <div className="shorts-container">
        <div className="video-container">
          <Link to={`/video/${video._id}`}>
            <video
              className="video"
              ref={videoRef}
              src={video.videoUrl}
              style={{ width: '100%' }}
              onMouseEnter={handlePlayPause}
              onMouseLeave={handlePlayPause}
              muted
            />
          </Link>

          <div className="video-length">{formatVideoLength(video.videoDuration)}</div>
        </div>
        <div className="short-info">
          <span
            className={`dropDown-header-vector ${showDescription ? 'rotated' : ''}`}
            onClick={handleDescription}
          >
            {vector}
          </span>

          <div className={`description-wrapper ${showDescription ? 'description-active' : ''}`}>
            <Loading loading={loading}>
              <div className="description-wrapper-left">
                <ProfilePicture userId={video.author} userAvatar={authorData?.avatarUrl} />
              </div>
              <div className="description-wrapper-right">
                <div className="description-title">
                  <ExpandableText text={video.title} length={10} />
                </div>
                <div className="description-fullName">{authorData?.fullName}</div>
                <div className="description-additional-info">
                  {video.viewsCount} views · {getDateFrom(new Date(video.updatedAt))}
                </div>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortsViewItem;
