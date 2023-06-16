import React, { FC } from 'react';
import {
  chatDataType,
  onlineStatus,
  whoAmIResponseType,
} from '../../../../generallType/generallType';
import './chatDesktopHeader.scss';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { infoIcon, videoIcon } from '../../../../assets/generalIcons/chatIcons';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
const ChatDesktopHeader: FC<{ userData: whoAmIResponseType }> = ({ userData }) => {
  const { fullName, _id, avatarUrl } = userData;
  return (
    <BlockWrapper additionalClass="chat-header-wrapper">
      <div className="chat-header-info">
        <ProfilePicture userAvatar={avatarUrl} userId={_id} />
        <div className="chat-header-fullName">
          <span>{fullName}</span>
          <span className="online-status">{onlineStatus.ONLINE}</span>
        </div>
      </div>
      <div className="chat-header-buttons">
        <div className="camera-btn">{videoIcon}</div>
        <div className="info-btn">{infoIcon}</div>
      </div>
    </BlockWrapper>
  );
};
export default ChatDesktopHeader;
