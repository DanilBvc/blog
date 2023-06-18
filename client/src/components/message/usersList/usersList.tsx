import { FC } from 'react';
import { usersListProps } from './usersList.type';
import UserListItem from './userListItem/userListItem';
import './userList.scss';
const UsersList: FC<usersListProps> = ({ chatList, handleError }) => {
  return (
    <>
      <div className="user-list-wrapper">
        {chatList
          ? chatList.map((chat) => (
              <UserListItem chat={chat} key={chat._id} handleError={handleError} />
            ))
          : null}
      </div>
    </>
  );
};
export default UsersList;
