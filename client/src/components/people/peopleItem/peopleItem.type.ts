import { whoAmIResponseType } from './../../../generallType/generallType';
export type peopleItemProps = {
  human: whoAmIResponseType;
  status: friendStatus;
};
export enum friendStatus {
  FOLLOW = 'Follow',
  UN_FOLLOW = 'UnFollow',
}
