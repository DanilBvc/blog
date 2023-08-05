import { whoAmIResponseType } from '../../../../generallType/generallType';

export type userListItemType = {
  chat: whoAmIResponseType;
  handleError: (error: boolean, errorText?: string) => void;
};
