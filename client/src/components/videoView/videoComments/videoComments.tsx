import React, { FC, useEffect, useState } from 'react';
import './videoComments.scss';
import { videoCommentsProps } from './videoComments.type';
import DropDownMenu from '../../general/dropDownMenu/dropDownMenu';
import ProfilePicture from '../../general/profilePicture/profilePicture';
import { useAppSelector } from '../../../store/hooks/redux';
import InputField from '../../general/inputField/inputField';
import SubmitButton from '../../general/submitButton/submitButton';
import { authorizedRequest } from '../../../utils/queries';
import { videoCommentUrl } from '../../../utils/network';
import ModalError from '../../general/modalError/modalError';
const VideoComments: FC<videoCommentsProps> = ({ videoData, setVideoComments, videoComments }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const currentUser = useAppSelector((state) => state.userDataReducer);
  const { comments } = videoData;

  const addComment = async () => {
    try {
      const comment = await authorizedRequest(videoCommentUrl(videoData._id), 'POST', 'token', {
        commentData: inputValue,
      });
      if (videoComments) {
        setVideoComments([...videoComments, comment]);
      } else {
        setVideoComments([comment]);
      }
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
          <div className="video-comments-input">
            <ProfilePicture userId={currentUser._id} userAvatar={currentUser.avatarUrl} />
            <div className="video-comments-field">
              <InputField
                type={'text'}
                name={'comment'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="enter your comment"
              />
              <SubmitButton text={'Send'} onClick={addComment} />
            </div>
          </div>
          <div className="video-comments">
            {videoComments?.map((comment) => (
              <div key={comment.author}>{comment.author}</div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoComments;
