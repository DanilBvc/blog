import { useEffect, useState } from 'react';
import { emptyCircle } from '../../../../../assets/global';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/redux';
import './contactsSideBarRequest.scss';
import SideBarRequestItem from './sideBarRequestItem/SideBarRequestItem';
import ModalError from '../../../../general/modalError/modalError';
import { unauthorizedRequest } from '../../../../../utils/queries';
import { userById } from '../../../../../utils/network';
import { whoAmIResponseType } from '../../../../../generallType/generallType';
import Loading from '../../../../general/loading/loading';
import { socket } from '../../../../../socket';
import updateUserData from '../../../../../store/actions/updateUserData';
const ContactsSideBarRequest = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestUsers, setRequestUsers] = useState<whoAmIResponseType[] | []>([]);
  const userData = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.connect();
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
    socket.on('friends_req', async (data) => {
      if (userData && data._id !== userData._id) {
        dispatch(
          updateUserData({
            ...userData,
            friendListWaitingRequests: [...userData.friendListWaitingRequests, data._id],
          })
        );
      }
      await requestUsers();
    });
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
        {requestUsers.length > 0 ? 'REQUESTS' : null}
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
