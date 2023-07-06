import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks/redux';
import { socket } from '../../../socket';

import { authorizedRequest, unauthorizedRequest } from '../../../utils/queries';
import {
  chatIdUrl,
  deleteMessageUrl,
  messageId,
  uploadFiles,
  userById,
} from '../../../utils/network';

import {
  SendMessagePayload,
  chatDataResponse,
  messageTypes,
  sendMessageTypes,
  whoAmIResponseType,
} from '../../../generallType/generallType';

import FormError from '../../general/formError/formError';
import ChatDesktopHeader from './chatDesktopHeader/chatDesktopHeader';
import ChatDesktopContent from './chatDesktopContent/chatDesktopContent';
import ChatDesktopInput from './chatDesktopInput/chatDesktopInput';
import BrowseFileModal from '../../general/browseFileModal/browseFileModal';
import ChatDesktopVideoRecorder from './chatDesktopVideoRecorder/chatDesktopVideoRecorder';

import { useUploadProgress } from '../../../customHooks/useUploadWithProgress';
import { receipmentModalOptions } from './chatDesktopInput/receipmentModal/receipmentModal.type';
import './chatDesktop.scss';
import { contextMenuOption } from '../contextMenu/contextMenu.type';
import { actionBanerOption } from './chatDesktopInput/chatActionBanner/chatActionBanner.type';

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
  const [actionBannerOption, setActionBannerOption] = useState<{
    option: actionBanerOption;
    messageId: string;
    message: (messageTypes & { _id: string; date: string; files: string[] }) | undefined;
  } | null>(null);
  const [contextMenuData, setContextMenuData] = useState({
    coords: {
      x: 0,
      y: 0,
    },
    messageId: '',
  });

  const closeContextMenu = () => {
    setContextMenuData({ messageId: '', coords: { x: 0, y: 0 } });
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, messageId: string) => {
    e.preventDefault();
    if (messageId === contextMenuData.messageId) {
      closeContextMenu();
    } else {
      setContextMenuData({ messageId, coords: { x: e.pageX, y: e.pageY } });
    }
  };
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

  const deleteMessage = async () => {
    try {
      if (chatId && chatData) {
        setChatData({
          ...chatData,
          messages: chatData.messages.filter(
            (message) => message._id !== contextMenuData.messageId
          ),
        });
        await authorizedRequest(deleteMessageUrl(chatId), 'DELETE', 'token', {
          messageId: contextMenuData.messageId,
        });

        closeContextMenu();
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  const closeActionBanner = () => {
    setActionBannerOption(null);
    closeContextMenu();
  };

  const handleContextMenuAction = async (contextMenuAction: contextMenuOption) => {
    switch (contextMenuAction) {
      case contextMenuOption.DELETE_FOR_ME: {
        await deleteMessage();
        break;
      }
      case contextMenuOption.EDIT: {
        setActionBannerOption({
          option: actionBanerOption.EDIT,
          messageId: contextMenuData.messageId,
          message: chatData?.messages.find(
            (message) => message._id === contextMenuData.messageId
          ) as (messageTypes & { _id: string; date: string; files: string[] }) | undefined,
        });
        closeContextMenu();
        break;
      }
      case contextMenuOption.REPLY: {
        setActionBannerOption({
          option: actionBanerOption.REPLY,
          messageId: contextMenuData.messageId,
          message: chatData?.messages.find(
            (message) => message._id === contextMenuData.messageId
          ) as (messageTypes & { _id: string; date: string; files: string[] }) | undefined,
        });
        closeContextMenu();
        break;
      }
      default:
        break;
    }
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
          <ChatDesktopContent
            chatData={chatData}
            userData={userData}
            closeContextMenu={closeContextMenu}
            contextMenuData={contextMenuData}
            handleContextMenu={handleContextMenu}
            handleContextMenuAction={handleContextMenuAction}
          />
          <ChatDesktopInput
            sendMessage={sendMessage}
            handleModal={handleModal}
            receipmentModalOption={receipmentModalOption}
            uploadedFiles={uploadedFiles}
            userData={userData}
            removeUploadedFile={removeUploadedFile}
            actionBannerOption={actionBannerOption}
            closeActionBanner={closeActionBanner}
          />
        </div>
      ) : null}
    </>
  );
};
export default ChatDesktop;
