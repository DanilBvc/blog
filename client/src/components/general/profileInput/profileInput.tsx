import './profileInput.scss';
import React, { FC, useState } from 'react';
import { authorizedRequest } from '../../../utils/queries';
import { profileInputProps } from './profileInput.type';
import ProfileButton from '../profileButton/profileButton';
import { cross, checkMark, pencilFill } from '../../../assets/generalIcons/profileIcons';
const ProfileInput: FC<profileInputProps> = ({ inputName, value, keyName, type }) => {
  const [profileinputEditStatus, setProfileInputEditStatus] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (keyName === 'first_name') {
      // setUserProfileData((prevState) => ({
      //   ...prevState,
      //   firstName: e.target.value,
      // }));
    }
    if (keyName === 'last_name') {
      // setUserProfileData((prevState) => ({
      //   ...prevState,
      //   lastName: e.target.value,
      // }));
    }
  };

  const changeProfileData = async () => {
    // await authorizedRequest(editProfileUrl, 'PUT', 'accessToken', {
    //   key: keyName,
    //   value: inputValue,
    // });
    setProfileInputEditStatus(!profileinputEditStatus);
  };

  return (
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
                onClick={() => {
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
  );
};

export default ProfileInput;
