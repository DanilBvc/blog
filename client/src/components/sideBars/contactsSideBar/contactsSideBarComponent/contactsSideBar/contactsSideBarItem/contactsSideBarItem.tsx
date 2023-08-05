import { FC } from 'react';
import ProfilePicture from '../../../../../general/profilePicture/profilePicture';
import './contactsSideBarItem.scss';
import ThreeDots from '../../../../../general/threeDots/threeDots';
const ContactsSideBarItem: FC<{ userName: string; userImg: string; userId: string }> = ({
  userName,
  userImg,
  userId,
}) => {
  return (
    <div className="contacts-sideBar-wrapper">
      <ProfilePicture userAvatar={userImg} userId={userId} />
      <span>{userName}</span>
      <ThreeDots>
        <div>Delete</div>
      </ThreeDots>
    </div>
  );
};
export default ContactsSideBarItem;
