import { FC } from 'react';
import { actionBanerOption, chatActionBannerType } from './chatActionBanner.type';
import { cross } from '../../../../../assets/generalIcons/profileIcons';
import './chatActionBanner.scss';
import { forwardMessageIcon, pencil } from '../../../../../assets/generalIcons/chatIcons';
import { useAppSelector } from '../../../../../store/hooks/redux';
const ChatActionBanner: FC<chatActionBannerType> = ({ close, actionBannerOption, userData }) => {
  const currentUserData = useAppSelector((state) => state.userDataReducer);

  return (
    <>
      {actionBannerOption ? (
        <div className="reply-wrapper">
          <div className="reply-container">
            <div className="reply-container-icon">
              {actionBannerOption.option === actionBanerOption.EDIT ? pencil : forwardMessageIcon}
            </div>
            <div className="reply-container-text">
              <div className="reply-container-text-up">
                {actionBannerOption.message?.sender === currentUserData?._id
                  ? currentUserData?.fullName
                  : userData?.fullName}
              </div>
              <div className="reply-container-text-bottom">
                {actionBannerOption.message?.message}
              </div>
            </div>
            <div className="reply-container-icon" onClick={close}>
              {cross}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ChatActionBanner;
