import { FC } from 'react';
import { whoAmIResponseType } from '../../../generallType/generallType';
import ProfilePicture from '../../general/profilePicture/profilePicture';
import SubmitButton from '../../general/submitButton/submitButton';
import ThreeDots from '../../general/threeDots/threeDots';
import './userProfileData.scss';
import { followStatus } from '../../../utils/getFollowStatus';
import { useAppSelector } from '../../../store/hooks/redux';
const UserProfileData: FC<{ userData: whoAmIResponseType }> = ({ userData }) => {
  const ownerData = useAppSelector((state) => state.userDataReducer);
  const { avatarUrl, _id, fullName } = userData;
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-image">
        <ProfilePicture userAvatar={avatarUrl} userId={_id} />
      </div>
      <div className="user-profile-data">
        <div className="user-profile-data-up">
          {fullName}
          {<SubmitButton text={followStatus(userData, ownerData)} />}
          {
            <ThreeDots>
              <div>anal</div>
            </ThreeDots>
          }
        </div>
        <div className="user-profile-data-down"></div>
      </div>
    </div>
  );
};
export default UserProfileData;
