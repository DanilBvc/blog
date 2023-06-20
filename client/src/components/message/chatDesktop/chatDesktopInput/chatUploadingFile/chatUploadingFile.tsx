import { FC } from 'react';
import './chatUploadingFile.scss';
import {
  pdfFile,
  wordFile,
  excelFile,
  powerpointFile,
  zipFile,
} from '../../../../../assets/generalIcons/chatIcons';
const ChatUploadingFile: FC<{
  uploadedFiles: {
    progress: number;
    file: string | null;
  }[];
  removeUploadedFile: (file: string) => void;
}> = ({ uploadedFiles, removeUploadedFile }) => {
  const FILE_TYPE_ICON = {
    pdf: 'pdf',
    word: 'word',
    excel: 'excel',
    powerpoint: 'powerpoint',
    zip: 'zip',
    jpg: 'jpg',
  };
  const getFileType = (file: string) => {
    const regex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const match = file.match(regex);
    return match ? match[1] : '';
  };
  const getFile = (fileType: string, link: string) =>
    ({
      [FILE_TYPE_ICON.pdf]: pdfFile,
      [FILE_TYPE_ICON.word]: wordFile,
      [FILE_TYPE_ICON.excel]: excelFile,
      [FILE_TYPE_ICON.powerpoint]: powerpointFile,
      [FILE_TYPE_ICON.zip]: zipFile,
      [FILE_TYPE_ICON.jpg]: <img src={link} />,
    }[fileType]);
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
                {file.file ? getFile(getFileType(file.file), file.file) : file.progress}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
export default ChatUploadingFile;
