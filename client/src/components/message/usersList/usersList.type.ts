import { whoAmIResponseType } from './../../../generallType/generallType';

export type usersListProps = {
  chatList: whoAmIResponseType[] | [];
  handleError: (error: boolean, errorText?: string) => void;
};
