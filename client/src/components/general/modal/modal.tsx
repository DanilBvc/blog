import React, { FC, useEffect, useState } from 'react';
import './modal.scss';
import { close } from '../../../assets/generalIcons/modalsIcons';
import { modalProps } from './modal.type';

const Modal: FC<modalProps> = ({
  closeModal,
  closeButton = true,
  open,
  additionalClass,
  children,
}) => {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
    };

    if (open) {
      document.body.classList.add('no-scroll');
      document.addEventListener('scroll', handleScroll, { passive: false });
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  return (
    <>
      {open ? (
        <>
          <div onClick={closeModal} className={'dark-bg'}></div>
          <div className="modal-wrapper">
            <div className={`modal ${open ? 'modal-animate-in' : 'modal-animate-out'}`}>
              {closeButton && (
                <div className="modal-header">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    className="close-animate"
                  >
                    {close}
                  </span>
                </div>
              )}
              <div className={`modal-container ${additionalClass}`}>{children}</div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
