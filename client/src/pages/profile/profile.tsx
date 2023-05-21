import { whitePencilFill } from '../../assets/generalIcons/profileIcons';
import ProfileInput from '../../components/general/profileInput/profileInput';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { getUserFirstAndLastName } from '../../utils/getUserFirstAndLastName';
import './profile.scss';
const Profile = () => {
  const userState = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  return (
    <BaseLayout>
      {userState && (
        <div className="profile-wrapper">
          <div className="profile-container">
            <div className="profile-url-container">
              <div>
                <img src={`${userState.avatarUrl}`} alt="" className="profile-url" />
                <button
                  onClick={() => {
                    // setisAvatarChangeModalOpen(true);
                  }}
                >
                  {whitePencilFill}
                </button>
              </div>
              <p className="name"></p>
              <p className="position"></p>
            </div>
            <div className="profile-user-data">
              <span className="profile-user-data-firstLastName">{`${
                getUserFirstAndLastName(userState.fullName).firstName
              } ${getUserFirstAndLastName(userState.fullName).lastName}`}</span>
            </div>

            <div className="profile-inputs-container">
              <ProfileInput
                inputName="First Name"
                value={getUserFirstAndLastName(userState.fullName).firstName}
                keyName="first_name"
                type="text"
              />
              <ProfileInput
                inputName="Email"
                value={userState.email}
                keyName="email"
                type="email"
              />
              <ProfileInput
                inputName="Last Name"
                value={getUserFirstAndLastName(userState.fullName).lastName}
                keyName="last_name"
                type="text"
              />
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};
export default Profile;
