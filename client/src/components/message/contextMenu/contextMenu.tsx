import React, { FC, useEffect, useState } from 'react';
import {
  replyMessageIcon,
  editMessageIcon,
  copyMessageIcon,
  forwardMessageIcon,
  pinMessageIcon,
  deleteMessageIcon,
} from '../../../assets/generalIcons/chatIcons';
import './contextMenu.scss';
import { contextMenuType } from './contextMenu.type';
import { authorizedRequest } from '../../../utils/queries';
import { deleteMessageUrl } from '../../../utils/network';
import { useLocation } from 'react-router-dom';
import ModalError from '../../general/modalError/modalError';
const ContextMenu: FC<contextMenuType> = ({ open, contextMenuData, close }) => {
  const location = useLocation();
  const { coords, messageId } = contextMenuData;
  const [chatId, setChatId] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const deleteMessage = async () => {
    try {
      await authorizedRequest(deleteMessageUrl(chatId), 'DELETE', 'token', {
        messageId,
      });
      close();
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };
  useEffect(() => {
    const path = location.pathname;
    const id = path.split('/message/')[1];
    setChatId(id);
  }, [location.pathname]);
  return (
    <>
      <ModalError open={error} close={() => setError(false)} text={errorText} />
      {open ? (
        <div className="context-menu" style={{ top: coords.y, left: coords.x }}>
          <div
            className="context-menu-item"
            onClick={() => {
              console.log('reply');
            }}
          >
            <div className="context-menu-icon">{replyMessageIcon}</div>
            <div className="context-menu-action">Reply</div>
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              console.log('edit');
            }}
          >
            <div className="context-menu-icon">{editMessageIcon}</div>
            <div className="context-menu-action">Edit</div>
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              console.log('copy');
            }}
          >
            <div className="context-menu-icon">{copyMessageIcon}</div>
            <div className="context-menu-action">Copy</div>
          </div>
          <div className="context-menu-item">
            <div className="context-menu-icon">{forwardMessageIcon}</div>
            <div className="context-menu-action">Forward</div>
          </div>
          <div className="context-menu-item">
            <div className="context-menu-icon">{pinMessageIcon}</div>
            <div className="context-menu-action">Pin this message</div>
          </div>
          <div className="context-menu-item" onClick={deleteMessage}>
            <div className="context-menu-icon">{deleteMessageIcon}</div>
            <div className="context-menu-action">Delete for me</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ContextMenu;
