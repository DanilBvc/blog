import { FC } from 'react';
import { whoAmIResponseType } from '../../../../generallType/generallType';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import { getDateFrom } from '../../../../utils/getDateFrom';
import ViewCheckMark from '../../../general/viewCheckMark/viewCheckMark';
import './userListItem.scss';
import { authorizedRequest } from '../../../../utils/queries';
import { messageId } from '../../../../utils/network';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import updateUserData from '../../../../store/actions/updateUserData';
const UserListItem: FC<{
  chat: whoAmIResponseType;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string>>;
  handleError: (error: boolean, errorText?: string) => void;
}> = ({ chat, setCurrentChatId, handleError }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userDataReducer);
  const { avatarUrl, _id, fullName, updatedAt } = chat;
  const addNewChat = async () => {
    setCurrentChatId(_id);
    if (!userData?.chats.includes(_id)) {
      try {
        const newUserData = await authorizedRequest(messageId(_id), 'GET');
        dispatch(updateUserData(newUserData));
      } catch (err) {
        handleError(true, String(err));
      }
    }
  };
  return (
    <>
      <div className="user-list-item-wrapper" onClick={() => addNewChat()}>
        <div className="user-list-left">
          <ProfilePicture userId={_id} userAvatar={avatarUrl} />
          <div className="user-list-left-data">
            <div className="user-list-name">{fullName}</div>
            <div className="user-list-last-message">temp</div>
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
