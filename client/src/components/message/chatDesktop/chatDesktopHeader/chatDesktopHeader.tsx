import React, { FC, useEffect, useState } from 'react';
import { onlineStatus } from '../../../../generallType/generallType';
import './chatDesktopHeader.scss';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { infoIcon, videoIcon } from '../../../../assets/generalIcons/chatIcons';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import { socket } from '../../../../socket';
import { chatDesktopHeaderType } from './chatDesktopHeader.type';
import { receipmentModalOptions } from '../chatDesktopInput/receipmentModal/receipmentModal.type';
import { Link } from 'react-router-dom';
const ChatDesktopHeader: FC<chatDesktopHeaderType> = ({ userData, handleModal }) => {
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
        <div
          className="camera-btn"
          onClick={() => {
            handleModal(receipmentModalOptions.VIDEO, true);
          }}
        >
          {videoIcon}
        </div>
        <div className="info-btn">
          {' '}
          <Link to={`/user?id=${_id}`}>{infoIcon}</Link>
        </div>
      </div>
    </BlockWrapper>
  );
};
export default ChatDesktopHeader;
