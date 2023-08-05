import { profileButtonProps } from '../profileInput/profileInput.type';
import './profileButton.scss';
import { FC } from 'react';

const ProfileButton: FC<profileButtonProps> = ({ onClick, children }) => {
  return (
    <button className="profile-input-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ProfileButton;
