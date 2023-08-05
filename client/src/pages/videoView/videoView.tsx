import React, { FC } from 'react';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import VideoPlayer from '../../components/general/videoPlayer/videoPlayer';

const VideoView: FC = () => {
  return (
    <ChatBaseLayout>
      <div>
        <VideoPlayer src={'http://localhost:4444/uploads/studio/badapple.mp4'} />
      </div>
    </ChatBaseLayout>
  );
};

export default VideoView;
