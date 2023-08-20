import React, { FC, useState } from 'react';
import './videoComments.scss';
import { videoCommentsProps } from './videoComments.type';
import DropDownMenu from '../../general/dropDownMenu/dropDownMenu';
import { useAppSelector } from '../../../store/hooks/redux';
import { authorizedRequest } from '../../../utils/queries';
import { videoCommentUrl } from '../../../utils/network';
import ModalError from '../../general/modalError/modalError';
import VideoCommentInput from './videoCommentInput/videoCommentInput';
import VideoComment from './videoComment/videoComment';
const VideoComments: FC<videoCommentsProps> = ({
  videoData,
  setVideoComments,
  videoComments,
  updateCommentReaction,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const currentUser = useAppSelector((state) => state.userDataReducer);
  const { comments } = videoData;

  const addComment = async () => {
    try {
      const comment = await authorizedRequest(videoCommentUrl(videoData._id), 'POST', 'token', {
        commentData: inputValue,
        avatarUrl: currentUser?.avatarUrl,
        userName: currentUser?.fullName,
      });
      if (videoComments) {
        setVideoComments([...videoComments, comment]);
      } else {
        setVideoComments([comment]);
      }
      setInputValue('');
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  return (
    <>
      <ModalError open={error} close={() => setError(false)} text={errorText} />
      {currentUser ? (
        <div className="video-comments-wrapper">
          <div className="video-comments-statistic">
            <div className="statistic-counter">{comments.commentsLength} comments</div>
            <div className="statistic-sort">
              <DropDownMenu
                menuData={{
                  name: 'Sort by',
                  subitems: [
                    {
                      name: 'oldest',
                      onClick: () => console.log('sort by oldest'),
                    },
                    {
                      name: 'newest',
                      onClick: () => console.log('sort by newest'),
                    },
                  ],
                }}
              />
            </div>
          </div>
          <VideoCommentInput
            display={true}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onClick={addComment}
          />
          <div className="video-comments">
            {videoComments?.map((comment) => (
              <VideoComment
                comment={comment}
                key={comment._id}
                updateCommentReaction={updateCommentReaction}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoComments;
