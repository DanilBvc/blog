import { FC, ReactNode, useEffect, useState } from 'react';
import './chatMessageItem.scss';
import React from 'react';
import { chatMessageItemType } from './chatMessageItem.type';
import { useAppSelector } from '../../../../../store/hooks/redux';
import { getFile, getFileType, getFileName } from '../../../../../utils/filesHelper';
import { getDateHoursMinute } from '../../../../../utils/getDate';
import ExpandableText from '../../../../general/expandableText/expandableText';
import ProfilePicture from '../../../../general/profilePicture/profilePicture';
import { MessageItem } from '../../../../../generallType/generallType';
import { pinMessageIcon } from '../../../../../assets/generalIcons/chatIcons';
const ChatMessageItem: FC<chatMessageItemType> = ({
  senderData,
  chat,
  handleContextMenu,
  chatData,
}) => {
  const [repliedMessage, setRepliedMessage] = useState<MessageItem | null>(null);
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const { _id, avatarUrl } = senderData;
  const { message, date, files } = chat;
  useEffect(() => {
    const message = chatData.messages.find((msg) => msg._id === chat.replied.toMessageId);
    if (message) {
      setRepliedMessage(message);
    }
  }, [chat.replied, chatData.messages]);
  return (
    <>
      <div
        className={`chat-message-item ${
          currentUserData?._id === chat.sender ? 'chat-message-item-owner' : ''
        }`}
        onContextMenu={(e) => handleContextMenu(e, chat._id as string)}
        data-message-id={chat._id}
      >
        {currentUserData?._id === chat.sender ? null : (
          <ProfilePicture userId={_id} userAvatar={avatarUrl} />
        )}
        <div className="chat-message-content">
          {chat.pinned ? <span className="pinned-icon">{pinMessageIcon}</span> : null}
          {repliedMessage ? (
            <ChatMessageItem
              senderData={senderData}
              chat={repliedMessage}
              chatData={chatData}
              handleContextMenu={handleContextMenu}
            />
          ) : null}
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
          <div className="chat-message-additional">
            <div className="chat-message-editted">{chat.edited ? 'eddited' : ''}</div>
            <div className="chat-message-date">{getDateHoursMinute(date as string)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatMessageItem;
