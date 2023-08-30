import React, { FC, useEffect, useState } from 'react';
import Modal from '../../../general/modal/modal';
import { deleteStudioModalProps } from './deleteStudioModal.type';
import SubmitButton from '../../../general/submitButton/submitButton';
import './deleteStudioModal.scss';
import { authorizedRequest } from '../../../../utils/queries';
import { videoByIdUrl } from '../../../../utils/network';
import ModalError from '../../../general/modalError/modalError';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import deleteStudioVideo from '../../../../store/actions/deleteStudioVideo';
const DeleteStudioModal: FC<deleteStudioModalProps> = ({ open, close, videoId }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.studioDataReducer);

  const deleteVideo = async () => {
    const currentVideo = video.find((video) => video._id === videoId);
    if (!currentVideo) {
      setError(true);
      setErrorText('Video not found');
      return;
    }
    try {
      await authorizedRequest(videoByIdUrl(currentVideo._id), 'DELETE');
      dispatch(deleteStudioVideo(currentVideo));
      close();
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
          close();
        }}
        text={errorText}
      />

      <Modal closeModal={close} open={open}>
        Are you sure you want to delete the video?
        <div className="delete-buttons">
          <SubmitButton text={'Yes'} onClick={deleteVideo} />
          <SubmitButton text={'No'} onClick={close} />
        </div>
      </Modal>
    </>
  );
};

export default DeleteStudioModal;
