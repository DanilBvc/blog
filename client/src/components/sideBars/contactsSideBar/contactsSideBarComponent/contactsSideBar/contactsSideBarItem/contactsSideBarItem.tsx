import { FC } from 'react';
import ProfilePicture from '../../../../../general/profilePicture/profilePicture';
import './contactsSideBarItem.scss';
const ContactsSideBarItem: FC<{ userName: string; userImg: string; userId: string }> = ({
  userName,
  userImg,
  userId,
}) => {
  return (
    <div className="contacts-sideBar-wrapper">
      <ProfilePicture userAvatar={userImg} />
      <span>{userName}</span>
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};
export default ContactsSideBarItem;
