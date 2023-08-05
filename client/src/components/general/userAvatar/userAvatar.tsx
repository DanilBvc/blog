import { useAppSelector } from '../../../store/hooks/redux';
import './userAvatar.scss';
const UserAvatar = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  return (
    <>
      {userData ? (
        <div className="user-avatar-wrapper">
          <img className="user-avatar" src={userData.avatarUrl} alt="userAvatar" />
        </div>
      ) : null}
    </>
  );
};
export default UserAvatar;
