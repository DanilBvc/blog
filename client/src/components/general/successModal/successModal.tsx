import React, { FC } from 'react';
import Modal from '../modal/modal';
import { successModalProps } from './successModal.type';
import { successIcon } from '../../../assets/generalIcons/chatIcons';
import './successModal.scss';
const SuccessModal: FC<successModalProps> = ({ open, close, title, data }) => {
  return (
    <Modal closeModal={close} open={open}>
      <div className="success-modal-wrapper">
        <div className="success-modal">{title}</div>
        <div className="success-modal-content">
          {data}
          {successIcon}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
