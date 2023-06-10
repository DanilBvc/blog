import { FC, ReactNode, useState } from 'react';
import './threeDots.scss';
import Modal from '../modal/modal';
const ThreeDots: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        closeModal={() => {
          setOpen(false);
        }}
        open={open}
        additionalClass={''}
      >
        {children}
      </Modal>
      <div
        className="dots-container"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </>
  );
};
export default ThreeDots;
