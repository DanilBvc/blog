import { useState, FormEvent, FC } from 'react';
import InputField from '../../../components/general/inputField/inputField';
import './browseFileModal.scss';
import { browseFile } from '../../../assets/generalIcons/modalsIcons';
import { browseFileModal } from './browseFileModal.type';
import Modal from '../modal/modal';

const BrowseFileModal: FC<browseFileModal> = ({
  inputFileOnChange,
  inputOnDropEvent,
  closeModal,
  open,
  inputText,
  multiple = false,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragEnter = (event: React.FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: FormEvent) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    inputOnDropEvent(event);
  };

  return (
    <Modal closeModal={closeModal} open={open} additionalClass="browse-avatar">
      <div className="browse-avatar-container">
        <div
          className={`drop-zone drop-image  ${dragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="drop-image-icon">{browseFile}</div>
          <div className="drop-image-text">{inputText}</div>
        </div>
        <div className="or">Or</div>
        <div className="browse-file-input">
          <label htmlFor="file" className="browse-input">
            Browse file
          </label>

          {multiple ? (
            <InputField
              type="file"
              id="file"
              hidden
              multiple
              name=""
              onChange={(e) => inputFileOnChange(e)}
            />
          ) : (
            <InputField
              type="file"
              id="file"
              hidden
              name=""
              onChange={(e) => inputFileOnChange(e)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
export default BrowseFileModal;
