import { FC } from 'react';
import { chatActionBannerType } from './chatActionBanner.type';
import { cross } from '../../../../../assets/generalIcons/profileIcons';
import './chatActionBanner.scss';
const ChatActionBanner: FC<chatActionBannerType> = ({}) => {
  return (
    <div className="reply-wrapper">
      <div className="reply-container">
        <div className="reply-container-text">
          <div className="reply-container-text-up"></div>
          <div className="reply-container-text-bottom"></div>
        </div>
        <div className="reply-container-icon">{cross}</div>
      </div>
    </div>
  );
};
export default ChatActionBanner;
