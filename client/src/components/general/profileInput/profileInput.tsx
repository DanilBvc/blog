import './profileInput.scss';
import React, { FC, useState } from 'react';
import { authorizedRequest } from '../../../utils/queries';
import { profileInputProps } from './profileInput.type';
import ProfileButton from '../profileButton/profileButton';
import { cross, checkMark, pencilFill } from '../../../assets/generalIcons/profileIcons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import updateUserData from '../../../store/actions/updateUserData';
import { getUserFirstAndLastName } from '../../../utils/getUserFirstAndLastName';
import { updateProfileData } from '../../../utils/network';
import ModalError from '../modalError/modalError';
const ProfileInput: FC<profileInputProps> = ({ inputName, value, keyName, type }) => {
  const [profileinputEditStatus, setProfileInputEditStatus] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userDataReducer);
  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const changeProfileData = async () => {
    if (userData) {
      try {
        if (keyName === 'first_name') {
          const fullName = `${inputValue} ${getUserFirstAndLastName(userData.fullName).lastName}`;
          await authorizedRequest(updateProfileData(userData._id), 'PATCH', 'token', {
            ...userData,
            fullName,
          });
          dispatch(updateUserData({ ...userData, fullName }));
        }
        if (keyName === 'last_name') {
          const fullName = `${getUserFirstAndLastName(userData.fullName).firstName} ${inputValue}`;
          await authorizedRequest(updateProfileData(userData._id), 'PATCH', 'token', {
            ...userData,
            fullName,
          });
          dispatch(updateUserData({ ...userData, fullName }));
        }
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
    }
    setProfileInputEditStatus(false);
  };

  return (
    <>
      <ModalError open={error} close={() => setError(false)} text={errorText} />
      <div className="profile-input-wrapper">
        <p className="input-name"> {inputName} </p>

        <div
          className={`profile-input-container border-${profileinputEditStatus}`}
          onClick={() => {
            setProfileInputEditStatus(true);
          }}
        >
          <input
            name={inputName}
            type={type}
            value={inputValue}
            className="profile-input"
            disabled={!profileinputEditStatus}
            onChange={onInputChangeHandler}
          />

          <div className="profile-input-button-container">
            {profileinputEditStatus ? (
              <>
                <ProfileButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setInputValue(value);
                    setProfileInputEditStatus(false);
                  }}
                >
                  {cross}
                </ProfileButton>
                <ProfileButton
                  onClick={(e) => {
                    e.stopPropagation();
                    changeProfileData();
                  }}
                >
                  {checkMark}
                </ProfileButton>
              </>
            ) : (
              <ProfileButton
                onClick={() => {
                  setProfileInputEditStatus(!profileinputEditStatus);
                }}
              >
                {pencilFill}
              </ProfileButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInput;
