import { studioDataActions } from '../../generallType/store/actions';
import { studioData } from '../../generallType/store/initialStateTypes';

const loadStudioVideo = (payload: studioData[] | studioData) => ({
  type: studioDataActions.LAOD_VIDEOS,
  payload,
});
export default loadStudioVideo;
