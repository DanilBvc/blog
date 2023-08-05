import { studioDataActions } from '../../generallType/store/actions';
import { studioData } from '../../generallType/store/initialStateTypes';

const updateStudioVideo = (payload: studioData) => ({
  type: studioDataActions.UPDATE_VIDEO_DATA,
  payload,
});
export default updateStudioVideo;
