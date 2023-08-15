import React, { FC, useEffect, useState } from 'react';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import VideoPlayer from '../../components/general/videoPlayer/videoPlayer';
import { useLocation } from 'react-router-dom';
import { unauthorizedRequest } from '../../utils/queries';
import { videoByIdUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import { videoResponse } from '../../generallType/generallType';
import VideoViewInfo from '../../components/videoView/videoViewInfo';
import Loading from '../../components/general/loading/loading';

const VideoView: FC = () => {
  const [videoData, setVideoData] = useState<videoResponse | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const getVideoData = async () => {
    setLoading(true);
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
    setLoading(false);
  };
  useEffect(() => {
    getVideoData();
  }, [location.pathname]);
  return (
    <ChatBaseLayout>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <Loading loading={loading}>
        <VideoPlayer videoData={videoData} />
        <VideoViewInfo videoData={videoData} setVideoData={setVideoData} />
      </Loading>
    </ChatBaseLayout>
  );
};

export default VideoView;
