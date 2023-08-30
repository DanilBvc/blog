import { useEffect, useState } from 'react';
import { emptyCircle } from '../../../../../assets/global';
import ModalError from '../../../../general/modalError/modalError';
import BlockWrapper from '../../../../general/blockWrapper/blockWrapper';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/redux';
import { userById } from '../../../../../utils/network';
import { unauthorizedRequest } from '../../../../../utils/queries';
import { whoAmIResponseType } from '../../../../../generallType/generallType';
import Loading from '../../../../general/loading/loading';
import ContactsSideBarItem from './contactsSideBarItem/contactsSideBarItem';
import './contactsSideBar.scss';
import { socket } from '../../../../../socket';
import updateUserData from '../../../../../store/actions/updateUserData';
const ContactsSideBarComponent = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<whoAmIResponseType[] | []>([]);
  const userData = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.connect();
    const requestUsers = async () => {
      setLoading(true);
      if (userData) {
        try {
          const promiseResult = userData.friendsList.map(async (id) => {
            const response = await unauthorizedRequest(userById(id), 'GET');
            return response;
          });
          const result = await Promise.all(promiseResult);
          setContacts(result);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
      }
      setLoading(false);
    };
    requestUsers();
    socket.on('friends_accept', async (data) => {
      if (userData) {
        dispatch(
          updateUserData({
            ...userData,
            friendsList: [
              ...userData.friendsList,
              data._id !== userData._id ? data._id : data._friendId,
            ],
            friendListWaitingRequests: [
              ...userData.friendListWaitingRequests.filter((req) => req === data._id),
            ],
            friendListRequests: [...userData.friendListRequests.filter((req) => req === data._id)],
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
      <div className="side-bar-contacts">
        {contacts.length > 0 ? 'CONTACTS' : null}
        {contacts.length > 0 ? emptyCircle(contacts.length) : null}
      </div>
      <BlockWrapper display={contacts.length > 0}>
        <Loading loading={loading}>
          {contacts.map((contact) => (
            <ContactsSideBarItem
              key={contact.updatedAt + contact._id}
              userImg={contact.avatarUrl}
              userName={contact.fullName}
              userId={contact._id}
            />
          ))}
        </Loading>
      </BlockWrapper>
    </>
  );
};
export default ContactsSideBarComponent;
