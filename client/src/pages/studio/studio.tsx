import React, { useEffect, useState } from 'react';
import './studio.scss';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import PaginationCategory from '../../components/general/pagination/paginationCategory';
import StudioComponent from '../../components/studio/studioComponent';
import SubmitButton from '../../components/general/submitButton/submitButton';
import DropDownMenu from '../../components/general/dropDownMenu/dropDownMenu';
import { studioType } from './studio.type';
import StudioVideo from '../../components/studio/modals/studioVideo/studioVideo';
import StudioPlaylists from '../../components/studio/modals/studioPlaylists/studioPlaylists';
import StudioStream from '../../components/studio/modals/studioStream/studioStream';
import { authorizedRequest } from '../../utils/queries';
import { studioVideoUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import addStudioVideo from '../../store/actions/addStudioVideo';
import CheckBox from '../../components/general/checkBox/checkBox';
const Studio = () => {
  const [studioModal, setStudioModal] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[] | []>([]); //checkboxes array
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.studioDataReducer);
  const closeModal = () => {
    setStudioModal('');
  };
  useEffect(() => {
    const getAllStudioVideo = async () => {
      try {
        const response = await authorizedRequest(studioVideoUrl, 'GET');
        dispatch(addStudioVideo(response));
        console.log(response);
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
    };
    getAllStudioVideo();
  }, []);
  const addSelectedVideo = (id: string) => {
    if (selectedVideos.includes(id as never)) {
      setSelectedVideos([...selectedVideos.filter((video) => video !== id)]);
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
  };
  const selectAllVideo = () => {
    if (selectedVideos.length > 0) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos([...video.map((v) => v._id)]);
    }
  };
  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <StudioVideo open={studioModal === studioType.VIDEO} close={closeModal} />
      <StudioStream open={studioModal === studioType.STREAM} close={closeModal} />
      <StudioPlaylists open={studioModal === studioType.PLAYLIST} close={closeModal} />
      <ChatBaseLayout>
        <div className="studio-wrapper">
          <div className="studio-header">Content on the chanel</div>
          <DropDownMenu
            icon={<SubmitButton text={'create'} />}
            menuItems={[
              {
                label: studioType.VIDEO,
                onClick: () => setStudioModal(studioType.VIDEO),
              },
              {
                label: studioType.STREAM,
                onClick: () => setStudioModal(studioType.STREAM),
              },
              {
                label: studioType.PLAYLIST,
                onClick: () => setStudioModal(studioType.PLAYLIST),
              },
            ]}
          />
        </div>
        <PaginationCategory
          list={[
            { category: 'Video', link: `/studio/${studioType.VIDEO}` },
            { category: 'Stream', link: `/studio/${studioType.STREAM}` },
            { category: 'Playlist', link: `/studio/${studioType.PLAYLIST}` },
          ]}
        />
        <div className="category">
          <CheckBox
            isChecked={video.length === selectedVideos.length}
            setIsChecked={selectAllVideo}
            label={''}
          />
          <div className="category-video">Video</div>
          <div className="category-date">Date</div>
          <div className="category-views">Views</div>
          <div className="category-comments">Commentaries</div>
          <div className="category-like">Like</div>
        </div>
        <StudioComponent selectedVideos={selectedVideos} addSelectedVideo={addSelectedVideo} />
      </ChatBaseLayout>
    </>
  );
};

export default Studio;
