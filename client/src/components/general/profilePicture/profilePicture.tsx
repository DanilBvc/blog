import { FC } from 'react';
import { profileIcon } from '../../../assets/navigationIcons/navigationIcons';
import './profilePicture.scss';
const ProfilePicture: FC<{ userAvatar?: string }> = ({ userAvatar }) => {
  return (
    <>
      <div className="profile-picture-wrapper">
        {userAvatar ? (
          <img className="profile-picture" src={userAvatar} alt="profile-picture" />
        ) : (
          <span className="profile-picture">{profileIcon}</span>
        )}
      </div>
    </>
  );
};
export default ProfilePicture;
