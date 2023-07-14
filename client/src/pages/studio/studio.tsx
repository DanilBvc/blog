import React, { useState } from 'react';
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
const Studio = () => {
  const [studioModal, setStudioModal] = useState('');
  const closeModal = () => {
    setStudioModal('');
  };
  return (
    <>
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
            { category: 'Video', link: '/studio/video' },
            { category: 'Stream', link: '/studio/stream' },
            { category: 'Playlist', link: '/studio/playlist' },
          ]}
        />
        <StudioComponent />
      </ChatBaseLayout>
    </>
  );
};

export default Studio;
