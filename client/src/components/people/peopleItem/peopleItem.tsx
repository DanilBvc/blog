import { FC, useState } from 'react';
import BlockWrapper from '../../general/blockWrapper/blockWrapper';
import ProfilePicture from '../../general/profilePicture/profilePicture';
import { peopleItemProps } from './peopleItem.type';
import SubmitButton from '../../general/submitButton/submitButton';
import { authorizedRequest } from '../../../utils/queries';
import { usersUrl } from '../../../utils/network';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import updateUserData from '../../../store/actions/updateUserData';
import Loading from '../../general/loading/loading';
import './peopleItem.scss';
import ModalError from '../../general/modalError/modalError';
const PeopleItem: FC<peopleItemProps> = ({ human, status }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { avatarUrl, fullName } = human;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userDataReducer);
  const handleSub = async () => {
    setLoading(true);
    if (userData) {
      try {
        const response = await authorizedRequest(usersUrl, 'POST', 'token', {
          _id: userData._id,
          _friendId: human._id,
        });
        const { friendListRequests, friendListWaitingRequests } = response;
        dispatch(updateUserData({ ...userData, friendListRequests, friendListWaitingRequests }));
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
    }
    setLoading(false);
  };
  return (
    <BlockWrapper>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <div className="user-data-wrapper">
        <ProfilePicture userAvatar={avatarUrl} userId={human._id} />
        <div className="user-data-name">{fullName}</div>
      </div>
      <Loading loading={loading}>{<SubmitButton text={status} onClick={handleSub} />}</Loading>
    </BlockWrapper>
  );
};
export default PeopleItem;
