import React, { FC, useState } from 'react';
import './chatDesktopContent.scss';
import { formatMessageDate } from '../../../../utils/getDate';
import ContextMenu from '../../contextMenu/contextMenu';
import { chatDesktopContentType } from './chatDesktopContent.type';
import ChatMessageItem from './chatMessageItems/chatMessageItem';
import { MessageItem } from '../../../../generallType/generallType';
const ChatDesktopContent: FC<chatDesktopContentType> = ({
  chatData,
  userData,
  closeContextMenu,
  contextMenuData,
  handleContextMenu,
  handleContextMenuAction,
  messagesWrapperReference,
  setPinnedMessage,
}) => {
  let lastDisplayedDate = '';
  const handleChatScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const chatContainer = event.currentTarget;
    const chatMessages = chatContainer.querySelectorAll('.chat-message-item');
    let previousVisiblePinnedMessage: MessageItem | undefined;

    chatMessages.forEach((message: Element) => {
      const messageRect = message.getBoundingClientRect();
      const isVisible = messageRect.top < window.innerHeight;

      if (isVisible) {
        const messageId = (message as HTMLElement).dataset.messageId;

        const pinnedMessage = chatData.messages.find(
          (chat) => chat._id === messageId && chat.pinned
        );
        if (pinnedMessage) {
          if (previousVisiblePinnedMessage) {
            setPinnedMessage({
              message: previousVisiblePinnedMessage,
              coords: { x: 0, y: messageRect.y },
            });
          }
          previousVisiblePinnedMessage = pinnedMessage;
        }
      }
    });

    if (previousVisiblePinnedMessage) {
      setPinnedMessage({ message: previousVisiblePinnedMessage, coords: { x: 0, y: 0 } });
    }
  };
  return (
    <div className="chat-desktop-content">
      <div
        className="chat-desktop-wrapper"
        ref={messagesWrapperReference}
        onClick={closeContextMenu}
        onScroll={(e) => {
          handleChatScroll(e);
        }}
      >
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
