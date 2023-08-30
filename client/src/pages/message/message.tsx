import { FC, useEffect, useState } from 'react';
import UsersList from '../../components/message/usersList/usersList';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import Search from '../../components/general/search/search';
import DropDownMenu from '../../components/general/dropDownMenu/dropDownMenu';
import { sortOptions, whoAmIResponseType } from '../../generallType/generallType';
import { authorizedRequest } from '../../utils/queries';
import { messageSearchUrl, messageUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import Loading from '../../components/general/loading/loading';
import './message.scss';
import { useAppSelector } from '../../store/hooks/redux';
import SubmitButton from '../../components/general/submitButton/submitButton';
const Message: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<sortOptions>(sortOptions.NEWEST);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | ReturnType<typeof setTimeout>>(null);
  const [chatList, setChatList] = useState<whoAmIResponseType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.userDataReducer);
  const handleError = (error: boolean, errorText?: string) => {
    setError(error);
    if (errorText) {
      setErrorText(errorText);
    }
  };

  const handleSearch = (q?: string, s?: sortOptions) => {
    setLoading(true);
    if (q !== undefined) {
      setQuery(q);
    }
    if (s) {
      setSortOption(s);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const timeout = setTimeout(() => {
      const queryParams = q !== undefined ? q : query;
      const sortParams = s || sortOption;
      authorizedRequest(messageSearchUrl(queryParams, sortParams), 'GET')
        .then((data) => {
          setChatList(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setErrorText(String(err));
          setLoading(false);
        });
    }, 500);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    if (userData) {
      if (userData.chats.length > 0) {
        authorizedRequest(messageUrl, 'GET')
          .catch((err) => {
            setError(true);
            setErrorText(String(err));
          })
          .then((data) => {
            setChatList(data);
          });
      }
    }
  }, [userData]);
  return (
    <>
      <ModalError open={error} close={() => handleError(false)} text={errorText} />
      <ChatBaseLayout>
        <div className="chat-wrapper">
          <div className="chat-left-side">
            <Search
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              value={query}
            />
            <DropDownMenu
              menuData={{
                name: 'Sort by',
                subitems: [
                  {
                    name: 'oldest',
                    onClick: () => handleSearch(query, sortOptions.OLDEST),
                  },
                  {
                    name: 'newest',
                    onClick: () => handleSearch(query, sortOptions.NEWEST),
                  },
                ],
              }}
            />
            <Loading loading={loading}>
              <UsersList chatList={chatList} handleError={handleError} />
            </Loading>
          </div>
          <div className="chat-right-side">{children ? children : null}</div>
        </div>
      </ChatBaseLayout>
    </>
  );
};
export default Message;
