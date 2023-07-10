import React, { FC, useState } from 'react';
import './chatDesktopContent.scss';
import { formatMessageDate } from '../../../../utils/getDate';
import ContextMenu from '../../contextMenu/contextMenu';
import { chatDesktopContentType } from './chatDesktopContent.type';
import ChatMessageItem from './chatMessageItems/chatMessageItem';
const ChatDesktopContent: FC<chatDesktopContentType> = ({
  chatData,
  userData,
  closeContextMenu,
  contextMenuData,
  handleContextMenu,
  handleContextMenuAction,
}) => {
  let lastDisplayedDate = '';

  return (
    <div className="chat-desktop-content">
      <div className="chat-desktop-wrapper" onClick={closeContextMenu}>
        {chatData.messages.map((chat) => {
          const messageDate = formatMessageDate(chat.date as string);
          const shouldDisplayDate = messageDate !== lastDisplayedDate;
          lastDisplayedDate = messageDate;

          return (
            <React.Fragment key={chat._id}>
              {shouldDisplayDate && <div className="message-date">{messageDate}</div>}
              <ContextMenu
                open={chat._id === contextMenuData.messageId}
                contextMenuData={contextMenuData}
                handleContextMenuAction={handleContextMenuAction}
              />
              <ChatMessageItem
                chatData={chatData}
                senderData={userData}
                chat={chat}
                handleContextMenu={handleContextMenu}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ChatDesktopContent;
