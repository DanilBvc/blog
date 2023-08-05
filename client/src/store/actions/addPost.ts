import { postsDataActions } from '../../generallType/store/actions';
import { postData } from '../../generallType/store/initialStateTypes';

const addPosts = (payload: postData | postData[]) => ({
  type: postsDataActions.ADD_POSTS,
  payload,
});
export default addPosts;
