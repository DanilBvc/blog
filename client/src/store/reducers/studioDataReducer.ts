import { studioDataActions } from '../../generallType/store/actions';
import { studioData } from '../../generallType/store/initialStateTypes';
import { studioState } from '../initialState/studioState';

const studioDataReducer = (
  state = studioState,
  action: {
    type: string;
    payload: studioData[] | studioData;
  }
): typeof studioState => {
  switch (action.type) {
    case studioDataActions.LAOD_VIDEOS: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return [...payload];
      }
      return [payload];
    }

    default:
      return state;
  }
};

export default studioDataReducer;
