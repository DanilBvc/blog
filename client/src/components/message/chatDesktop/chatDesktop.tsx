import React, { FC, useEffect, useRef, useState } from 'react';
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
  MessageItem,
  chatDataResponse,
  messageTypes,
  whoAmIResponseType,
} from '../../../generallType/generallType';

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
import ModalError from '../../general/modalError/modalError';
import ChatDesktopPinnedMessage from './chatDesktopPinnedMessage/chatDesktopPinnedMessage';
import Modal from '../../general/modal/modal';
import { successIcon } from '../../../assets/generalIcons/chatIcons';
import SuccessModal from '../../general/successModal/successModal';

const ChatDesktop: FC = () => {
  //global states
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  const [chatData, setChatData] = useState<chatDataResponse | null>(null);
  const [userData, setUserData] = useState<whoAmIResponseType | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [copyModal, setCopyModal] = useState(false);
  const [copyModalText, setCopyModalText] = useState('');
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
  const [pinnedMessage, setPinnedMessage] = useState<{
    message: MessageItem | undefined;
    coords: { x: number; y: number };
  }>({
    message: chatData?.messages.filter((msg) => !msg.pinned)[0],
    coords: {
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    if (!pinnedMessage.message && chatData) {
      const pinnedMessage = chatData.messages.filter((msg) => msg.pinned)[0];
      setPinnedMessage({ coords: { x: 0, y: 0 }, message: pinnedMessage });
    }
  }, [chatData]);

  const messagesWrapperReference = useRef<HTMLDivElement | null>(null);

  const scrollToPinnedMessage = () => {
    const message = messagesWrapperReference.current;
    if (message) {
      message.scrollTo({
        top: pinnedMessage.coords.y,
        behavior: 'smooth',
      });
    }
  };

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
    const messageBody: MessageItem = {
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
      pinned: false,
      edited: actionBannerOption?.option === actionBanerOption.EDIT ? true : false,
      _id:
        actionBannerOption?.option === actionBanerOption.EDIT
          ? actionBannerOption.messageId
          : undefined,
      forwarded: {
        from: null,
        message: null,
      },
      replied: {
        toMessageId:
          actionBannerOption?.option === actionBanerOption.REPLY
            ? actionBannerOption.messageId
            : null,
        message: actionBannerOption?.option === actionBanerOption.REPLY ? message : null,
      },
    };
    if (chatId) {
      try {
        const updChat = await authorizedRequest(messageId(chatId), 'POST', 'token', messageBody);
        if (chatData) {
          setChatData(updChat);
        }
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
    }
    setUploadedFiles([]);
    closeActionBanner();
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

      case contextMenuOption.PIN_THIS_MESSAGE: {
        if (chatId) {
          const updatedChat: MessageItem = await authorizedRequest(
            messageId(chatId),
            'PATCH',
            'token',
            {
              messageId: contextMenuData.messageId,
            }
          );
          if (chatData) {
            setChatData({
              ...chatData,
              messages: chatData.messages.map((msg) => {
                if (msg._id === updatedChat._id) {
                  return updatedChat;
                }
                return msg;
              }),
            });
          }
        }
        closeContextMenu();
        break;
      }

      case contextMenuOption.COPY: {
        const message = chatData?.messages.find((msg) => msg._id === contextMenuData.messageId);
        if (message?.message) {
          navigator.clipboard.writeText(message.message);
          setCopyModalText(message.message);
          setCopyModal(true);
        }
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
          <ModalError
            open={error}
            close={() => {
              setError(false);
            }}
            text={errorText}
          />
          <SuccessModal
            open={copyModal}
            close={() => {
              setCopyModal(false);
            }}
            title={'Your message has been copied successfully.'}
            data={copyModalText}
          />

          <ChatDesktopHeader userData={userData} handleModal={handleModal} />
          <ChatDesktopPinnedMessage
            pinnedMessage={pinnedMessage}
            scrollToPinnedMessage={scrollToPinnedMessage}
          />
          <ChatDesktopContent
            chatData={chatData}
            userData={userData}
            closeContextMenu={closeContextMenu}
            contextMenuData={contextMenuData}
            handleContextMenu={handleContextMenu}
            handleContextMenuAction={handleContextMenuAction}
            messagesWrapperReference={messagesWrapperReference}
            setPinnedMessage={setPinnedMessage}
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
