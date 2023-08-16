import React, { FC } from 'react';
import './videoComments.scss';
import { videoCommentsProps } from './videoComments.type';
import DropDownMenu from '../../general/dropDownMenu/dropDownMenu';
import ProfilePicture from '../../general/profilePicture/profilePicture';
import { useAppSelector } from '../../../store/hooks/redux';
import InputField from '../../general/inputField/inputField';
import SubmitButton from '../../general/submitButton/submitButton';
const VideoComments: FC<videoCommentsProps> = ({ videoData }) => {
  const currentUser = useAppSelector((state) => state.userDataReducer);
  const { comments } = videoData;
  return (
    <>
      {currentUser ? (
        <div className="video-comments-wrapper">
          <div className="video-comments-statistic">
            <div className="statistic-counter">{comments.length} comments</div>
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
              <InputField type={'text'} name={'comment'} placeholder="enter your comment" />
              <SubmitButton text={'Send'} />
            </div>
          </div>
          <div className="video-comments"></div>
        </div>
      ) : null}
    </>
  );
};

export default VideoComments;
