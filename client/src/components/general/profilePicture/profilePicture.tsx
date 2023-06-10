import { FC } from 'react';
import { profileIcon } from '../../../assets/navigationIcons/navigationIcons';
import './profilePicture.scss';
import { Link } from 'react-router-dom';
const ProfilePicture: FC<{ userAvatar?: string; userId: string }> = ({ userAvatar, userId }) => {
  return (
    <>
      <div className="profile-picture-wrapper">
        {userAvatar ? (
          <Link to={`/user?id=${userId}`}>
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
