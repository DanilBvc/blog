import { FC } from 'react';
import { messageTypes, whoAmIResponseType } from '../../../../../../generallType/generallType';
import ProfilePicture from '../../../../../general/profilePicture/profilePicture';
import { getDateHoursMinute } from '../../../../../../utils/getDate';
import './chatMessageItem.scss';
import { useAppSelector } from '../../../../../../store/hooks/redux';
const ChatMessageItem: FC<{
  senderData: whoAmIResponseType;
  chat: messageTypes & {
    _id: string;
    date: string;
  };
}> = ({ senderData, chat }) => {
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const { _id, avatarUrl } = senderData;
  const { message, date } = chat;

  return (
    <>
      <div
        className={`chat-message-item ${
          currentUserData?._id === chat.sender ? 'chat-message-item-owner' : ''
        }`}
      >
        {currentUserData?._id === chat.sender ? null : (
          <ProfilePicture userId={_id} userAvatar={avatarUrl} />
        )}
        <div className="chat-message-content">
          <div className="chat-message-text">{message}</div>

          <div className="chat-message-date">{getDateHoursMinute(date)}</div>
        </div>
      </div>
    </>
  );
};
export default ChatMessageItem;
