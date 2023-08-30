import { whoAmIResponseType } from '../../generallType/generallType';
import { userDataActions } from '../../generallType/store/actions';

const setUserData = (payload: whoAmIResponseType) => ({
  type: userDataActions.SET_USER_DATA,
  payload,
});
export default setUserData;
