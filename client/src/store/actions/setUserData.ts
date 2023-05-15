import { userDataActions } from '../../generallType/store/actions';

const setUserData = (payload: {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  type: userDataActions.SET_USER_DATA,
  payload,
});
export default setUserData;
