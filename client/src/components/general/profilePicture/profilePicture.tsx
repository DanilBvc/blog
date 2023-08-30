import { FC } from 'react';
import { profileIcon } from '../../../assets/navigationIcons/navigationIcons';
import './profilePicture.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks/redux';
const ProfilePicture: FC<{ userAvatar?: string; userId: string }> = ({ userAvatar, userId }) => {
  const currentUser = useAppSelector((state) => state.userDataReducer);

  return (
    <>
      <div className="profile-picture-wrapper">
        {userAvatar ? (
          <Link
            to={`${
              currentUser?._id === userId ? `/profile/${currentUser._id}` : `/user?id=${userId}`
            }`}
          >
            <img className="profile-picture" src={userAvatar} alt="profile-picture" />
          </Link>
        ) : (
          <span className="profile-picture">{profileIcon}</span>
        )}
      </div>
    </>
  );
};
export default ProfilePicture;
