import { FC } from 'react';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { getDateFrom } from '../../../../utils/getDate';
import ViewCheckMark from '../../../general/viewCheckMark/viewCheckMark';
import './userListItem.scss';
import { authorizedRequest } from '../../../../utils/queries';
import { messageId } from '../../../../utils/network';
import { useNavigate } from 'react-router-dom';
import { userListItemType } from './userListItem.type';
const UserListItem: FC<userListItemType> = ({ chat, handleError }) => {
  const { avatarUrl, _id, fullName, updatedAt } = chat;
  const navigate = useNavigate();
  const addNewChat = async () => {
    try {
      const responceData: string = await authorizedRequest(messageId(_id), 'GET');
      navigate(`/message/${responceData}`);
    } catch (err) {
      handleError(true, String(err));
    }
  };

  return (
    <>
      <div className="user-list-item-wrapper" onClick={() => addNewChat()}>
        <div className="user-list-left">
          <ProfilePicture userId={_id} userAvatar={avatarUrl} />
          <div className="user-list-left-data">
            <div className="user-list-name">{fullName}</div>
            <div className="user-list-last-message">{}</div>
          </div>
        </div>
        <div className="user-list-right">
          <div className="user-list-date">{getDateFrom(updatedAt)}</div>
          <div className="user-list-check-mark">
            <ViewCheckMark viewed={true} />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserListItem;
