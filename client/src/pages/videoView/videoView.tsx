import React, { FC, useEffect, useState } from 'react';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import VideoPlayer from '../../components/general/videoPlayer/videoPlayer';
import { useLocation } from 'react-router-dom';
import { unauthorizedRequest } from '../../utils/queries';
import { videoByIdUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import { videoResponse } from '../../generallType/generallType';

const VideoView: FC = () => {
  const [videoData, setVideoData] = useState<videoResponse | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const location = useLocation();
  const getVideoData = async () => {
    const parts = location.pathname.split('/');
    const id = parts[parts.length - 1];
    try {
      const data = await unauthorizedRequest(videoByIdUrl(id), 'GET');
      console.log(data);
      setVideoData(data);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };
  useEffect(() => {
    getVideoData();
  }, [location.pathname]);
  return (
    <ChatBaseLayout>
      <div>
        <ModalError
          open={error}
          close={() => {
            setError(false);
          }}
          text={errorText}
        />
        <VideoPlayer videoData={videoData} />
      </div>
    </ChatBaseLayout>
  );
};

export default VideoView;
