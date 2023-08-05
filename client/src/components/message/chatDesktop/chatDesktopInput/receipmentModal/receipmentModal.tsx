import { FC } from 'react';
import './receipmentModal.scss';
import { receipmentModalOptions, receipmentModalType } from './receipmentModal.type';
import { fileIcon, videoRecordingIcon } from '../../../../../assets/generalIcons/chatIcons';

const ReceipmentModal: FC<receipmentModalType> = ({ open, receipmentHandler }) => {
  return (
    <>
      {open ? (
        <div className="receipment-modal">
          <div
            className="receipment-modal-item"
            onClick={(e) => {
              e.stopPropagation();
              receipmentHandler(receipmentModalOptions.FILES, false);
            }}
          >
            <div className="receipment-modal-item-icon">{fileIcon}</div>
            <div className="receipment-modal-item-text">Files</div>
          </div>
          <div
            className="receipment-modal-item"
            onClick={(e) => {
              e.stopPropagation();
              receipmentHandler(receipmentModalOptions.VIDEO, false);
            }}
          >
            <div className="receipment-modal-item-icon">{videoRecordingIcon}</div>
            <div className="receipment-modal-item-text">Record a video</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ReceipmentModal;
