import React, { FC, FormEvent, useState } from 'react';
import { studioVideoProps } from './studioVideo.type';
import Modal from '../../../general/modal/modal';
import { uploadVideoIcon } from '../../../../assets/studioIcons/studioIcons';
import './studioVideo.scss';
import InputField from '../../../general/inputField/inputField';
import { getFileExtension } from '../../../../utils/filesHelper';
import FormError from '../../../general/formError/formError';
import EditStudioModal from '../editStudioModal/editStudioModal';
import axios from 'axios';
import { baseUrl, uploadStudioVideoUrl } from '../../../../utils/network';
const StudioVideo: FC<studioVideoProps> = ({ open, close }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [videoUrl, setVideoUrl] = useState<null | string>(null);

  const closeVideoModal = () => {
    setVideoUrl(null);
    close();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    Array.from(files).forEach(async (file) => {
      const fileExtension = getFileExtension(file);
      if (fileExtension === 'mp4' || fileExtension === 'avi') {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const respose = await axios.post(uploadStudioVideoUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const data = await respose.data;
          setVideoUrl(`${baseUrl}${data.url}`);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
      } else {
        setError(true);
        setErrorText('Incorrect video format');
      }
    });
    // close();
  };
  const handleBrowseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(async (file) => {
        const fileExtension = getFileExtension(file);
        if (fileExtension === 'mp4' || fileExtension === 'avi') {
          const formData = new FormData();
          formData.append('file', file);
          try {
            const respose = await axios.post(uploadStudioVideoUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            const data = await respose.data;
            setVideoUrl(`${baseUrl}${data.url}`);
          } catch (err) {
            setError(true);
            setErrorText(String(err));
          }
        } else {
          setError(true);
          setErrorText('Incorrect video format');
        }
      });
      // close();
    }
  };
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

  return (
    <>
      <Modal closeModal={closeVideoModal} open={open} additionalClass={''}>
        <div
          className="upload-video-wrapper"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-video-icon">{uploadVideoIcon}</div>
          <div className="upload-video-title">
            Drag and drop files here or click the button below to select them on your computer.
          </div>
          <div className="upload-video-text">
            As long as you do not publish videos, access to them will be limited.
            <FormError errorText={errorText} appear={error} />
          </div>
          <div className="upload-video-button">
            <label htmlFor="file" className="browse-input">
              Browse file
            </label>
            <InputField
              type="file"
              id="file"
              hidden
              name=""
              onChange={(e) => handleBrowseFile(e)}
            />
          </div>
        </div>
      </Modal>
      <EditStudioModal
        open={!!videoUrl && open}
        close={closeVideoModal}
        videoUrl={videoUrl as string}
      />
    </>
  );
};

export default StudioVideo;
