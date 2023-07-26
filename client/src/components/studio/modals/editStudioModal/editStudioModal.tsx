import React, { FC, useEffect, useState } from 'react';
import Modal from '../../../general/modal/modal';
import { editStudioModalProps } from './editStudioModal.type';
import InputArea from '../../../general/inputArea/inputArea';
import InputField from '../../../general/inputField/inputField';
import './editStudioModal.scss';
import { Link } from 'react-router-dom';
import SubmitButton from '../../../general/submitButton/submitButton';
import { getFileType } from '../../../../utils/filesHelper';
import { authorizedRequest } from '../../../../utils/queries';
import { uploadStudioVideoUrl } from '../../../../utils/network';
import { useAppDispatch } from '../../../../store/hooks/redux';
import addStudioVideo from '../../../../store/actions/addStudioVideo';
const EditStudioModal: FC<editStudioModalProps> = ({ open, close, videoUrl }) => {
  const [videoData, setVideoData] = useState({
    fileName: '',
    extension: '',
    description: '',
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (videoUrl) {
      const fileName = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);
      const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
      setVideoData({
        ...videoData,
        fileName: fileNameWithoutExtension,
        extension: getFileType(videoUrl),
      });
    }
  }, [videoUrl]);
  const sendVideo = async () => {
    const { fileName, description, extension } = videoData;
    const response = await authorizedRequest(uploadStudioVideoUrl, 'PATCH', 'token', {
      videoUrl,
      fileName: `${fileName}.${extension}`,
      description,
    });
    dispatch(addStudioVideo(response));
    close();
  };
  return (
    <Modal closeModal={close} open={open} additionalClass={''}>
      <div className="edit-studio-wrapper">
        <div className="edit-studio-info">
          Information
          <InputField
            placeholder="Name"
            type={'text'}
            name={'videoName'}
            onChange={(e) => {
              setVideoData({ ...videoData, fileName: e.target.value });
            }}
            value={videoData.fileName}
          />
          <InputArea
            textHandler={(value) => {
              setVideoData({ ...videoData, description: value });
            }}
            value={videoData.description}
            placeholder={'Tell us what your video is about.'}
          />
        </div>
        <div className="edit-studio-preview">
          <video src={videoUrl} className="edit-studio-video" controls></video>
          <div className="edit-studio-header">video link:</div>
          <Link to={videoUrl}>{videoUrl}</Link>
          <div className="edit-studio-header">file name:{videoData.fileName}</div>
        </div>
      </div>
      <SubmitButton text={'next'} onClick={sendVideo} />
    </Modal>
  );
};

export default EditStudioModal;
