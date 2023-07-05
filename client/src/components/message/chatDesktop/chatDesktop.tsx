import { FC, useEffect, useState } from 'react';
import ChatDesktopHeader from './chatDesktopHeader/chatDesktopHeader';
import ChatDesktopContent from './chatDesktopContent/chatDesktopContent';
import { chatIdUrl, messageId, uploadFiles, userById } from '../../../utils/network';
import { authorizedRequest, unauthorizedRequest } from '../../../utils/queries';
import {
  SendMessagePayload,
  chatDataResponse,
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
import BrowseFileModal from '../../general/browseFileModal/browseFileModal';
import { useUploadProgress } from '../../../customHooks/useUploadWithProgress';
import { receipmentModalOptions } from './chatDesktopInput/receipmentModal/receipmentModal.type';
import ChatDesktopVideoRecorder from './chatDesktopVideoRecorder/chatDesktopVideoRecorder';
const ChatDesktop: FC = () => {
  //global states
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const [chatData, setChatData] = useState<chatDataResponse | null>(null);
  const [userData, setUserData] = useState<whoAmIResponseType | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [receipmentModalOption, setReceipmentModalOption] = useState<{
    option: receipmentModalOptions | null;
    open: boolean;
  }>({ option: null, open: false });
  const location = useLocation();
  const { uploadForm, uploadedFiles, setUploadedFiles } = useUploadProgress(
    uploadFiles(chatId ? chatId : '')
  );
  const sendMessage = async (payload: messageTypes) => {
    const { messageType, message } = payload;
    if (!currentUserData) {
      return;
    }
    const messageBody: SendMessagePayload[sendMessageTypes.TEXT_MESSAGE] & {
      sender: string;
      files: string[] | null;
    } = {
      sender: currentUserData._id,
      messageType,
      message,
      files:
        uploadedFiles.length > 0
          ? [
              ...uploadedFiles
                .filter((file) => file.file !== null)
                .map((file) => file.file as string),
            ]
          : null,
    };
    if (messageType === sendMessageTypes.TEXT_MESSAGE && chatId) {
      const updChat = await authorizedRequest(messageId(chatId), 'POST', 'token', messageBody);
      if (chatData) {
        setChatData(updChat);
      }
    }
    setUploadedFiles([]);
  };

  const handleModal = (option: receipmentModalOptions | null, open: boolean) => {
    setReceipmentModalOption({ option, open });
  };
  const videoFileHandler = (formData: FormData) => {
    uploadForm(formData);
  };

  const removeUploadedFile = async (file: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.file !== file));
    await authorizedRequest(file, 'DELETE');
  };

  //browse file modal
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const files = event.dataTransfer.files;
    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      uploadForm(formData);
    });
    handleModal(null, false);
  };
  const handleBrowseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const formData = new FormData();
        formData.append('file', file);
        uploadForm(formData);
      });
      handleModal(null, false);
    }
  };
  //

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
  }, [location.pathname, currentUserData]);

  useEffect(() => {
    socket.connect();
    const updateChatMessages = async (sender: string) => {
      const path = location.pathname;
      const id = path.split('/message/')[1];
      if (sender !== currentUserData?._id && id) {
        try {
          const chatDataResponce: chatDataResponse = await authorizedRequest(chatIdUrl(id), 'GET');
          setChatData(chatDataResponce);
          setChatId(id);
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
      <BrowseFileModal
        inputFileOnChange={handleBrowseFile}
        inputOnDropEvent={handleDrop}
        closeModal={() => {
          handleModal(null, false);
        }}
        open={receipmentModalOption.option === receipmentModalOptions.FILES}
        inputText="Drop file here"
        multiple={true}
      />
      <ChatDesktopVideoRecorder
        open={receipmentModalOption.option === receipmentModalOptions.VIDEO}
        close={() => handleModal(null, false)}
        chatId={chatId}
        videoFileHandler={videoFileHandler}
      />
      {chatData && userData ? (
        <div className="chat-desktop-wrapper">
          <FormError errorText={errorText} appear={error} />
          <ChatDesktopHeader userData={userData} />
          <ChatDesktopContent chatData={chatData} userData={userData} />
          <ChatDesktopInput
            sendMessage={sendMessage}
            handleModal={handleModal}
            receipmentModalOption={receipmentModalOption}
            uploadedFiles={uploadedFiles}
            removeUploadedFile={removeUploadedFile}
          />
        </div>
      ) : null}
    </>
  );
};
export default ChatDesktop;
