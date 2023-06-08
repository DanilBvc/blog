import { FC, useEffect, useState } from 'react';
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
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if (open) {
      setInitiated(true);
    }
  }, [open]);

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
      {initiated ? (
        <div onClick={closeModal} className={open ? 'dark-bg' : 'hiddenss'}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`modal-container ${additionalClass}`}
          >
            {closeButton && (
              <div className="modal-header">
                <span onClick={() => closeModal()} className="close-animate">
                  {close}
                </span>
              </div>
            )}
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
