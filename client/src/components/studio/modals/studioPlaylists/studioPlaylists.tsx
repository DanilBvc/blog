import { FC } from 'react';
import { studioPlaylistsProps } from './studioPlaylists.type';
import Modal from '../../../general/modal/modal';

const StudioPlaylists: FC<studioPlaylistsProps> = ({ open, close }) => {
  return (
    <>
      <Modal closeModal={close} open={open} additionalClass={''}>
        asdasd
      </Modal>
    </>
  );
};
export default StudioPlaylists;
