import React, { FC, useEffect, useState } from 'react';
import Modal from '../../../general/modal/modal';
import { defaultVideoData, editStudioModalProps } from './editStudioModal.type';
import InputArea from '../../../general/inputArea/inputArea';
import InputField from '../../../general/inputField/inputField';
import './editStudioModal.scss';
import { Link } from 'react-router-dom';
import SubmitButton from '../../../general/submitButton/submitButton';
import { getFileType } from '../../../../utils/filesHelper';
import { authorizedRequest } from '../../../../utils/queries';
import { baseUrl, uploadStudioPreviewUrl, uploadStudioVideoUrl } from '../../../../utils/network';
import { useAppDispatch } from '../../../../store/hooks/redux';
import addStudioVideo from '../../../../store/actions/addStudioVideo';
import FormError from '../../../general/formError/formError';
import axios from 'axios';
import updateStudioVideo from '../../../../store/actions/updateStudioVideo';
const EditStudioModal: FC<editStudioModalProps> = ({
  open,
  close,
  videoUrl,
  preview,
  description,
  videoId,
}) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [videoData, setVideoData] = useState<{
    fileName: string;
    extension: string;
    description: string;
    preview: null | string;
  }>(defaultVideoData);
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

  useEffect(() => {
    if (preview) {
      setVideoData((prev) => ({ ...prev, preview }));
    }
    if (description) {
      setVideoData((prev) => ({ ...prev, description }));
    }
  }, [preview, description]);

  const sendVideo = async () => {
    const { fileName, description, extension } = videoData;
    const response = await authorizedRequest(uploadStudioVideoUrl, 'PATCH', 'token', {
      videoUrl,
      fileName: `${fileName}.${extension}`,
      fileNameWithoutExtension: fileName,
      description,
      videoPreviewUrl: videoData.preview,
      videoId,
    });
    if (videoId) {
      dispatch(updateStudioVideo(response));
    } else {
      dispatch(addStudioVideo(response));
    }
    close();
  };
  const uploadPreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (files) {
        const formData = new FormData();
        formData.append('image', files[0]);
        const response = await axios.post(uploadStudioPreviewUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const data = await response.data;
        setVideoData({ ...videoData, preview: `${baseUrl}${data.url}` });
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
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
          Select a file or it will be selected automatically
          <FormError errorText={errorText} appear={error} />
          <InputField type={'file'} name={'preview'} onChange={uploadPreviewImage} />
          {videoData.preview ? (
            <img src={videoData.preview} className="video-preview" alt="preview" />
          ) : null}
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
