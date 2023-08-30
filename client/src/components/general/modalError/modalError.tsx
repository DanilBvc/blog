import { FC, useEffect } from 'react';
import './modalError.scss';
import { modalErrorProps } from './modalError.type';
const ModalError: FC<modalErrorProps> = ({ text, open, close }) => {
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
        <div onClick={close} className={open ? 'dark-bg' : 'hiddenss'}>
          <div className="modal-error">
            <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" />
            <span className="title">Oh snap!</span>
            <p>{text}</p>
            <div className="button" onClick={close}>
              Dismiss
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ModalError;
