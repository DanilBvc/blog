import { ChangeEvent, DragEvent, useState } from 'react';
import { whitePencilFill } from '../../assets/generalIcons/profileIcons';
import Modal from '../../components/general/modal/modal';
import ProfileInput from '../../components/general/profileInput/profileInput';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { getUserFirstAndLastName } from '../../utils/getUserFirstAndLastName';
import './profile.scss';
import BrowseFileModal from '../../components/general/browseFileModal/browseFileModal';
import updateUserData from '../../store/actions/updateUserData';
import axios from 'axios';
import { uploadPostImage, baseUrl, updateProfileData } from '../../utils/network';
import { authorizedRequest } from '../../utils/queries';
import SubmitButton from '../../components/general/submitButton/submitButton';
import { useNavigate } from 'react-router-dom';
import ModalError from '../../components/general/modalError/modalError';
const Profile = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  const [displayModal, setDispayModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const dispatch = useAppDispatch();
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      if (userData) {
        const { data } = await axios.post(uploadPostImage, formData);
        const avatarUrl = `${baseUrl}${data.url}`;
        await authorizedRequest(updateProfileData(userData._id), 'PATCH', 'token', {
          ...userData,
          avatarUrl,
        });
        dispatch(updateUserData({ ...userData, avatarUrl }));
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setDispayModal(false);
  };
  const onImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      if (userData) {
        const { data } = await axios.post(uploadPostImage, formData);
        const avatarUrl = `${baseUrl}${data.url}`;
        await authorizedRequest(updateProfileData(userData._id), 'PATCH', 'token', {
          ...userData,
          avatarUrl,
        });
        dispatch(updateUserData({ ...userData, avatarUrl }));
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setDispayModal(false);
  };
  return (
    <BaseLayout>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <BrowseFileModal
        inputFileOnChange={onImageChange}
        inputOnDropEvent={onImageDrop}
        closeModal={() => {
          setDispayModal(!displayModal);
        }}
        open={displayModal}
        inputText={'update image'}
        multiple={false}
      ></BrowseFileModal>
      {userData && (
        <div className="profile-wrapper">
          <div className="profile-container">
            <div className="profile-url-container">
              <div>
                <img src={`${userData.avatarUrl}`} alt="" className="profile-url" />
                <button
                  onClick={() => {
                    setDispayModal(true);
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
                getUserFirstAndLastName(userData.fullName).firstName
              } ${getUserFirstAndLastName(userData.fullName).lastName}`}</span>
            </div>

            <div className="profile-inputs-container">
              <ProfileInput
                inputName="First Name"
                value={getUserFirstAndLastName(userData.fullName).firstName}
                keyName="first_name"
                type="text"
              />
              <ProfileInput inputName="Email" value={userData.email} keyName="email" type="email" />
              <ProfileInput
                inputName="Last Name"
                value={getUserFirstAndLastName(userData.fullName).lastName}
                keyName="last_name"
                type="text"
              />
            </div>
          </div>
        </div>
      )}
      <SubmitButton text={'Sign out'} onClick={signOut} />
    </BaseLayout>
  );
};
export default Profile;
