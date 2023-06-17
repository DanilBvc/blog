import { FC, useEffect, useState } from 'react';
import ChatDesktopHeader from './chatDesktopHeader/chatDesktopHeader';
import ChatDesktopContent from './chatDesktopContent/chatDesktopContent';
import { chatIdUrl, messageId, userById } from '../../../utils/network';
import { authorizedRequest, unauthorizedRequest } from '../../../utils/queries';
import {
  SendMessagePayload,
  chatDataResponse,
  chatDataType,
  messageTypes,
  sendMessageTypes,
  whoAmIResponseType,
} from '../../../generallType/generallType';
import { useLocation } from 'react-router-dom';
import FormError from '../../general/formError/formError';
import ChatDesktopInput from './chatDesktopInput/chatDesktopInput';
import './chatDesktop.scss';
import { useAppSelector } from '../../../store/hooks/redux';
import { socket } from '../../../socket';
const ChatDesktop: FC = () => {
  //global states
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const [chatData, setChatData] = useState<chatDataResponse | null>(null);
  const [userData, setUserData] = useState<whoAmIResponseType | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const location = useLocation();

  const sendMessage = async (payload: messageTypes) => {
    const { messageType, message } = payload;
    if (!currentUserData) {
      return;
    }
    const messageBody: SendMessagePayload[sendMessageTypes.TEXT_MESSAGE] & { sender: string } = {
      sender: currentUserData._id,
      messageType,
      message,
    };
    console.log(message);
    if (messageType === sendMessageTypes.TEXT_MESSAGE && chatId) {
      const updChat = await authorizedRequest(messageId(chatId), 'POST', 'token', messageBody);
      if (chatData) {
        setChatData(updChat);
      }
    }
  };

  useEffect(() => {
    const getChatData = async () => {
      const path = location.pathname;
      const id = path.split('/message/')[1];
      if (id) {
        setChatId(id);
        try {
          const chatDataResponce: chatDataResponse = await authorizedRequest(chatIdUrl(id), 'GET');
          let companionId;
          if (chatDataResponce.user === currentUserData?._id) {
            companionId = chatDataResponce.admin;
          } else {
            companionId = chatDataResponce.user;
          }

          const userDataResponce: whoAmIResponseType = await unauthorizedRequest(
            userById(companionId),
            'GET'
          );
          setChatData(chatDataResponce);
          setUserData(userDataResponce);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
      } else {
        setChatData(null);
      }
    };
    getChatData();
  }, [location, currentUserData]);
  useEffect(() => {
    socket.connect();
    const updateChatMessages = async (sender: string) => {
      const path = location.pathname;
      const id = path.split('/message/')[1];
      if (sender !== currentUserData?._id && id) {
        try {
          const chatDataResponce: chatDataResponse = await authorizedRequest(chatIdUrl(id), 'GET');
          setChatData(chatDataResponce);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
      }
    };
    socket.on('new_message', (data) => {
      console.log(data);
      updateChatMessages(data.sender);
    });
    return () => {
      socket.disconnect();
    };
  }, [currentUserData?._id, location.pathname]);

  return (
    <>
      {chatData && userData ? (
        <div className="chat-desktop-wrapper">
          <FormError errorText={errorText} appear={error} />
          <ChatDesktopHeader userData={userData} />
          <ChatDesktopContent chatData={chatData} userData={userData} />
          <ChatDesktopInput sendMessage={sendMessage} />
        </div>
      ) : null}
    </>
  );
};
export default ChatDesktop;
