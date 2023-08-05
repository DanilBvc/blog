import { studioDataActions } from '../../generallType/store/actions';
import { studioData } from '../../generallType/store/initialStateTypes';

const addStudioVideo = (payload: studioData[] | studioData) => ({
  type: studioDataActions.ADD_VIDEOS,
  payload,
});
export default addStudioVideo;
