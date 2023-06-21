import React, { FC } from 'react';
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
const ContextMenu: FC<contextMenuType> = ({ open, contextMenuData }) => {
  const { coords } = contextMenuData;
  return (
    <>
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
          <div className="context-menu-item">
            <div className="context-menu-icon">{deleteMessageIcon}</div>
            <div className="context-menu-action">Delete for me</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ContextMenu;
