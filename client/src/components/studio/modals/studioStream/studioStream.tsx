import React, { FC } from 'react';
import { studioStreamProps } from './studioStream.type';
import Modal from '../../../general/modal/modal';

const StudioStream: FC<studioStreamProps> = ({ open, close }) => {
  return (
    <>
      <Modal closeModal={close} open={open} additionalClass={''}>
        asdasd
      </Modal>
    </>
  );
};

export default StudioStream;
