import React, { FC } from 'react';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import InputField from '../../../general/inputField/inputField';
import SubmitButton from '../../../general/submitButton/submitButton';
import { useAppSelector } from '../../../../store/hooks/redux';
import { videoCommentInputProps } from './videoCommentInput.type';
import './videoCommentInput.scss';
const VideoCommentInput: FC<videoCommentInputProps> = ({
  value,
  onChange,
  onClick,
  display = true,
}) => {
  const currentUser = useAppSelector((state) => state.userDataReducer);
  return (
    <>
      {currentUser ? (
        <div className={`video-comments-input ${display ? 'video-comments-input-visible' : ''}`}>
          <ProfilePicture userId={currentUser._id} userAvatar={currentUser.avatarUrl} />
          <div className="video-comments-field">
            <InputField
              type={'text'}
              name={'comment'}
              value={value}
              onChange={onChange}
              placeholder="enter your comment"
            />
            <SubmitButton text={'Send'} onClick={onClick} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoCommentInput;
