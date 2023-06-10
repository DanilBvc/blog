import { useEffect, useState } from 'react';
import { emptyCircle } from '../../../../../assets/global';
import { useAppSelector } from '../../../../../store/hooks/redux';
import './contactsSideBarRequest.scss';
import SideBarRequestItem from './sideBarRequestItem/SideBarRequestItem';
import ModalError from '../../../../general/modalError/modalError';
import { unauthorizedRequest } from '../../../../../utils/queries';
import { userById } from '../../../../../utils/network';
import { whoAmIResponseType } from '../../../../../generallType/generallType';
import Loading from '../../../../general/loading/loading';
const ContactsSideBarRequest = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestUsers, setRequestUsers] = useState<whoAmIResponseType[] | []>([]);
  const userData = useAppSelector((state) => state.userDataReducer);
  useEffect(() => {
    const requestUsers = async () => {
      setLoading(true);
      if (userData) {
        try {
          const promiseResult = userData.friendListWaitingRequests.map(async (id) => {
            const response = await unauthorizedRequest(userById(id), 'GET');
            return response;
          });
          const result = await Promise.all(promiseResult);
          setRequestUsers(result);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
      }
      setLoading(false);
    };
    requestUsers();
  }, [userData]);
  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <div className="sideBar-request-title">
        REQUESTS
        {requestUsers.length > 0 ? emptyCircle(requestUsers.length, '#4970b5') : null}
      </div>

      <Loading loading={loading}>
        {requestUsers.map((user) => (
          <SideBarRequestItem
            key={user._id + user.updatedAt}
            userName={user.fullName}
            userImg={user.avatarUrl}
            userId={user._id}
          />
        ))}
      </Loading>
    </>
  );
};
export default ContactsSideBarRequest;
