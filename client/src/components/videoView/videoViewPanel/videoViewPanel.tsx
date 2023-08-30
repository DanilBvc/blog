import React, { FC, useEffect, useState } from 'react';
import { disLikeIcon, likeIcon } from '../../../assets/generalIcons/videoIcons';
import './videoViewPanel.scss';
import { downloadIcon, shareIcon } from '../../../assets/global';
import { videoViewPanelProps } from './videoViewPanel.type';
import BlockWrapper from '../../general/blockWrapper/blockWrapper';
import SuccessModal from '../../general/successModal/successModal';
import { useLocation } from 'react-router-dom';
import { baseClientUrl, videoByIdUrl } from '../../../utils/network';
import { useAppSelector } from '../../../store/hooks/redux';
import { authorizedRequest } from '../../../utils/queries';
import ModalError from '../../general/modalError/modalError';
const VideoViewPanel: FC<videoViewPanelProps> = ({ videoData, updateReaction }) => {
  const [copyModal, setCopyModal] = useState(false);
  const [copyModalText, setCopyModalText] = useState('');
  const [userReaction, setUserReaction] = useState({
    like: false,
    dislike: false,
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const location = useLocation();
  const userData = useAppSelector((state) => state.userDataReducer);
  const { like, dislike } = videoData;

  const copyVideoLink = () => {
    navigator.clipboard.writeText(`${baseClientUrl}${location.pathname}`);
    setCopyModal(true);
    setCopyModalText(`${baseClientUrl}${location.pathname}`);
  };

  const likeDislikeVideo = async (like: boolean, dislike: boolean) => {
    try {
      setUserReaction({ like, dislike });
      const updVideoData: { like: number; dislike: number } = await authorizedRequest(
        videoByIdUrl(videoData._id),
        'POST',
        'token',
        {
          like,
          dislike,
        }
      );
      updateReaction(updVideoData.like, updVideoData.dislike);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  useEffect(() => {
    if (userData) {
      setUserReaction({
        like: userData.like.includes(videoData._id),
        dislike: userData.dislike.includes(videoData._id),
      });
    }
  }, [userData, videoData._id]);

  return (
    <>
      <SuccessModal
        open={copyModal}
        close={() => {
          setCopyModal(false);
        }}
        title={'Your message has been copied successfully.'}
        data={copyModalText}
      />
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <div className="videoViewPanel-wrapper">
        <div className="panel panel-reaction">
          <BlockWrapper
            additionalClass={`panel-icon panel-reaction-like ${
              userReaction.like ? 'reaction-active' : ''
            }`}
            onClick={() => {
              likeDislikeVideo(true, false);
            }}
          >
            {likeIcon}
            {like}
          </BlockWrapper>
          <BlockWrapper
            additionalClass={`panel-icon panel-reaction-dislike ${
              userReaction.dislike ? 'reaction-active' : ''
            }`}
            onClick={() => {
              likeDislikeVideo(false, true);
            }}
          >
            {dislike}
            {disLikeIcon}
          </BlockWrapper>
        </div>
        <BlockWrapper additionalClass="panel" onClick={copyVideoLink}>
          <div className="panel-icon">{shareIcon}</div>
          <div className="panel-title">share</div>
        </BlockWrapper>
        <BlockWrapper additionalClass="panel">
          <a className="panel" href={videoData.videoUrl}>
            <div className="panel-icon">{downloadIcon}</div>
            <div className="panel-title">download</div>
          </a>
        </BlockWrapper>
      </div>
    </>
  );
};

export default VideoViewPanel;
