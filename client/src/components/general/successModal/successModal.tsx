import React, { FC, useEffect, useState } from 'react';
import { successModalProps } from './successModal.type';
import { successIcon } from '../../../assets/generalIcons/chatIcons';
import './successModal.scss';
const SuccessModal: FC<successModalProps> = ({ open, close, title, data }) => {
  const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);
  const closeModal = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    close();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 4000);

    setTimerId(timer);

    return () => clearTimeout(timer);
  }, [open]);
  return (
    <>
      {open ? (
        <div className="success-modal-wrapper" onClick={closeModal}>
          <div className="success-modal">{title}</div>
          <div className="success-modal-content">
            {data}
            {successIcon}
          </div>
          <div className="progress-bar-container" onClick={closeModal}>
            <div className="progress-bar html">
              <progress id="html" max={100} value={'x'}>
                x
              </progress>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SuccessModal;
