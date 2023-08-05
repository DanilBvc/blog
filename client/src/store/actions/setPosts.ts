import { postsDataActions } from './../../generallType/store/actions';
import { postData } from '../../generallType/store/initialStateTypes';

const setPosts = (payload: postData | postData[]) => ({
  type: postsDataActions.LOAD_POSTS,
  payload,
});
export default setPosts;
