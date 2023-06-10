import { useState } from 'react';
import UsersList from '../../components/message/usersList/usersList';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import ChatDesktop from '../../components/message/chatDesktop/chatDesktop';
import Search from '../../components/general/search/search';
import DropDownMenu from '../../components/general/dropDownMenu/dropDownMenu';

const Message = () => {
  const [currentChatId, setCurrentChatId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  return (
    <ChatBaseLayout>
      <>
        <div className="chat-wrapper">
          <div className="chat-left-side">
            <Search
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
            />
            Sort by{' '}
            <DropDownMenu
              icon={<div>{'>'}</div>}
              menuItems={
                <>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </>
              }
            />
            <UsersList setCurrentChatId={setCurrentChatId} />
          </div>
          <div className="chat-right-side">
            <ChatDesktop chatId={currentChatId} />
          </div>
        </div>
      </>
    </ChatBaseLayout>
  );
};
export default Message;
