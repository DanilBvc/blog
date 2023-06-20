import React, { FC, useEffect } from 'react';
import {
  chatDataResponse,
  chatDataType,
  whoAmIResponseType,
} from '../../../../generallType/generallType';
import './chatDesktopContent.scss';
import ChatMessageItem from './chatItems/chatMessageItem/chatMessageItem';
import { formatMessageDate } from '../../../../utils/getDate';
const ChatDesktopContent: FC<{
  chatData: chatDataResponse;
  userData: whoAmIResponseType;
}> = ({ chatData, userData }) => {
  let lastDisplayedDate = '';
  return (
    <div className="chat-desktop-content">
      <div className="chat-desktop-wrapper">
        {chatData.messages.map((chat) => {
          const messageDate = formatMessageDate(chat.date);
          console.log(messageDate);
          const shouldDisplayDate = messageDate !== lastDisplayedDate;
          lastDisplayedDate = messageDate;

          return (
            <React.Fragment key={chat._id}>
              {shouldDisplayDate && <div className="message-date">{messageDate}</div>}
              <ChatMessageItem senderData={userData} chat={chat} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ChatDesktopContent;
