import { FC, useState } from 'react';
import BlockWrapper from '../../../../../general/blockWrapper/blockWrapper';
import ProfilePicture from '../../../../../general/profilePicture/profilePicture';
import SubmitButton from '../../../../../general/submitButton/submitButton';
import './SideBarRequestItem.scss';
import { authorizedRequest } from '../../../../../../utils/queries';
import { usersUrl } from '../../../../../../utils/network';
import { useAppSelector } from '../../../../../../store/hooks/redux';
import ModalError from '../../../../../general/modalError/modalError';
import { requestOptions } from '../../../../../../generallType/generallType';

const SideBarRequestItem: FC<{ userName: string; userImg: string; userId: string }> = ({
  userName,
  userImg,
  userId,
}) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const userData = useAppSelector((state) => state.userDataReducer);
  const accept = async () => {
    try {
      if (userData) {
        const response = await authorizedRequest(usersUrl, 'POST', 'token', {
          _id: userData._id,
          _friendId: userId,
          _option: requestOptions.ACCEPT,
        });
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };
  const decline = async () => {
    try {
      if (userData) {
        const response = await authorizedRequest(usersUrl, 'POST', 'token', {
          _id: userData._id,
          _friendId: userId,
          _option: requestOptions.DECLINE,
        });
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };
  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <BlockWrapper additionalClass="request-item-wrapper">
        <div className="request-item-content">
          <ProfilePicture userAvatar={userImg} userId={userId} />
          {userName} wants to add you to friends
        </div>
        <div className="request-item-buttons">
          <SubmitButton text={requestOptions.ACCEPT} onClick={accept} />
          <SubmitButton text={requestOptions.DECLINE} onClick={decline} />
        </div>
      </BlockWrapper>
    </>
  );
};
export default SideBarRequestItem;
