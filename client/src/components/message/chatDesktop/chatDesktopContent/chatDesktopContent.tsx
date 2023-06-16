import React, { FC, useEffect } from 'react';
import {
  chatDataResponse,
  chatDataType,
  whoAmIResponseType,
} from '../../../../generallType/generallType';
import './chatDesktopContent.scss';
import ChatMessageItem from './chatItems/chatMessageItem/chatMessageItem';
const ChatDesktopContent: FC<{
  chatData: chatDataResponse;
  userData: whoAmIResponseType;
  isCurrentUserSender: boolean;
}> = ({ chatData, userData, isCurrentUserSender }) => {
  return (
    <div className="chat-desktop-content">
      <div className="chat-desktop-wrapper">
        {chatData.messages.map((chat) => (
          <ChatMessageItem
            isCurrentUserSender={isCurrentUserSender}
            key={chat._id}
            senderData={userData}
            chat={chat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatDesktopContent;
