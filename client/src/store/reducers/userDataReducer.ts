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
      };
    }
    case userDataActions.REMOVE_USER_DATA: {
      return null;
    }

    default:
      return state;
  }
};

export default userDataReducer;
