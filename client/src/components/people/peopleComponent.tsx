import { useEffect, useState } from 'react';
import { authorizedRequest } from '../../utils/queries';
import { usersUrl } from '../../utils/network';
import Loading from '../general/loading/loading';
import { whoAmIResponseType } from '../../generallType/generallType';
import PeopleItem from './peopleItem/peopleItem';
import { friendStatus } from './peopleItem/peopleItem.type';
import { useAppSelector } from '../../store/hooks/redux';
import ModalError from '../general/modalError/modalError';

const PeopleComponent = () => {
  const [people, setPeople] = useState<whoAmIResponseType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const userData = useAppSelector((state) => state.userDataReducer);
  useEffect(() => {
    setLoading(true);
    try {
      if (userData) {
        authorizedRequest(usersUrl, 'GET').then((data) => {
          if (data) {
            setPeople(data);
          }
        });
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  }, [userData]);
  const followStatus = (human: whoAmIResponseType) => {
    if (userData) {
      if (userData.friendListRequests.includes(human._id)) {
        return friendStatus.UN_FOLLOW;
      }
      if (userData.friendsList.includes(human._id)) {
        return friendStatus.UN_FOLLOW;
      }
      if (userData.friendListWaitingRequests.includes(human._id)) {
        return friendStatus.UN_FOLLOW;
      }
      return friendStatus.FOLLOW;
    }
    return friendStatus.FOLLOW;
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
      {loading ? (
        <Loading />
      ) : (
        people.map((item) => (
          <PeopleItem key={item._id + item.avatarUrl} human={item} status={followStatus(item)} />
        ))
      )}
    </>
  );
};
export default PeopleComponent;
