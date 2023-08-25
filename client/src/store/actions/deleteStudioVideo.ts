import { studioDataActions } from '../../generallType/store/actions';
import { studioData } from '../../generallType/store/initialStateTypes';

const deleteStudioVideo = (payload: studioData[] | studioData) => ({
  type: studioDataActions.DELETE_VIDEOS,
  payload,
});
export default deleteStudioVideo;
