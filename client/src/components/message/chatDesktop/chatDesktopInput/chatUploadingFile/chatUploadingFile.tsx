import { FC, ReactNode } from 'react';
import './chatUploadingFile.scss';
import { getFile, getFileType } from '../../../../../utils/filesHelper';
import { chatUploadingFileType } from './chatUploadingFile.type';

const ChatUploadingFile: FC<chatUploadingFileType> = ({ uploadedFiles, removeUploadedFile }) => {
  return (
    <>
      {uploadedFiles.length !== 0 ? (
        <div className="chat-desktop-input-files">
          {uploadedFiles.map((file) => (
            <div className="chat-desktop-input-file" key={file.file}>
              <div
                className="close"
                onClick={() => {
                  if (file.file) {
                    removeUploadedFile(file.file);
                  }
                }}
              ></div>
              <div className="chat-desktop-input-file-content">
                {file.file
                  ? (getFile(getFileType(file.file), file.file) as ReactNode)
                  : file.progress}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
export default ChatUploadingFile;
