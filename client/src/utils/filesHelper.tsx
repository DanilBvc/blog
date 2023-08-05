import {
  pdfFile,
  wordFile,
  excelFile,
  powerpointFile,
  zipFile,
  txtFile,
} from '../assets/generalIcons/chatIcons';

const FILE_TYPE_ICON = {
  pdf: 'pdf',
  word: 'word',
  docx: 'docx',
  excel: 'excel',
  powerpoint: 'ppt',
  zip: 'zip',
  jpg: 'jpg',
  txt: 'txt',
  mp4: 'mp4',
  webm: 'webm',
};
export const getFileType = (file: string) => {
  const regex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  const match = file.match(regex);
  return match ? match[1].toLowerCase() : '';
};
export const getFileName = (file: string) => {
  const fileName = file.split('/').pop();
  if (fileName) {
    return fileName;
  }
  return '';
};
export const getFile = (fileType: string, link: string) =>
  ({
    [FILE_TYPE_ICON.pdf]: (
      <a target="_blank" href={link} rel="noreferrer">
        {pdfFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.word]: (
      <a target="_blank" href={link} rel="noreferrer">
        {wordFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.excel]: (
      <a target="_blank" href={link} rel="noreferrer">
        {excelFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.docx]: (
      <a target="_blank" href={link} rel="noreferrer">
        {wordFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.powerpoint]: (
      <a target="_blank" href={link} rel="noreferrer">
        {powerpointFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.zip]: (
      <a target="_blank" href={link} rel="noreferrer">
        {zipFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.txt]: (
      <a target="_blank" href={link} rel="noreferrer">
        {txtFile(link)}
      </a>
    ),
    [FILE_TYPE_ICON.jpg]: (
      <a href={link} target="_blank" rel="noreferrer">
        <img src={link} key={link} />
      </a>
    ),
    [FILE_TYPE_ICON.mp4]: <video src={link} key={link} controls />,
    [FILE_TYPE_ICON.webm]: <video src={link} key={link} controls />,
  }[fileType]);

export const getFileExtension = (file: File) => {
  return file.name.split('.').pop();
};
