import { FC } from 'react';
import { messageTypes, whoAmIResponseType } from '../../../../../../generallType/generallType';
import ProfilePicture from '../../../../../general/profilePicture/profilePicture';
import { getDateHoursMinute } from '../../../../../../utils/getDate';
import './chatMessageItem.scss';
const ChatMessageItem: FC<{
  senderData: whoAmIResponseType;
  isCurrentUserSender: boolean;
  chat: messageTypes & {
    _id: string;
    date: string;
  };
}> = ({ senderData, chat, isCurrentUserSender }) => {
  const { _id, avatarUrl } = senderData;
  const { message, date } = chat;

  return (
    <div className={`chat-message-item ${isCurrentUserSender ? 'chat-message-item-owner' : ''}`}>
      {isCurrentUserSender ? null : <ProfilePicture userId={_id} userAvatar={avatarUrl} />}
      <div className="chat-message-content">
        <div className="chat-message-text">{message}</div>

        <div className="chat-message-date">{getDateHoursMinute(date)}</div>
      </div>
    </div>
  );
};
export default ChatMessageItem;
