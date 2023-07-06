import React, { FC, useState } from 'react';
import { clip } from '../../../../assets/generalIcons/chatIcons';
import SubmitButton from '../../../general/submitButton/submitButton';
import './chatDesktopInput.scss';
import { sendMessageTypes } from '../../../../generallType/generallType';
import { useAppSelector } from '../../../../store/hooks/redux';
import ChatUploadingFile from './chatUploadingFile/chatUploadingFile';
import { chatDesktopInputType } from './chatDesktopInput.type';
import ReceipmentModal from './receipmentModal/receipmentModal';
import ChatActionBanner from './chatActionBanner/chatActionBanner';
const ChatDesktopInput: FC<chatDesktopInputType> = ({
  sendMessage,
  handleModal,
  receipmentModalOption,
  uploadedFiles,
  removeUploadedFile,
  actionBannerOption,
  closeActionBanner,
  userData,
}) => {
  const [inputValue, setInputValue] = useState('');
  const currentUserData = useAppSelector((state) => state.userDataReducer);

  return (
    <>
      <ChatUploadingFile uploadedFiles={uploadedFiles} removeUploadedFile={removeUploadedFile} />
      <ChatActionBanner
        close={closeActionBanner}
        actionBannerOption={actionBannerOption}
        userData={userData}
      />
      <div className="chat-desktop-input-wrapper">
        <div
          className="chat-desktop-clip"
          onClick={() => {
            handleModal(null, !receipmentModalOption.open);
          }}
        >
          <ReceipmentModal open={receipmentModalOption.open} receipmentHandler={handleModal} />

          <span>{clip}</span>
        </div>
        <input
          type="text"
          className="chat-desktop-input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {currentUserData ? (
          <SubmitButton
            text={'Send message'}
            onClick={() => {
              if (inputValue.length !== 0) {
                sendMessage({
                  messageType: sendMessageTypes.TEXT_MESSAGE,
                  message: inputValue,
                  sender: currentUserData._id,
                });
                setInputValue('');
              }
            }}
          />
        ) : null}
      </div>
    </>
  );
};
export default ChatDesktopInput;
