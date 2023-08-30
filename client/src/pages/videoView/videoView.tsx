import React, { FC, useEffect, useState } from 'react';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import VideoPlayer from '../../components/general/videoPlayer/videoPlayer';
import { useLocation } from 'react-router-dom';
import { unauthorizedRequest } from '../../utils/queries';
import { videoByIdUrl, videoCommentUrl, videoCommentWithQueryUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import { commentResponse, videoResponse } from '../../generallType/generallType';
import VideoViewInfo from '../../components/videoView/videoViewInfo';
import Loading from '../../components/general/loading/loading';

const VideoView: FC = () => {
  const [videoData, setVideoData] = useState<videoResponse | null>(null);
  const [videoComments, setVideoComments] = useState<commentResponse[] | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedCommentsCount, setUploadedCommentsCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const getVideoData = async () => {
    setLoading(true);
    const parts = location.pathname.split('/');
    const id = parts[parts.length - 1];
    try {
      const data = await unauthorizedRequest(videoByIdUrl(id), 'GET');
      setVideoData(data);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    setIsFetching(true);
    try {
      if (videoData) {
        if (uploadedCommentsCount + 20 > videoData.comments.commentsLength) {
          const comments = await unauthorizedRequest(
            videoCommentWithQueryUrl(
              videoData._id,
              uploadedCommentsCount,
              videoData.comments.commentsLength
            ),
            'GET'
          );
          if (videoComments) {
            setVideoComments([...videoComments, comments]);
          } else {
            setVideoComments([...comments]);
          }
          setUploadedCommentsCount(videoData.comments.commentsLength);
          window.removeEventListener('scroll', handleScroll);
        } else {
          const comments = await unauthorizedRequest(
            videoCommentWithQueryUrl(
              videoData._id,
              uploadedCommentsCount,
              uploadedCommentsCount + 20
            ),
            'GET'
          );
          if (videoComments) {
            setVideoComments([...videoComments, comments]);
          } else {
            setVideoComments([...comments]);
          }
          setUploadedCommentsCount(uploadedCommentsCount + 20);
        }
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setIsFetching(false);
  };

  const handleScroll = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const currentPosition = window.scrollY + window.innerHeight;
    if (currentPosition > contentHeight * 0.9 && !isFetching) {
      if (videoData && uploadedCommentsCount >= videoData.comments.commentsLength) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        fetchComments();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoData]);

  const updateReaction = (like: number, dislike: number) => {
    if (videoData) {
      setVideoData({ ...videoData, like, dislike });
    }
  };

  const updateCommentReaction = (like: number, dislike: number, commentId: string) => {
    if (videoComments) {
      setVideoComments((prev) =>
        prev
          ? prev.map((comment) => {
              if (comment._id === commentId) {
                return { ...comment, like, dislike };
              }
              return comment;
            })
          : prev
      );
    }
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
        <div className="video-view">
          <VideoPlayer videoData={videoData} />
          <Loading loading={isFetching}>
            <VideoViewInfo
              videoData={videoData}
              updateReaction={updateReaction}
              setVideoComments={setVideoComments}
              videoComments={videoComments}
              updateCommentReaction={updateCommentReaction}
            />
          </Loading>
        </div>
      </Loading>
    </ChatBaseLayout>
  );
};

export default VideoView;
