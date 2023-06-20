import React, { FC, useState } from 'react';
import { clip } from '../../../../assets/generalIcons/chatIcons';
import SubmitButton from '../../../general/submitButton/submitButton';
import './chatDesktopInput.scss';
import { messageTypes, sendMessageTypes } from '../../../../generallType/generallType';
import { useAppSelector } from '../../../../store/hooks/redux';
import ChatUploadingFile from './chatUploadingFile/chatUploadingFile';
const ChatDesktopInput: FC<{
  sendMessage: (payload: messageTypes) => void;
  handleModal: () => void;
  uploadedFiles: {
    progress: number;
    file: string | null;
  }[];
  removeUploadedFile: (file: string) => void;
}> = ({ sendMessage, handleModal, uploadedFiles, removeUploadedFile }) => {
  const [inputValue, setInputValue] = useState('');
  const currentUserData = useAppSelector((state) => state.userDataReducer);
  return (
    <>
      <ChatUploadingFile uploadedFiles={uploadedFiles} removeUploadedFile={removeUploadedFile} />
      <div className="chat-desktop-input-wrapper">
        <div className="chat-desktop-clip" onClick={handleModal}>
          {clip}
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
              sendMessage({
                messageType: sendMessageTypes.TEXT_MESSAGE,
                message: inputValue,
                sender: currentUserData._id,
              });
              setInputValue('');
            }}
          />
        ) : null}
      </div>
    </>
  );
};
export default ChatDesktopInput;
