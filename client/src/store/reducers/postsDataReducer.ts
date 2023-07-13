import { postsDataActions } from '../../generallType/store/actions';
import { postData } from '../../generallType/store/initialStateTypes';
import { postsState } from '../initialState/postsState';

const postsDataReducer = (
  state = postsState,
  action: {
    type: string;
    payload: postData | postData[];
  }
): typeof postsState => {
  switch (action.type) {
    case postsDataActions.LOAD_POSTS: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return [...payload];
      }
      return [payload];
    }
    case postsDataActions.ADD_POSTS: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return [...state, ...payload];
      }
      return [...state, payload];
    }

    default:
      return state;
  }
};

export default postsDataReducer;
