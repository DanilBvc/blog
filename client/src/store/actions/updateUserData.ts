import { userDataActions } from '../../generallType/store/actions';

const updateUserData = (payload: {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  chats: string[];
}) => ({
  type: userDataActions.SET_USER_DATA,
  payload,
});
export default updateUserData;
