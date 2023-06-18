import React, { FC, useEffect, useState } from 'react';
import { onlineStatus, whoAmIResponseType } from '../../../../generallType/generallType';
import './chatDesktopHeader.scss';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { infoIcon, videoIcon } from '../../../../assets/generalIcons/chatIcons';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import { socket } from '../../../../socket';
const ChatDesktopHeader: FC<{ userData: whoAmIResponseType }> = ({ userData }) => {
  const { fullName, _id, avatarUrl } = userData;
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  useEffect(() => {
    socket.on('online', (data) => {
      setUsersOnline(data);
    });
  }, [userData]);

  return (
    <BlockWrapper additionalClass="chat-header-wrapper">
      <div className="chat-header-info">
        <ProfilePicture userAvatar={avatarUrl} userId={_id} />
        <div className="chat-header-fullName">
          <span>{fullName}</span>
          <span className="online-status">
            {usersOnline.includes(_id) ? onlineStatus.ONLINE : onlineStatus.OFFLINE}
          </span>
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
