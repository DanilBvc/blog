import { useAppSelector } from '../../../store/hooks/redux';
import Loading from '../loading/loading';
import './userAvatar.scss';
const UserAvatar = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  return (
    <>
      {userData ? (
        <div className="user-avatar-wrapper">
          <img className="user-avatar" src={userData.avatarUrl} alt="userAvatar" />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default UserAvatar;
