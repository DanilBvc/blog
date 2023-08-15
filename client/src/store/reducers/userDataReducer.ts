import { userDataActions } from '../../generallType/store/actions';
import { userData } from '../initialState/userData';

const userDataReducer = (
  state = userData,
  action: {
    type: string;
    payload: {
      _id: string;
      fullName: string;
      email: string;
      avatarUrl: string;
      createdAt: Date;
      updatedAt: Date;
      friendsList: string[];
      friendListRequests: string[];
      friendListWaitingRequests: string[];
      like: string[];
      dislike: string[];
      chats: string[];
    };
  }
): typeof userData => {
  switch (action.type) {
    case userDataActions.SET_USER_DATA: {
      const payload = action.payload;
      return {
        _id: payload._id,
        fullName: payload.fullName,
        email: payload.email,
        avatarUrl: payload.avatarUrl,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        friendsList: payload.friendsList,
        friendListRequests: payload.friendListRequests,
        friendListWaitingRequests: payload.friendListWaitingRequests,
        like: payload.like,
        dislike: payload.dislike,
        chats: payload.chats,
      };
    }
    case userDataActions.UPDATE_USER_DATA: {
      const payload = action.payload;
      return {
        _id: payload._id,
        fullName: payload.fullName,
        email: payload.email,
        avatarUrl: payload.avatarUrl,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        friendsList: payload.friendsList,
        friendListRequests: payload.friendListRequests,
        friendListWaitingRequests: payload.friendListWaitingRequests,
        like: payload.like,
        dislike: payload.dislike,
        chats: payload.chats,
      };
    }

    default:
      return state;
  }
};

export default userDataReducer;
