import { FC, ReactNode } from 'react';
import './chatMessageItem.scss';
import React from 'react';
import { chatMessageItemType } from './chatMessageItem.type';
import { useAppSelector } from '../../../../../store/hooks/redux';
import { getFile, getFileType, getFileName } from '../../../../../utils/filesHelper';
import { getDateHoursMinute } from '../../../../../utils/getDate';
import ExpandableText from '../../../../general/expandableText/expandableText';
import ProfilePicture from '../../../../general/profilePicture/profilePicture';
const ChatMessageItem: FC<chatMessageItemType> = ({ senderData, chat, handleContextMenu }) => {
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const { _id, avatarUrl } = senderData;
  const { message, date, files } = chat;
  return (
    <>
      <div
        className={`chat-message-item ${
          currentUserData?._id === chat.sender ? 'chat-message-item-owner' : ''
        }`}
        onContextMenu={(e) => handleContextMenu(e, chat._id)}
      >
        {currentUserData?._id === chat.sender ? null : (
          <ProfilePicture userId={_id} userAvatar={avatarUrl} />
        )}
        <div className="chat-message-content">
          <div className="chat-message-text">{message}</div>
          <div className="chat-message-files">
            {files
              ? (files.map((file) => (
                  <React.Fragment key={file}>
                    {getFile(getFileType(file), file) as ReactNode}
                    <ExpandableText text={getFileName(file)} length={20} />
                  </React.Fragment>
                )) as ReactNode)
              : null}
          </div>
          <div className="chat-message-date">{getDateHoursMinute(date)}</div>
        </div>
      </div>
    </>
  );
};
export default ChatMessageItem;
