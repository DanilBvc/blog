import { friendStatus } from '../components/people/peopleItem/peopleItem.type';
import { whoAmIResponseType } from '../generallType/generallType';

export const followStatus = (human: whoAmIResponseType, userData: whoAmIResponseType | null) => {
  if (userData) {
    if (userData.friendListRequests.includes(human._id)) {
      return friendStatus.UN_FOLLOW;
    }
    if (userData.friendsList.includes(human._id)) {
      return friendStatus.UN_FOLLOW;
    }
    if (userData.friendListWaitingRequests.includes(human._id)) {
      return friendStatus.UN_FOLLOW;
    }
    return friendStatus.FOLLOW;
  }
  return friendStatus.FOLLOW;
};
