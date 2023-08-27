import React, { FC, useEffect, useState } from 'react';
import { videoCommentProps } from './videoComment.type';
import './videoComment.scss';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { getDateHoursMinute } from '../../../../utils/getDate';
import { likeIcon, disLikeIcon } from '../../../../assets/generalIcons/videoIcons';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import SubmitButton from '../../../general/submitButton/submitButton';
import { authorizedRequest, unauthorizedRequest } from '../../../../utils/queries';
import { commentRepliesUrl, commentUrl, videoCommentUrl } from '../../../../utils/network';
import ModalError from '../../../general/modalError/modalError';
import VideoCommentInput from '../videoCommentInput/videoCommentInput';
import updateUserData from '../../../../store/actions/updateUserData';
import { commentResponse } from '../../../../generallType/generallType';
import Loading from '../../../general/loading/loading';
const VideoComment: FC<videoCommentProps> = ({ comment, updateCommentReaction }) => {
  const currentUser = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  const { like, dislike, text, _id, avatarUrl, userName, updatedAt, replies, author } = comment;

  const [commentReaction, setCommentReaction] = useState({
    like: false,
    dislike: false,
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [reply, setReply] = useState(false);
  const [repliesData, setRepliesData] = useState<commentResponse[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [replyInputValue, setReplyInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const updateComment = async (like: boolean, dislike: boolean) => {
    try {
      const response = await authorizedRequest(commentUrl(_id), 'POST', 'token', {
        like,
        dislike,
      });
      dispatch(updateUserData(response.updUserData));
      updateCommentReaction(response.like, response.dislike, _id);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  const replyComment = async () => {
    try {
      const comment = await authorizedRequest(videoCommentUrl(_id), 'POST', 'token', {
        commentData: replyInputValue,
        avatarUrl: currentUser?.avatarUrl,
        userName: currentUser?.fullName,
        replied: _id,
      });
      if (repliesData.length > 0) {
        setRepliesData((prev) => [...prev, comment]);
      } else {
        setRepliesData([comment]);
      }
      setReplyInputValue('');
      setReply(false);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  const showAllReplies = async () => {
    setLoading(true);
    try {
      setShowReplies(!showReplies);
      const repliesData = await unauthorizedRequest(commentRepliesUrl(_id), 'GET');
      setRepliesData(repliesData);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      setCommentReaction({
        like: currentUser?.like.includes(_id),
        dislike: currentUser?.dislike.includes(_id),
      });
    }
  }, [_id, currentUser]);

  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <div className="video-comment-wrapper">
        <div className="video-comment-data">
          <div className="video-comment-avatar">
            <ProfilePicture userId={author} userAvatar={avatarUrl} />
          </div>
          <div className="video-comment-title">
            <div className="video-comment-name">
              {userName} <p>{getDateHoursMinute(updatedAt)}</p>
            </div>
            <div className="video-comment-text">{text}</div>
          </div>
        </div>
        <div className="video-comment-control">
          <div className="panel panel-reaction">
            <BlockWrapper
              additionalClass={`panel-icon panel-reaction-like ${
                commentReaction.like ? 'reaction-active' : ''
              }`}
              onClick={() => {
                updateComment(true, false);
              }}
            >
              {likeIcon}
              {like}
            </BlockWrapper>
            <BlockWrapper
              additionalClass={`panel-icon panel-reaction-dislike ${
                commentReaction.dislike ? 'reaction-active' : ''
              }`}
              onClick={() => {
                updateComment(false, true);
              }}
            >
              {dislike}
              {disLikeIcon}
            </BlockWrapper>
          </div>
          <SubmitButton
            text={'reply'}
            onClick={() => {
              setReply(!reply);
            }}
          />
          <SubmitButton text={`show replies ${replies.length}`} onClick={showAllReplies} />
        </div>
        <VideoCommentInput
          display={reply}
          value={replyInputValue}
          onChange={(e) => {
            setReplyInputValue(e.currentTarget.value);
          }}
          onClick={replyComment}
        />
        <div className={`replies-wrapper ${showReplies ? 'replies-wrapper-visible' : ''}`}>
          {loading ? (
            <Loading loading={loading} />
          ) : repliesData.length === 0 ? null : repliesData.length > 0 && showReplies ? (
            <Loading loading={loading}>
              <div className="replies">
                {repliesData.map((comment) => (
                  <VideoComment
                    key={comment._id}
                    comment={comment}
                    updateCommentReaction={updateCommentReaction}
                  />
                ))}
              </div>
            </Loading>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default VideoComment;
