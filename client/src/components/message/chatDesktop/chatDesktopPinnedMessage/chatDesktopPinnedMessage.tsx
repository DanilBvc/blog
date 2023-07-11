import React, { FC } from 'react';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import './chatDesktopPinnedMessage.scss';
import { MessageItem } from '../../../../generallType/generallType';
const ChatDesktopPinnedMessage: FC<{
  pinnedMessage: { message?: MessageItem; coords: { x: number; y: number } };
  scrollToPinnedMessage: () => void;
}> = ({ pinnedMessage, scrollToPinnedMessage }) => {
  return (
    <>
      {pinnedMessage.message ? (
        <BlockWrapper>
          <div className="pinned-message-content" onClick={scrollToPinnedMessage}>
            <div className="pinned-message-title">pinned message</div>
            <div className="pinned-message-data">{pinnedMessage.message.message}</div>
          </div>
        </BlockWrapper>
      ) : null}
    </>
  );
};

export default ChatDesktopPinnedMessage;
