import { FC } from 'react';
import { chatDesktopProps } from './chatDesktop.type';
import ChatDesktopHeader from './chatDesktopHeader/chatDesktopHeader';
import ChatDesktopContent from './chatDesktopContent/chatDesktopContent';

const ChatDesktop: FC<chatDesktopProps> = ({ chatId }) => {
  return (
    <>
      <ChatDesktopHeader />
      {chatId ? (
        <div>
          <ChatDesktopContent />
        </div>
      ) : null}
    </>
  );
};
export default ChatDesktop;
