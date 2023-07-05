import React, { FC, useState } from 'react';
import './chatDesktopContent.scss';
import { formatMessageDate } from '../../../../utils/getDate';
import ContextMenu from '../../contextMenu/contextMenu';
import { chatDesktopContentType } from './chatDesktopContent.type';
import ChatMessageItem from './chatMessageItems/chatMessageItem';
const ChatDesktopContent: FC<chatDesktopContentType> = ({ chatData, userData }) => {
  const [contextMenuData, setContextMenuData] = useState({
    coords: {
      x: 0,
      y: 0,
    },
    messageId: '',
  });
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, messageId: string) => {
    e.preventDefault();
    if (messageId === contextMenuData.messageId) {
      setContextMenuData({ messageId: '', coords: { x: 0, y: 0 } });
    } else {
      setContextMenuData({ messageId, coords: { x: e.pageX, y: e.pageY } });
    }
  };

  let lastDisplayedDate = '';

  return (
    <div className="chat-desktop-content">
      <div
        className="chat-desktop-wrapper"
        onClick={() => setContextMenuData({ messageId: '', coords: { x: 0, y: 0 } })}
      >
        {chatData.messages.map((chat) => {
          const messageDate = formatMessageDate(chat.date);
          const shouldDisplayDate = messageDate !== lastDisplayedDate;
          lastDisplayedDate = messageDate;

          return (
            <React.Fragment key={chat._id}>
              {shouldDisplayDate && <div className="message-date">{messageDate}</div>}
              <ContextMenu
                open={chat._id === contextMenuData.messageId}
                contextMenuData={contextMenuData}
                close={() => setContextMenuData({ ...contextMenuData, messageId: '' })}
              />
              <ChatMessageItem
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
