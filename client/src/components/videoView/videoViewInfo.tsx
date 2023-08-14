import React, { FC, useEffect, useState } from 'react';
import { videoViewInfoProps } from './videoViewInfo.type';
import Heading from '../general/title/heading';
import ProfilePicture from '../general/profilePicture/profilePicture';
import { useAppSelector } from '../../store/hooks/redux';
import { unauthorizedRequest } from '../../utils/queries';
import { userById } from '../../utils/network';
import { whoAmIResponseType } from '../../generallType/generallType';
import './videoViewInfo.scss';
import { socket } from '../../socket';
import VideoViewPanel from './videoViewPanel/videoViewPanel';
const VideoViewInfo: FC<videoViewInfoProps> = ({ videoData }) => {
  const [authorData, setAuthorData] = useState<whoAmIResponseType | null>(null);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const getAuthorAvatar = async () => {
    if (videoData && videoData.author !== currentUserData?._id) {
      const response: whoAmIResponseType = await unauthorizedRequest(
        userById(videoData.author),
        'GET'
      );
      setAuthorData(response);
    } else {
      if (currentUserData) {
        setAuthorData(currentUserData);
      }
    }
  };

  useEffect(() => {
    getAuthorAvatar();
  }, [videoData]);

  useEffect(() => {
    socket.on('online', (data) => {
      setIsUserOnline(data.includes(videoData?.author));
    });
  }, [currentUserData, videoData?.author]);

  return (
    <>
      {videoData ? (
        <div className="videoViewInfo-wrapper">
          <Heading text={videoData.title} additionalClass="videoViewInfo-title" />
          <div className="author-data-wrapper">
            <div className="author-data">
              <ProfilePicture userId={videoData.author} userAvatar={authorData?.avatarUrl} />
              <div className="author-data-additional">
                <div className="author-data-fullName">{authorData?.fullName}</div>
                <div className="author-data-status">{isUserOnline ? 'Online' : 'Offline'}</div>
              </div>
            </div>
            <div className="author-data-controls">
              <VideoViewPanel />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoViewInfo;
