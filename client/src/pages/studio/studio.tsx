import React, { useCallback, useEffect, useState } from 'react';
import './studio.scss';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import PaginationCategory from '../../components/general/pagination/paginationCategory';
import StudioComponent from '../../components/studio/studioComponent';
import DropDownMenu from '../../components/general/dropDownMenu/dropDownMenu';
import { studioType } from './studio.type';
import StudioVideo from '../../components/studio/modals/studioVideo/studioVideo';
import StudioPlaylists from '../../components/studio/modals/studioPlaylists/studioPlaylists';
import StudioStream from '../../components/studio/modals/studioStream/studioStream';
import { authorizedRequest } from '../../utils/queries';
import { studioVideoUrl } from '../../utils/network';
import ModalError from '../../components/general/modalError/modalError';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import CheckBox from '../../components/general/checkBox/checkBox';
import NumberPagination from '../../components/general/numberPagination/numberPagination';
import { studioData } from '../../generallType/store/initialStateTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import loadStudioVideo from '../../store/actions/loadStudioVideo';
import EditStudioModal from '../../components/studio/modals/editStudioModal/editStudioModal';
import DeleteStudioModal from '../../components/studio/modals/deleteStudioModal/deleteStudioModal';
const Studio = () => {
  const [currentModal, setCurrentModal] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [editVideoModal, setEditVideoModal] = useState<boolean>(false);
  const [deleteVideoModal, setDeleteVideoModal] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<string[] | []>([]); //checkboxes array
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationGridSize, setPaginationGridSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.studioDataReducer);
  const closeModal = () => {
    setCurrentModal('');
  };

  const closeEditModal = () => {
    setSelectedVideos([...selectedVideos.filter((v, i) => i !== selectedVideos.length - 1)]);
    setEditVideoModal(!editVideoModal);
  };

  const getVideoToEdit = useCallback(() => {
    if (Array.isArray(selectedVideos)) {
      const videoArray = [...video.filter((v) => selectedVideos.includes(v._id as never))];
      return videoArray[videoArray.length - 1];
    }
    const needToUpdate = video.find((v) => v._id === selectedVideos);
    return needToUpdate ? needToUpdate : null;
  }, [selectedVideos, video]);

  useEffect(() => {
    const getAllStudioVideo = async () => {
      try {
        const response: {
          videos: studioData[] | studioData;
          totalVideos: number;
        } = await authorizedRequest(studioVideoUrl(currentPage, paginationGridSize), 'GET');
        dispatch(loadStudioVideo(response.videos));
        setTotalPages(response.totalVideos);
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
    };
    getAllStudioVideo();
  }, [currentPage, paginationGridSize]);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', `${currentPage}`);
    searchParams.set('grid', `${paginationGridSize}`);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [currentPage, location.pathname, location.search, navigate, paginationGridSize]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const page = Number(queryParams.get('page'));
    const grid = Number(queryParams.get('grid'));
    setCurrentPage(page);
    setPaginationGridSize(grid);
  }, []);

  return (
    <>
      <EditStudioModal
        open={editVideoModal}
        close={() => {
          closeEditModal();
        }}
        videoUrl={getVideoToEdit()?.videoUrl || ''}
        preview={getVideoToEdit()?.videoPreviewUrl}
        description={getVideoToEdit()?.description}
        videoId={getVideoToEdit()?._id}
      />
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <DeleteStudioModal
        open={deleteVideoModal}
        close={() => {
          setDeleteVideoModal(false);
        }}
        videoId={getVideoToEdit()?._id}
      />
      <StudioVideo open={currentModal === studioType.VIDEO} close={closeModal} />
      {/* <StudioStream open={currentModal === studioType.STREAM} close={closeModal} /> */}
      {/* <StudioPlaylists open={currentModal === studioType.PLAYLIST} close={closeModal} /> */}
      <ChatBaseLayout>
        <div className="studio-wrapper">
          <div className="studio-header">Content on the chanel</div>
          <DropDownMenu
            menuData={{
              name: 'Create',
              subitems: [
                // {
                // name: studioType.PLAYLIST,
                // onClick: () => setCurrentModal(studioType.PLAYLIST),
                // },
                // {
                // name: studioType.STREAM,
                // onClick: () => setCurrentModal(studioType.STREAM),
                // },
                {
                  name: studioType.VIDEO,
                  onClick: () => setCurrentModal(studioType.VIDEO),
                },
              ],
            }}
          />
        </div>
        <PaginationCategory
          list={[
            { category: 'Video', link: `/studio/${studioType.VIDEO}` },
            // { category: 'Stream', link: `/studio/${studioType.STREAM}` },
            // { category: 'Playlist', link: `/studio/${studioType.PLAYLIST}` },
          ]}
        />
        <div className="studio-layout">
          <DropDownMenu
            menuData={{
              name: 'Change',
              subitems: [
                {
                  name: 'Edit video',
                  onClick: () => {
                    setEditVideoModal(true);
                  },
                },
                {
                  name: 'Delete video',
                  onClick: () => {
                    setDeleteVideoModal(true);
                  },
                },
                // {
                //   name: 'Add to playlist',
                //   onClick: () => {
                //     setEditVideoModal(true);
                //   },
                // },
              ],
            }}
            open={selectedVideos.length > 0}
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
          <NumberPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onGridResize={(size) => {
              setPaginationGridSize(size);
            }}
            gridSize={paginationGridSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </ChatBaseLayout>
    </>
  );
};

export default Studio;
